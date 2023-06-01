import React, {useEffect, useState} from 'react';
import NoteLogCard from './noteLogCard';
import styles from '@/styles/components/myPage/noteLog/noteLog.module.scss';
import useFetch from '@/utils/hooks/useFetch';
import {useRouter} from 'next/router';
function NoteLog() {
	const router = useRouter();
	const [noteData, setNoteData] = useState<
		{
			id: number;
			mine: boolean;
			contents: string;
			publishedAt: string;
			deleteStatus: 0 | 1;
		}[]
	>([]);
	console.log(router.query.id);
	const [_, fetchNote] = useFetch(
		`/note/history/${router.query.id}`,
		'GET',
		true,
		data => {
			setNoteData(data);
		},
	);

	useEffect(() => {
		console.log(noteData);
	}, [noteData]);

	useEffect(() => {
		if (router.query.id) fetchNote();
	}, []);

	return (
		<div className={styles.noteLog}>
			{noteData.map((data, i) => (
				<NoteLogCard data={data} key={i} />
			))}
		</div>
	);
}

export default NoteLog;
