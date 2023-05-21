import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/header';
import OrderBy from '@/components/orderby';
import Article from '@/components/adopt/article';
import Paging from '@/components/adopt/paging';

const orderList: Order[] = [
	{order: 'all', orderText: '전체', href: '/adopt'},
	{order: 'dog', orderText: '강아지', href: '/adopt?filter=dog'},
	{order: 'cat', orderText: '고양이', href: '/adopt?filter=cat'},
	{order: 'etc', orderText: '기타', href: '/adopt?filter=etc'},
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
	return (
		<>
			<Header query={query} path={'adopt'} />
			{!query && <OrderBy orderList={orderList} currentOrder={filter} />}
			<section className="body">
				{firstPage.map((article: any) => {
					return <Article key={article.id} article={article} />;
				})}
				{/* {firstPage.length === 10 && ( */}
				<Paging
					lastArticleId={firstPage[firstPage.length - 1].id}
					query={filter}
					order={filter}
				/>
				{/* )} */}
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt`);
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
					filter: query.filter || 'all',
					query: query.q || '',
					firstPage: result,
				},
		  };
};

Adopt.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
