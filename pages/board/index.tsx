import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Article from '@/components/board/article';
import OrderBy from '@/components/orderby';
import Header from '@/components/header';
import Banner from '@/components/board/banner';
import Paging from '@/components/board/paging';
import {convertDate} from '@/utils/functions/convertDate';

const orderList: Order[] = [
	{order: 'recent', orderText: '최신순'},
	{order: 'like', orderText: '인기순'},
];

export default function Board({
	order,
	query,
	param,
	firstPage,
}: {
	order: string;
	query: string;
	param: any;
	firstPage: any;
}) {
	return (
		<>
			<Header query={query} path={'board'} />
			<OrderBy orderList={orderList} currentOrder={order} orderType="order" />
			<section className="body">
				{!query && <Banner hot={firstPage.hot} weekly={firstPage.weekly} />}
				{firstPage.list.map((article: any) => {
					return <Article key={article.id} article={article} />;
				})}
				<Paging param={param} />
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const order = query.order === 'like' || 'recent';

	let result = await (
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/community/list/${order}`)
	).json();

	result.list.forEach((article: any) => {
		article.publishedAt = convertDate(new Date(article.publishedAt).getTime());
	});

	result.hot.publishedAt = convertDate(
		new Date(result.hot.publishedAt).getTime(),
	);
	result.weekly.publishedAt = convertDate(
		new Date(result.weekly.publishedAt).getTime(),
	);
	return {
		props: {
			order: query.order || 'recent',
			query: query.q || '',
			param: query,
			firstPage: result,
		},
	};
};

Board.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
