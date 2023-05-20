import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/cardListWrap.module.scss';
import AlarmCard from './alarmCard';
import NoteCard from './noteCard';
import ChatCard from './chatCard';

function CardListWrap({
	ctgType,
	alarmData,
	noteData,
	chatData,
}: {
	ctgType: 0 | 1 | 2;
	alarmData: Alarmdata[];
	chatData: Chatdata[];
	noteData: Notedata[];
}) {
	return (
		<ul className={styles.listWrap}>
			{ctgType === 0
				? alarmData.map(i => <AlarmCard data={i} />)
				: ctgType === 1
				? noteData.map(i => <NoteCard data={i} />)
				: chatData.map(i => <ChatCard data={i} />)}
		</ul>
	);
}

export default CardListWrap;
