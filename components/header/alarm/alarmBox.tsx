import styles from '@/styles/components/header/alarm/alarmBox.module.scss';
import AlarmCtg from './alarmCtg';
import {useEffect, useRef, useState} from 'react';
import CardListWrap from './alarmCard/cardListWrap';

function AlarmBox({
	setIsAlarmBoxOn,
}: {
	setIsAlarmBoxOn: (status: boolean) => void;
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
			<CardListWrap ctgType={currentCtg} />
		</div>
	);
}

export default AlarmBox;
