import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {
	AalarmData,
	AisAlarmBoxOn,
	AisProfileBoxOn,
	AuserInfo,
} from '@/utils/recoil/recoilStore';
import ProfileBox from './profile/profileBox';
import AlarmBox from './alarm/alarmBox';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import {isJsxTagNameExpression} from 'typescript';

function ProfileLoginTrue() {
	const refresh = useRefreshToken();
	const accessToken = window.localStorage.getItem('accessToken');
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useRecoilState(AalarmData);
	const [isNew, setIsNew] = useState(false);
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);

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
		async function getMyInfo() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/member/0`;
			let response = await fetch(`${URL}`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			});
			const result = await response.json();
			if (result.status === 401) refresh();
			setUserInfo(await result);
		}

		getMyInfo();
	}, []);

	useEffect(() => {
		// 회원 알림 전체 조회
		async function getMyAlarm() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/notification/all`;
			let response = await fetch(`${URL}`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			});
			const result = await response.json();
			console.log(result);
			if (result.status === 404) {
				alert('해당 알림을 찾을 수 없습니다.');
			}
			setAlarmData(result);
		}

		getMyAlarm();
	}, []);

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
