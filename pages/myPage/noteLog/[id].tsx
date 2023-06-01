import React, {useState} from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/myPage/header';
import NoteLog from '@/components/myPage/noteLog/noteLog';

function noteLog() {
	return (
		<section className="body">
			<Header type={`쪽지 내역ㆍ${'홍길동'}`} />
			<NoteLog />
		</section>
	);
}

export default noteLog;

noteLog.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
