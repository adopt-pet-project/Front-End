import React, {useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCtg.module.scss';

function AlarmCtg({
	currentCtg,
	setCurrentCtg,
}: {
	currentCtg: 0 | 1 | 2;
	setCurrentCtg: (type: 0 | 1 | 2) => void;
}) {
	const nStyle = {
		color: 'red',
		fontWeight: 'bold',
	};
	return (
		<div className={styles.ctgWrap}>
			<span
				onClick={() => {
					setCurrentCtg(0);
				}}
				className={styles.ctgBtn}
			>
				알림<span style={nStyle}>N</span>
			</span>
			<span
				onClick={() => {
					setCurrentCtg(1);
				}}
				className={styles.ctgBtn}
			>
				쪽지<span style={nStyle}>N</span>
			</span>
			<span
				onClick={() => {
					setCurrentCtg(2);
				}}
				className={styles.ctgBtn}
			>
				채팅<span style={nStyle}>N</span>
			</span>
			<hr
				className={`${styles.ctgBoundary} ${
					currentCtg === 0
						? styles.alarm
						: currentCtg === 1
						? styles.message
						: styles.chatting
				}`}
			/>
		</div>
	);
}

export default AlarmCtg;
