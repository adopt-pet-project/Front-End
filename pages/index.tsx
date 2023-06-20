import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import MainMap from '@/components/main/mainMap';
import styles from '@/styles/pages/index.module.scss';
import Layout from '@/components/layout/layout';

export default function Home() {
	return (
		<>
			<section className="body">
				<article className={styles.article}>
					<span className={styles.title}>분양 지도로 보기</span>
					<div className={styles.map}>
						<MainMap />
					</div>
				</article>
				{/* <article className={styles.article}>
					<span className={styles.title}>인기 게시글</span>
					<div className={styles.map}></div>
				</article>
				<article className={`${styles.article} ${styles.lastArticle}`}>
					<span className={styles.title}>핫한 분양글</span>
					<div className={styles.map}></div>
				</article> */}
			</section>
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
