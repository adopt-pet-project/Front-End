import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import GetAdoptCtg from '@/components/myPage/getAdopt/getAdoptCtg';
import Header from '@/components/myPage/header';
import GetAdoptCardList from '@/components/myPage/getAdopt/getAdoptCardList';

function GetAdopt() {
	return (
		<>
			<Header type={'분양 받기'} />
			<GetAdoptCtg />
			<GetAdoptCardList />
		</>
	);
}

export default GetAdopt;

GetAdopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
