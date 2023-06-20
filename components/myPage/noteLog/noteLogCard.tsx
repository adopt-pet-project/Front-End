import React from 'react';
import styles from '@/styles/components/myPage/noteLog/noteLogCard.module.scss';
import {convertDate} from '@/utils/functions/convertDate';
function NoteLogCard({
	data,
}: {
	data: {
		id: number;
		mine: boolean;
		contents: string;
		publishedAt: string;
		deleteStatus: 0 | 1;
	};
}) {
	console.log(data.publishedAt);
	return (
		<li className={styles.noteLogCard}>
			<div className={styles.name}>
				{data.mine ? (
					<span style={{color: 'green'}}>보낸 쪽지</span>
				) : (
					<span style={{color: 'red'}}>받은 쪽지</span>
				)}
				<span className={styles.date}>
					{convertDate(new Date(data.publishedAt).getTime())}
				</span>
			</div>
			<div className={styles.contents}>
				{data.deleteStatus === 1 ? null : data.contents}
			</div>
		</li>
	);
}

export default NoteLogCard;
