import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {AalarmboxCtg, AnoteLog, AwriteNote} from '@/utils/recoil/recoilStore';
import WriteNote from './note/writeNote';
import NoteList from './note/noteList';
import styles from '@/styles/components/header/alarm/alarmCard/logWrap.module.scss';

function LogWrap() {
	const [on, setOn] = useState(false);
	const [isLogOn, setIsLogOn] = useRecoilState(AnoteLog);
	const [isWriteNote, setIsWriteNote] = useRecoilState(AwriteNote);
	const [currentCtg, setCurrentCtg] = useRecoilState(AalarmboxCtg);

	useEffect(() => {
		setOn(true);
	}, []);
	return (
		<>
			<div className={`${styles.logWrap} ${on ? styles.on : null}`}>
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
					{currentCtg === 1 ? (
						<img
							onClick={() => {
								setIsWriteNote(true);
							}}
							className={styles.writeNote}
							src="/icon/send.svg"
							alt="쪽지 보내기"
						/>
					) : (
						<div className={styles.reserve}>예약하기</div>
					)}
				</div>
				<hr className={styles.headerBoundary} />
				{currentCtg === 1 ? <NoteList /> : null}
			</div>
			{isWriteNote ? <WriteNote /> : null}
		</>
	);
}

export default LogWrap;
