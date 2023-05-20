import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chatCard.module.scss';

function ChatCard({data}: {data: Chatdata}) {
	return (
		<div className={styles.cardWrap}>
			<div className={styles.nameWrap}>
				<span className={styles.name}>
					{data.name}ㆍ{data.docTitle}
				</span>
				<span className={styles.number}>{data.stack}</span>
			</div>
			<div className={styles.contents}>{data.content}</div>
			<div className={styles.date}>{data.date}</div>
		</div>
	);
}

export default ChatCard;
