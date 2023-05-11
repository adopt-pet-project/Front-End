import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Link from 'next/link';
import ArticleSkeleton from '@/components/board/articleSkeleton';
import Layout from '@/components/layout/layout';
import Search from '@/components/search/search';
import Article from '@/components/board/article';
import styles from '@/styles/pages/board.module.scss';

const moreData = {
	id: 1,
	title: '제목입니다',
	context: '적당한 길이를 가진 본문 내용입니다',
	author: '작성자',
	view: 5,
	comment: 5,
	like: 5,
	publishedAt: '50분 전',
	thumb: 'null',
};

const DummyData: any[] = [];

for (let i = 0; i < 9; i++) {
	DummyData.push({
		id: i,
		title: '타이틀',
		context: '본문',
		author: '김성태',
		view: 3,
		comment: 6,
		like: 2,
		publishedAt: '글쓴시간',
		thumb:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	});
}

export default function Board({order, query}: {order: string; query: string}) {
	const titleText = query ? `${query}에 대한 검색 결과` : '게시판';

	return (
		<>
			<div className={styles.header}>
				<span className={styles.title}>{titleText}</span>
				<Search currentPath="board" />
				<button className={styles.writeButton}>
					<img
						style={{padding: '4px'}}
						width={32}
						height={32}
						src="/icon/write.svg"
						alt="write icon"
					/>
				</button>
			</div>
			{!query && (
				<div className={styles.order}>
					<Link
						className={`${styles.orderItem} ${
							order === 'recent' ? `${styles.active}` : ''
						}`}
						href="/board?order=recent"
					>
						최신순
					</Link>
					<Link
						className={`${styles.orderItem} ${
							order === 'popular' ? `${styles.active}` : ''
						}`}
						href="/board?order=popular"
					>
						인기순
					</Link>
				</div>
			)}
			<section className="body">
				{!query && (
					<div className={styles.banner}>
						<div className={styles.weekly}>
							<div
								className={styles.hot}
								style={{backgroundColor: 'var(--red)'}}
							>
								Weekly
							</div>
							<span className={styles.bannerTitle}>꿀팁 & 링크 모음</span>
							<span className={styles.bannerTime}>3일 전</span>
						</div>
						<div className={styles.trending}>
							<div
								className={styles.hot}
								style={{backgroundColor: 'var(--black)'}}
							>
								Trending
							</div>
							<div className={styles.article}>
								<span className={styles.bannerTitle}>옆집이 수상해요..</span>
								<span className={styles.bannerTime}>3시간 전</span>
							</div>
						</div>
					</div>
				)}
				{DummyData.map((article: any) => {
					return <Article key={article.id} article={article} />;
				})}
				<ArticleSkeleton />
				<div className={styles.more}>
					<span className={styles.text}>더보기</span>
					<div style={{filter: 'blur(5px)'}}>
						<Article article={moreData} />
					</div>
				</div>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	resolvedUrl,
	query,
}) => {
	// let result = await (await fetch('http://3.36.132.160/hello')).text();
	return {
		props: {order: query.order || 'recent', query: query.q || ''},
	};
};

Board.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
