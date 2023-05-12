import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyPageCtg from '@/components/myPage/myPageCtg';
import Header from '@/components/myPage/header';

function MyPage() {
	return (
		<>
			<Header />
			<MyPageCtg />
			<ul>
				<li>내용1</li>
				<li>내용2</li>
				<li>내용3</li>
				<li>내용4</li>
			</ul>
		</>
	);
}

export default MyPage;

MyPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
