import styles from '@/styles/components/header/alarm/alarmBox.module.scss';
import AlarmCtg from './alarmCtg';
import {useEffect, useRef, useState} from 'react';
import CardListWrap from './alarmCard/cardListWrap';
import {useRecoilState} from 'recoil';
import {AisAlarmBoxOn, AnoteLog, AwriteNote} from '@/utils/recoil/recoilStore';
import WriteNote from './alarmCard/note/writeNote';
import LogWrap from './alarmCard/logWrap';

function AlarmBox({
	alarmData,
	noteData,
	chatData,
}: {
	alarmData: Alarmdata[];
	noteData: Notedata[];
	chatData: Chatdata[];
}) {
	const alarmBoxRef = useRef<HTMLDivElement>(null);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [isLogOn, setIsLogOn] = useRecoilState(AnoteLog);
	const [isWriteNote, setIsWriteNote] = useRecoilState(AwriteNote);
	const findHaveParent = (
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement => {
		console.log(node);
		console.log(target);
		if (node === target) {
			console.log(1);
			return true;
		} else {
			if (node === null) {
				console.log(2);
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	};
	const handleCloseAlarm = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		console.log(target);
		if (
			findHaveParent(
				e.target as HTMLElement,
				alarmBoxRef.current as HTMLElement,
			) ||
			target.classList[0].includes('profileLoginTrue_imgWrap') ||
			target.classList[0].includes('writeNote_writeWrap')
		) {
		} else {
			setIsAlarmBoxOn(false);
			setIsLogOn(prev => ({...prev, on: false}));
			setIsWriteNote(false);
		}
	};

	useEffect(() => {
		window.addEventListener<any>('click', handleCloseAlarm);

		return () => {
			window.removeEventListener<any>('click', handleCloseAlarm);
		};
	}, []);

	return (
		<div ref={alarmBoxRef} className={styles.box}>
			<div className={styles.boxHeader}>
				<img
					className={styles.closeBtn}
					src="/icon/close.svg"
					onClick={() => {
						setIsAlarmBoxOn(false);
					}}
					width={30}
					height={30}
					alt=""
				/>
			</div>
			<hr className={styles.headerBoundary} />
			<AlarmCtg />
			<CardListWrap
				alarmData={alarmData}
				noteData={noteData}
				chatData={chatData}
			/>
			{isLogOn.on ? <LogWrap /> : null}
		</div>
	);
}

export default AlarmBox;
