import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyPageCtg from '@/components/myPage/myPageCtg';

function MyPage() {
	return (
		<>
			<header>나의 분양</header>
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
