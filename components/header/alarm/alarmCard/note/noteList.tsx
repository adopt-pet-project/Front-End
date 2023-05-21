import React, {useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/note/noteList.module.scss';
import NoteCard from '../noteCard';
import {useRecoilState} from 'recoil';
import {AnoteLog} from '@/utils/recoil/recoilStore';

function NoteList() {
	const [isLogOn, setIsLogOn] = useRecoilState(AnoteLog);
	const [garaData, setGaraData] = useState([
		{
			id: 3,
			name: '홍길동',
			contents: '혹시 아직 팔렸나요?',
			date: '2023. 5. 4',
		},
		{
			id: 7,
			name: '나',
			contents: '왜 연락을 안받니',
			date: '2022.10.11',
		},
	]);
	return (
		<ul className={styles.listWrap}>
			{garaData.map((data, i) => (
				<NoteCard key={i} data={data} />
			))}
		</ul>
	);
}

export default NoteList;
