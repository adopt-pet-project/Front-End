import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Header from '@/components/header';
import OrderBy from '@/components/orderby';
import Article from '@/components/adopt/article';
import Paging from '@/components/adopt/paging';

const DummyData: any[] = [];

for (let i = 0; i < 9; i++) {
	DummyData.push({
		id: i,
		title: '강아지 분양합니다',
		species: '진돗개',
		status: 0,
		location: '경기도 광주',
		bookmark: 3,
		chat: 6,
		publishedAt: '3분 전',
		thumb:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	});
}

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
				<Paging
					lastArticleId={firstPage[firstPage.length - 1].id}
					query={filter}
					order={filter}
				/>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let result = await (
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt`)
	).json();

	return {
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
