import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import GetAdoptCtg from '@/components/myPage/getAdopt/getAdoptCtg';
import Header from '@/components/myPage/header';
import GetAdoptCardList from '@/components/myPage/getAdopt/getAdoptCardList';
import styles from '@/styles/pages/myPage/getAdopt.module.scss';

function GetAdopt() {
	return (
		<section className="body">
			<Header type={'분양 받기'} />
			<div className={styles.getAdoptWrap}>
				<GetAdoptCtg />
				<GetAdoptCardList />
			</div>
		</section>
	);
}

export default GetAdopt;

GetAdopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
