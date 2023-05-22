import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Article from '@/components/board/article';
import OrderBy from '@/components/orderby';
import Header from '@/components/header';
import Banner from '@/components/board/banner';
import Paging from '@/components/board/paging';

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

const orderList: Order[] = [
	{order: '', orderText: '최신순'},
	{order: 'popular', orderText: '인기순'},
];

export default function Board({order, query}: {order: string; query: string}) {
	return (
		<>
			<Header query={query} path={'board'} />
			<OrderBy orderList={orderList} currentOrder={order} orderType="order" />
			<section className="body">
				{!query && <Banner />}
				{DummyData.map((article: any) => {
					return <Article key={article.id} article={article} />;
				})}
				<Paging
					lastArticleId={DummyData[DummyData.length - 1].id}
					query={order}
					order={order}
				/>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let result = await (
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/community`)
	).json();

	console.log(result);

	return {
		props: {order: query.order || '', query: query.q || ''},
	};
};

Board.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
