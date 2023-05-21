import React, {useEffect, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/note/noteLog.module.scss';
import NoteCard from '../noteCard';
import {useRecoilState} from 'recoil';
import {AnoteLog, AwriteNote} from '@/utils/recoil/recoilStore';

function NoteLog() {
	const [on, setOn] = useState(false);
	const [isLogOn, setIsLogOn] = useRecoilState(AnoteLog);
	const [isWriteNote, setIsWriteNote] = useRecoilState(AwriteNote);

	const [garaData, setGaraData] = useState([
		{
			id: 3,
			name: '홍길동',
			contents: '혹시 아직 팔렸나요?',
			date: '2023. 5. 4',
		},
		{
			id: 7,
			name: '나',
			contents: '왜 연락을 안받니',
			date: '2022.10.11',
		},
	]);

	useEffect(() => {
		setOn(true);
	}, []);
	return (
		<div className={`${styles.noteLog} ${on ? styles.on : null}`}>
			<div className={styles.boxHeader}>
				<div className={styles.backWrap}>
					<img
						onClick={() => {
							setOn(false);
							setTimeout(() => {
								setIsLogOn(prev => ({...prev, on: false}));
							}, 300);
						}}
						className={styles.goBack}
						src="/icon/left.svg"
						alt="go back icon"
					/>
					<span>{isLogOn.name}</span>
				</div>
				<img
					onClick={() => {
						setIsWriteNote(true);
					}}
					className={styles.writeNote}
					src="/icon/send.svg"
					alt="쪽지 보내기"
				/>
			</div>
			<hr className={styles.headerBoundary} />
			<ul className={styles.listWrap}>
				{garaData.map((data, i) => (
					<NoteCard
						onClick={() => {}}
						setIsLogOn={setIsLogOn}
						key={i}
						data={data}
					/>
				))}
			</ul>
		</div>
	);
}

export default NoteLog;
