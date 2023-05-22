import React from 'react';
import NoteLogCard from './noteLogCard';
import styles from '@/styles/components/myPage/noteLog/noteLog.module.scss';
function NoteLog({
	noteData,
}: {
	noteData: {
		id: number;
		my: boolean;
		contents: string;
		date: string;
	}[];
}) {
	return (
		<div className={styles.noteLog}>
			{noteData.map((data, i) => (
				<NoteLogCard data={data} key={i} />
			))}
		</div>
	);
}

export default NoteLog;
