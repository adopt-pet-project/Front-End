import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyAdoptCtg from '@/components/myPage/myAdopt/myAdoptCtg';
import Header from '@/components/myPage/header';
import MyAdoptCardList from '@/components/myPage/myAdopt/myAdoptCardList';

function MyAdopt() {
	return (
		<>
			<Header type={'나의 분양'} />
			<MyAdoptCtg />
			<MyAdoptCardList />
		</>
	);
}

export default MyAdopt;

MyAdopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
