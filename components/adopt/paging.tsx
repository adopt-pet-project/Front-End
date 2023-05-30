import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';
import Article from './article';
import ArticleSkeleton from '../articleSkeleton';
import {convertDate} from '@/utils/functions/convertDate';
import styles from '@/styles/components/adopt/paging.module.scss';

const moreData = {
	title: '강인한 허스키 분양해요',
	type: '강아지',
	address: '서울 마포구',
	bookmark: 1,
	chat: 1,
	publishedAt: 16236247457,
	thumbnail:
		'https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/cat.jpeg',
	species: '시베리안 허스키',
	status: 0,
};

export default function Paging({
	lastArticleId,
	param,
}: {
	lastArticleId: any;
	param: any;
}) {
	const [lazyLoadArticle, setLazyLoadArticle] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const lastestLastArticleId = useRef<any>();

	const skeleton = [];

	for (let i = 0; i < 10; i++) {
		skeleton.push(<ArticleSkeleton key={i} />);
	}

	useEffect(() => {
		lastestLastArticleId.current = lastArticleId;
	}, []);

	useEffect(() => {
		setLazyLoadArticle([]);
		setHasMore(true);
		setIsLoading(false);
	}, [lastArticleId]);

	async function loadArticle(e: BaseSyntheticEvent) {
		setIsLoading(true);
		let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt?saleNo=${lastestLastArticleId.current}`;

		const filter = param.filter;
		const keyword = param.q;
		const option = param.option || '0';

		const filterBind = {dog: '강아지', cat: '고양이', etc: '기타'};

		URL += keyword ? `&keyword=${keyword}&option=${Number(option)}` : '';
		URL += filter
			? `&filter=${filterBind[filter as 'dog' | 'cat' | 'etc']}`
			: '';
		let response = await fetch(URL);
		let result = await response.json();
		result.forEach((article: any) => {
			article.publishedAt = convertDate(article.publishedAt);
		});

		if (result.length !== 0)
			lastestLastArticleId.current = result[result.length - 1].id;
		setHasMore(result.length === 10);
		setLazyLoadArticle([...lazyLoadArticle, ...result]);
		setIsLoading(false);
	}

	return (
		<>
			{lazyLoadArticle.map((article: any) => {
				return <Article key={article.id} article={article} />;
			})}
			{isLoading && skeleton}
			{hasMore && !isLoading && (
				<div className={styles.more} onClick={loadArticle}>
					<span className={styles.text}>더보기</span>
					<div style={{filter: 'blur(5px)'}}>
						<Article article={moreData} />
					</div>
				</div>
			)}
		</>
	);
}
