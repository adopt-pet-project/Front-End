import React, {useEffect, useState} from 'react';
import NoteCard from './noteCard';
import styles from '@/styles/components/myPage/noteList.module.scss';
import useFetch from '@/utils/hooks/useFetch';

function NoteList() {
	const [noteData, setNoteData] = useState<
		{
			id: number;
			name: string;
			contents: string;
			publishedAt: string;
			checked: boolean;
			targetId: number;
			deleteStatus: 0 | 1;
		}[]
	>([]);

	const [_, fetchNote] = useFetch('/note/list', 'GET', true, data => {
		setNoteData(data);
	});

	useEffect(() => {
		fetchNote();
	}, []);
	return (
		<ul className={styles.noteList}>
			{noteData.map((data, i) => (
				<NoteCard data={data} key={i} />
			))}
		</ul>
	);
}

export default NoteList;
