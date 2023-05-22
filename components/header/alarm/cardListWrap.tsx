import React from 'react';
import AlarmCard from './alarmCard';
import styles from '@/styles/components/header/alarm/cardListWrap.module.scss';

function CardListWrap({
	alarmData,
}: {
	alarmData: (Alarmdata | Alarmnotedata | Alarmchatdata)[];
}) {
	return (
		<>
			<ul className={styles.listWrap}>
				{alarmData.map((data, i) => (
					<AlarmCard key={i} data={data} />
				))}
			</ul>
		</>
	);
}

export default CardListWrap;
