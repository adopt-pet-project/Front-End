import {useState} from 'react';
import Article from './article';
import styles from '@/styles/components/board/paging.module.scss';
import ArticleSkeleton from './articleSkeleton';

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

	function loadArticle() {
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
