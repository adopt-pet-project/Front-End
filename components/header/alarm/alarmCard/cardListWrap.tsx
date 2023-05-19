import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/cardListWrap.module.scss';
import AlarmCard from './alarmCard';
import NoteCard from './noteCard';
import ChatCard from './chatCard';

function CardListWrap({ctgType}: {ctgType: 0 | 1 | 2}) {
	const list = [1, 2, 3, 4, 5, 61];
	return (
		<ul className={styles.listWrap}>
			{ctgType === 0 ? (
				list.map(() => <AlarmCard alarmType={'gd'} />)
			) : ctgType === 1 ? (
				<NoteCard />
			) : (
				<ChatCard />
			)}
		</ul>
	);
}

export default CardListWrap;
