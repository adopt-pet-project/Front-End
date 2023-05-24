import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/header';
import OrderBy from '@/components/orderby';
import Article from '@/components/adopt/article';
import Paging from '@/components/adopt/paging';
import {convertDate} from '@/utils/functions/convertDate';

const orderList: Order[] = [
	{order: '', orderText: '전체'},
	{order: 'dog', orderText: '강아지'},
	{order: 'cat', orderText: '고양이'},
	{order: 'etc', orderText: '기타'},
];

export default function Adopt({
	param,
	filter,
	query,
	firstPage,
}: {
	param: any;
	filter: string;
	query: string;
	firstPage: Adopt[];
}) {
	return (
		<>
			<Header query={query} path={'adopt'} />
			<OrderBy orderList={orderList} currentOrder={filter} orderType="filter" />
			<section className="body">
				{firstPage.map((article: Adopt) => {
					return (
						article.status != 9 && (
							<Article key={article.id} article={article} />
						)
					);
				})}
				{firstPage.length === 10 && (
					<Paging
						lastArticleId={firstPage[firstPage.length - 1].id}
						param={param}
					/>
				)}
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt?`;

	const filter = query.filter;
	const keyword = query.q;
	const option = query.option || '0';

	const filterBind = {dog: '강아지', cat: '고양이', etc: '기타'};

	URL += keyword ? `&keyword=${keyword}&option=${Number(option)}` : '';
	URL += filter ? `&filter=${filterBind[filter as 'dog' | 'cat' | 'etc']}` : '';
	let response = await fetch(`${URL}`);
	let result = await response.json();
	console.log(result);
	result.forEach((article: any) => {
		article.publishedAt = convertDate(article.publishedAt);
	});

	result.forEach((article: any) => {
		article.publishedAt = convertDate(article.publishedAt);
	});

	return result.status
		? {
				redirect: {
					permanent: false,
					destination: '/404',
				},
		  }
		: {
				props: {
					filter: query.filter || '',
					query: query.q || '',
					param: query,
					firstPage: result,
				},
		  };
};

Adopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
