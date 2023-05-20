import styles from '@/styles/components/header/alarm/alarmBox.module.scss';
import AlarmCtg from './alarmCtg';
import {useEffect, useRef, useState} from 'react';
import CardListWrap from './alarmCard/cardListWrap';
import {useRecoilState} from 'recoil';
import {AalarmboxCtg, AisAlarmBoxOn} from '@/utils/recoil/recoilStore';

function AlarmBox({
	alarmData,
	noteData,
	chatData,
}: {
	alarmData: Alarmdata[];
	noteData: Notedata[];
	chatData: Chatdata[];
}) {
	const [currentCtg, setCurrentCtg] = useRecoilState(AalarmboxCtg);

	const alarmBoxRef = useRef<HTMLDivElement>(null);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);

	const findHaveParent = (
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement => {
		if (node === target) {
			return true;
		} else {
			if (node === null) {
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	};
	const handleCloseProfile = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			findHaveParent(
				e.target as HTMLElement,
				alarmBoxRef.current as HTMLElement,
			) ||
			target.classList[0].includes('profileLoginTrue_imgWrap') ||
			target.classList[0].includes('noteLog_goBack')
		) {
		} else setIsAlarmBoxOn(false);
	};
	useEffect(() => {
		window.addEventListener<any>('click', handleCloseProfile);

		return () => {
			window.removeEventListener<any>('click', handleCloseProfile);
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
		</div>
	);
}

export default AlarmBox;
