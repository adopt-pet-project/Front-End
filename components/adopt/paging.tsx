import {BaseSyntheticEvent, useState} from 'react';
import Article from './article';
import ArticleSkeleton from '../articleSkeleton';
import styles from '@/styles/components/adopt/paging.module.scss';

const moreData = {
	title: '강아지 한마리 분양합니다.',
	kind: '강아지',
	location: '서울특별시 서대문구',
	bookmark: 0,
	chat: 0,
	publishedAt: '3분 전',
	thumbnail: '/image2',
	species: '웰시코기',
	status: 0,
};

const DummyData: any[] = [];

for (let i = 0; i < 9; i++) {
	DummyData.push({
		id: i,
		title: '타이틀',
		context: '본문',
		author: '김성태',
		status: 0,
		location: '경기도 광주',
		bookmark: 3,
		chat: 6,
		publishedAt: '3분 전',
		thumbnail:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	});
}

export default function Paging({
	lastArticleId,
	order,
	query,
}: {
	lastArticleId: any;
	order: string;
	query: string;
}) {
	const [lazyLoadArticle, setLazyLoadArticle] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	function loadArticle(e: BaseSyntheticEvent) {
		setIsLoading(true);
		setTimeout(() => {
			setLazyLoadArticle([...lazyLoadArticle, ...DummyData]);
			setIsLoading(false);
		}, 1000);
	}

	return (
		<>
			{lazyLoadArticle.map((article: any) => {
				return <Article key={article.id} article={article} />;
			})}
			{isLoading && new Array(10).fill(<ArticleSkeleton />)}
			<div className={styles.more} onClick={loadArticle}>
				<span className={styles.text}>더보기</span>
				<div style={{filter: 'blur(5px)'}}>
					<Article article={moreData} />
				</div>
			</div>
		</>
	);
}
