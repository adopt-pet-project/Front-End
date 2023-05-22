import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/noteCard.module.scss';

function NoteCard({data, onClick}: {data: Notedata; onClick?: () => void}) {
	return (
		<div
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
			className={styles.cardWrap}
		>
			<div className={styles.nameWrap}>
				<span className={styles.name}>{data.name}</span>
				<span className={styles.number}>{1}</span>
			</div>
			<div className={styles.contents}>{data.contents}</div>
			<div className={styles.date}>{data.date}</div>
		</div>
	);
}

export default NoteCard;
