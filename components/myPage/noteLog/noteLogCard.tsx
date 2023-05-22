import React from 'react';
import styles from '@/styles/components/myPage/noteLog/noteLogCard.module.scss';
function NoteLogCard({
	data,
}: {
	data: {
		id: number;
		my: boolean;
		contents: string;
		date: string;
	};
}) {
	return (
		<li className={styles.noteLogCard}>
			<div className={styles.name}>
				{data.my ? (
					<span style={{color: 'green'}}>보낸 쪽지</span>
				) : (
					<span style={{color: 'red'}}>받은 쪽지</span>
				)}
				<span className={styles.date}>{data.date}</span>
			</div>
			<div className={styles.contents}>{data.contents}</div>
		</li>
	);
}

export default NoteLogCard;
