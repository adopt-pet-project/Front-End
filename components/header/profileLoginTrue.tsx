import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {
	AalarmData,
	AalarmRefetch,
	AisAlarmBoxOn,
	AisProfileBoxOn,
	AuserInfo,
} from '@/utils/recoil/recoilStore';
import ProfileBox from './profile/profileBox';
import AlarmBox from './alarm/alarmBox';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import useFetch from '@/utils/hooks/useFetch';
import {useRouter} from 'next/router';

function ProfileLoginTrue() {
	const accessToken = window.localStorage.getItem('accessToken');
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useRecoilState(AalarmData);
	const [alarmRefetch, setAlarmRefetch] = useRecoilState(AalarmRefetch);
	const [isNew, setIsNew] = useState(false);
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);
	const router = useRouter();

	const [_1, fetchUserInfo] = useFetch('/member/0', 'GET', true, setUserInfo);
	const [_2, fetchAlarmData] = useFetch(
		'/notification/all',
		'GET',
		true,
		data => {
			if (data.status == null || data.status == 200) setAlarmData(data);
			else router.reload();
		},
	);

	useEffect(() => {
		const eventSource = new EventSourcePolyfill(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/notification/connect`,
			{
				headers: {
					Authorization: `${accessToken}`,
				},
			},
		);

		eventSource.onopen = () => {
			console.log('connected');
		};

		eventSource.addEventListener('sse', (e: any) => {
			console.log(e.data);
			if (e.data.includes('EventStream Created')) {
			} else {
				setAlarmData(prev => {
					const result = [...prev];
					result.unshift(JSON.parse(e.data));
					console.log(result);
					return result;
				});
			}
		});

		eventSource.onerror = (e: any) => {
			if (e.error) {
				console.log('Error');
			}

			if (e.target.readyState === EventSource.CLOSED) {
				console.log('closed');
			}
		};
	}, []);

	useEffect(() => {
		// 유저 정보 조회
		async function getUserInfoData() {
			await fetchUserInfo();
		}

		getUserInfoData();
	}, []);

	useEffect(() => {
		// 알림 조회
		async function getAlarmData() {
			await fetchAlarmData();
		}
		getAlarmData();
	}, [alarmRefetch]);

	useEffect(() => {
		setIsNew(() => {
			let result = false;
			alarmData.map((data, i) => {
				if (!data.checked) result = true;
			});
			return result;
		});
	}, [alarmData]);

	return (
		<div className={styles.profileLoginWrap}>
			<div
				onClick={() => {
					setIsAlarmBoxOn(prev => !prev);
					setIsProfileBoxOn(false);
				}}
				className={styles.imgWrap}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src={'/icon/alarm.svg'}
					width={24}
					height={24}
					alt="alarm icon"
				/>
				{isNew ? (
					<div style={{pointerEvents: 'none'}} className={styles.alarmD} />
				) : null}
			</div>

			<div
				onClick={() => {
					setIsProfileBoxOn(prev => !prev);
					setIsAlarmBoxOn(false);
				}}
				className={styles.profile}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src={`${userInfo ? userInfo.profile : '/icon/person.svg'}`}
					width={36}
					height={36}
					alt="profile icon"
				/>
			</div>
			{isProfileBoxOn ? <ProfileBox /> : null}

			{isAlarmBoxOn ? <AlarmBox /> : null}
		</div>
	);
}

export default ProfileLoginTrue;
