import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyPageCtg from '@/components/myPage/myAdopt/myAdoptCtg';
import Header from '@/components/myPage/header';
import MyPageCardList from '@/components/myPage/myAdopt/myAdoptCardList';

function GetAdopt() {
	return (
		<>
			<Header type={'분양 받기'} />
			<MyPageCtg />
			<MyPageCardList />
		</>
	);
}

export default GetAdopt;

GetAdopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
