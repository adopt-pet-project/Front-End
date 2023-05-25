import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {useQuery} from 'react-query';
import {AisAlarmBoxOn, AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import ProfileBox from './profile/profileBox';
import AlarmBox from './alarm/alarmBox';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';

function ProfileLoginTrue() {
	const accessToken = window.localStorage.getItem('accessToken');
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useState<
		(Alarmdata | Alarmnotedata | Alarmchatdata)[]
	>([
		{
			id: 2,
			type: 'announcement',
			date: '2023. 5. 1',
			contents: '개인정보 처리 방침 변경 사항에 대해서 안내드립니다.',
			checked: false,
			del: false,
		},
		{
			id: 13,
			type: 'documentHot',
			date: '2023. 5. 2',
			contents: '축하합니다. 회원님의 게시글이 HOT글에 선정되었습니다.',
			checked: true,
			del: false,
		},
		{
			id: 15,
			type: 'comment',
			date: '2023. 5. 1',
			contents: '그건 좀;',
			checked: true,
			del: false,
		},
		{
			id: 17,
			type: 'recomment',
			date: '2023. 5. 4',
			contents: '어쩌라고',
			checked: false,
			del: false,
		},
		{
			id: 4,
			type: 'mention',
			date: '2023. 5. 1',
			contents: '엄;',
			checked: true,
			del: false,
		},
		{
			id: 7,
			type: 'note',
			name: '민지',
			contents: '왜 연락을 안받니',
			date: '2022.10.11',
			checked: false,
			del: false,
		},

		{
			id: 4,
			type: 'chat',
			name: '홍길동',
			contents: '혹시 댕댕이 예방접종 받았나요...?',
			date: '2023. 5. 1',
			checked: true,
			del: false,
		},
	]);

	// const {status, error, data} = useQuery<any>(
	// 	['readMyInfo'],
	// 	() => {
	// 		return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/0`, {
	// 			method: 'GET',
	// 			headers: {
	// 				Authorization: `${accessToken}`,
	// 			},
	// 		})
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log(data);
	// 			});
	// 	},
	// 	{retry: 0},
	// );

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
					src="/icon/alarm.svg"
					width={30}
					height={30}
					alt="alarm icon"
				/>
				<div style={{pointerEvents: 'none'}} className={styles.alarmD}></div>
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
					src="/icon/person.svg"
					width={30}
					height={30}
					alt="profile icon"
				/>
			</div>
			{isProfileBoxOn ? <ProfileBox /> : null}

			{isAlarmBoxOn ? (
				<AlarmBox alarmData={alarmData} setAlarmData={setAlarmData} />
			) : null}
		</div>
	);
}

export default ProfileLoginTrue;
