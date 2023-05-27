import {useEffect, useRef, useState} from 'react';
import Article from './article';
import ArticleSkeleton from '../articleSkeleton';
import styles from '@/styles/components/board/paging.module.scss';
import {convertDate} from '@/utils/functions/convertDate';

const moreData = {
	id: null,
	title: '제목입니다',
	context: '적당한 길이를 가진 본문 내용입니다',
	author: '작성자',
	view: 5,
	comment: 5,
	like: 5,
	publishedAt: '50분 전',
	thumbnail: 'NONE',
};

export default function Paging({param}: {param: any}) {
	const [lazyLoadArticle, setLazyLoadArticle] = useState<Board[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const currentPage = useRef<number>(2);

	const skeleton = [];

	useEffect(() => {
		currentPage.current = 2;
		setIsLoading(false);
		setLazyLoadArticle([]);
		setHasMore(true);
	}, [param]);

	for (let i = 0; i < 10; i++) {
		skeleton.push(<ArticleSkeleton key={i} />);
	}

	async function loadArticle() {
		setIsLoading(true);

		let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/community/list/${
			param.order || 'recent'
		}?page=${currentPage.current}`;

		const keyword = param.q;
		const option = param.option || '0';

		URL += keyword ? `&keyword=${keyword}&option=${Number(option)}` : '';
		let response = await fetch(URL);
		let result = await response.json();

		if (result.list.length != 0) {
			result.list.forEach((article: Board) => {
				article.publishedAt = convertDate(
					new Date(article.publishedAt).getTime(),
				);
			});
		}
		currentPage.current += 1;
		setHasMore(result.list.length === 10);
		setLazyLoadArticle([...lazyLoadArticle, ...result.list]);
		setIsLoading(false);
	}

	return (
		<>
			{lazyLoadArticle.map((article: Board) => {
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
