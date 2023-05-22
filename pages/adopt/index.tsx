import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/header';
import OrderBy from '@/components/orderby';
import Article from '@/components/adopt/article';
import Paging from '@/components/adopt/paging';

const orderList: Order[] = [
	{order: '', orderText: '전체'},
	{order: 'dog', orderText: '강아지'},
	{order: 'cat', orderText: '고양이'},
	{order: 'etc', orderText: '기타'},
];

export default function Adopt({
	filter,
	query,
	firstPage,
}: {
	filter: string;
	query: string;
	firstPage: Adopt[];
}) {
	console.log(firstPage);
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
						query={filter}
						order={filter}
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

	URL += keyword ? `&keyword=${keyword}&option=${Number(option)}` : '';
	URL += filter ? `&filter=${filter}` : '';

	let response = await fetch(`${URL}`);
	let result = await response.json();

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
					firstPage: result,
				},
		  };
};

Adopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
