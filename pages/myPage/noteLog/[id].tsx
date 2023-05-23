import React, {useState} from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/myPage/header';
import NoteLog from '@/components/myPage/noteLog/noteLog';

function noteLog() {
	const [noteData, setNoteData] = useState([
		{
			id: 0,
			my: false,
			contents: '혹시 아직 안팔렸나요?',
			date: '2023. 5. 1',
		},
		{
			id: 1,
			my: true,
			contents: '언제 연락 주실 건가요?',
			date: '2022.10. 4',
		},
	]);
	return (
		<section className="body">
			<Header type={`쪽지 내역ㆍ${'홍길동'}`} />
			<NoteLog noteData={noteData} />
		</section>
	);
}

export default noteLog;

noteLog.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
