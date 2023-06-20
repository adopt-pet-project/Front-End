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
	firstPage: BoardFirstPage;
}) {
	return (
		<>
			<Header query={query} path={'board'} />
			<OrderBy orderList={orderList} currentOrder={order} orderType="order" />
			<section className="body">
				{!query && <Banner hot={firstPage.hot} weekly={firstPage.weekly} />}
				{firstPage.list.map((article: Board) => {
					return <Article key={article.id} article={article} />;
				})}
				{firstPage.list.length == 10 && <Paging param={param} />}
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const order = query.order === 'like' ? 'like' : 'recent';

	let result;

	let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/community/list/${order}?`;

	if (query.q) {
		url += `&keyword=${query.q}`;
	}

	if (query.option) {
		url += `&option=${query.option}`;
	}

	try {
		result = await (await fetch(url)).json();

		if (result.status) throw new Error('error');

		result.list.forEach((article: any) => {
			article.publishedAt = convertDate(
				new Date(article.publishedAt).getTime() - 32400000,
			);
			if (article.author == null) article.author = '탈퇴한 사용자';
		});

		if (result.hot)
			result.hot.publishedAt = convertDate(
				new Date(result.hot.publishedAt).getTime() - 32400000,
			);
		if (result.weekly)
			result.weekly.publishedAt = convertDate(
				new Date(result.weekly.publishedAt).getTime() - 32400000,
			);
		return {
			props: {
				order: query.order || 'recent',
				query: query.q || '',
				param: query,
				firstPage: result,
			},
		};
	} catch {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
		};
	}
};

Board.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
