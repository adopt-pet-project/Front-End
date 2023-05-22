import React, {useState} from 'react';
import NoteCard from './noteCard';
import styles from '@/styles/components/myPage/noteList.module.scss';

function NoteList() {
	const [noteData, setNoteData] = useState([
		{
			id: 0,
			name: '홍길동',
			contents: '혹시 아직 안팔렸나요?',
			date: '2023. 5. 1',
			new: true,
		},
		{
			id: 1,
			name: '민지',
			contents: '왜 연락을 안받니...',
			date: '2022.10. 4',
			new: false,
		},
	]);
	return (
		<ul className={styles.noteList}>
			{noteData.map((data, i) => (
				<NoteCard data={data} key={i} />
			))}
		</ul>
	);
}

export default NoteList;
