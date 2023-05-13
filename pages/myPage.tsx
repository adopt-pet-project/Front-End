import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyPageCtg from '@/components/myPage/myPageCtg';
import Header from '@/components/myPage/header';
import MyPageCardList from '@/components/myPage/myPageCardList';

function MyPage() {
	return (
		<>
			<Header />
			<MyPageCtg />
			<MyPageCardList />
		</>
	);
}

export default MyPage;

MyPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
