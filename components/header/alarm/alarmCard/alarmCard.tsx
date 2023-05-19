import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/cardListWrap.module.scss';

function AlarmCard({alarmType}: {alarmType: string}) {
	return (
		<div className={styles.cardWrap}>
			<div>
				<span></span>
				<span></span>
			</div>
			<div></div>
			<div></div>
		</div>
	);
}

export default AlarmCard;
