import React from 'react';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import MyAdoptCtg from '@/components/myPage/myAdopt/myAdoptCtg';
import Header from '@/components/myPage/header';
import MyAdoptCardList from '@/components/myPage/myAdopt/myAdoptCardList';
import styles from '@/styles/pages/myPage/myAdopt.module.scss';

function MyAdopt() {
	return (
		<section className="body">
			<Header type={'나의 분양'} />
			<div className={styles.myAdoptWrap}>
				<MyAdoptCtg />
				<MyAdoptCardList />
			</div>
		</section>
	);
}

export default MyAdopt;

MyAdopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
