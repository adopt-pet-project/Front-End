import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/myPage/header';
import NoteLog from '@/components/myPage/noteLog/noteLog';
import {useRouter} from 'next/router';

function noteLog() {
	const router = useRouter();

	return (
		<section className="body">
			<Header type={`쪽지 내역ㆍ${router.query.name}`} />
			<NoteLog />
		</section>
	);
}

export default noteLog;

noteLog.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
