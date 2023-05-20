import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import ProfileBox from './profileBox';
import AlarmBox from './alarm/alarmBox';
import {useRecoilState} from 'recoil';
import {AisAlarmBoxOn, AisProfileBoxOn} from '@/utils/recoil/recoilStore';

function ProfileLoginTrue() {
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);

	const [alarmData, setAlarmData] = useState<Alarmdata[]>([
		{
			id: 2,
			type: 'announcement',
			date: '2023. 5. 1',
			contents: '개인정보 처리 방침 변경 사항에 대해서 안내드립니다.',
		},
		{
			id: 13,
			type: 'documentHot',
			date: '2023. 5. 2',
			contents: '축하합니다. 회원님의 게시글이 HOT글에 선정되었습니다.',
		},
		{
			id: 15,
			type: 'comment',
			date: '2023. 5. 1',
			contents: '그건 좀;',
		},
		{
			id: 17,
			type: 'recomment',
			date: '2023. 5. 4',
			contents: '어쩌라고',
		},
		{
			id: 4,
			type: 'mention',
			date: '2023. 5. 1',
			contents: '엄;',
		},
	]);
	const [noteData, setNoteData] = useState<Notedata[]>([
		{
			id: 3,
			name: '홍길동',
			contents: '혹시 아직 팔렸나요?',
			date: '2023. 5. 4',
		},
		{
			id: 7,
			name: '민지',
			contents: '왜 연락을 안받니',
			date: '2022.10.11',
		},
	]);
	const [chatData, setChatData] = useState<Chatdata[]>([
		{
			chatId: 4,
			docId: 2,
			name: '홍길동',
			docTitle: '진돗개 분양합니다',
			content: '혹시 댕댕이 예방접종 받았나요...?',
			date: '2023. 5. 1',
			stack: 2,
		},
		{
			chatId: 5,
			docId: 7,
			name: '강형욱',
			docTitle: '포메라니안 분양해요',
			content: '분양 희망합니다!!!',
			date: '2023. 5. 7',
			stack: 27,
		},
	]);
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
				<AlarmBox
					alarmData={alarmData}
					chatData={chatData}
					noteData={noteData}
				/>
			) : null}
		</div>
	);
}

export default ProfileLoginTrue;
