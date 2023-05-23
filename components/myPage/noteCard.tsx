import React from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/myPage/noteCard.module.scss';
function NoteCard({
	data,
}: {
	data: {
		id: number;
		name: string;
		contents: string;
		date: string;
		new: boolean;
	};
}) {
	const router = useRouter();
	return (
		<li
			onClick={() => {
				router.push(`/myPage/noteLog/${data.id}`);
			}}
			className={styles.noteCard}
		>
			<div className={styles.name}>
				{data.name} <span style={{color: 'red'}}>{data.new ? 'N' : null}</span>
			</div>
			<div className={styles.contents}>{data.contents}</div>
			<div className={styles.date}>{data.date}</div>
		</li>
	);
}

export default NoteCard;
