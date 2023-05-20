import styles from '@/styles/components/header/alarm/alarmBox.module.scss';
import AlarmCtg from './alarmCtg';
import {useEffect, useRef, useState} from 'react';
import CardListWrap from './alarmCard/cardListWrap';

function AlarmBox({
	setIsAlarmBoxOn,
	alarmData,
	noteData,
	chatData,
}: {
	setIsAlarmBoxOn: (status: boolean) => void;
	alarmData: Alarmdata[];
	noteData: Notedata[];
	chatData: Chatdata[];
}) {
	const [currentCtg, setCurrentCtg] = useState<0 | 1 | 2>(0);

	const alarmBoxRef = useRef<HTMLDivElement>(null);

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
			target.classList[0].includes('profileLoginTrue_imgWrap')
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
			<AlarmCtg setCurrentCtg={setCurrentCtg} currentCtg={currentCtg} />
			<CardListWrap
				alarmData={alarmData}
				noteData={noteData}
				chatData={chatData}
				ctgType={currentCtg}
			/>
		</div>
	);
}

export default AlarmBox;
