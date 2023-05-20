import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import styles from '@/styles/pages/adopt/view.module.scss';
import Carousel from '@/components/adopt/carousel';
import Header from '@/components/adopt/header';
import Metadata from '@/components/adopt/metadata';
import Context from '@/components/adopt/context';
import Author from '@/components/adopt/author';
import Position from '@/components/adopt/coords';

const dummyData: AdoptDetail = {
	id: 3,
	authorId: 'N3HF7ASHA',
	coords: {
		latitude: 37.55467,
		longitude: 126.970609,
		address: '경기도 광주시',
	},
	images: [
		{
			imageNo: 1,
			imageUrl:
				'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		},
		{
			imageNo: 1,
			imageUrl:
				'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		},
	],
	header: {
		title: '강아지 분양합니다',
		status: 0,
		publishedAt: 1623723476,
	},
	metadata: {
		gender: '남',
		age: '1년 5개월',
		name: '댕댕이',
		species: '진돗개',
	},
	context: {
		context: '순한 아이입니다.\n좋은분 기다려요.',
		bookmark: 3,
		chat: 6,
	},
	author: {
		author: '김성태',
		profile:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		location: '서울특별시 노원구',
		mine: false,
	},
};

export default function View() {
	return (
		<section className="body">
			<div>
				<Carousel images={dummyData.images} />
				<Header header={dummyData.header} />
				<Metadata metadata={dummyData.metadata} />
				<Context context={dummyData.context} />
				<Author author={dummyData.author} />
				<Position coords={dummyData.coords} />
			</div>
			<div className={styles.inquiry}>
				<button>관심목록에 추가</button>
				<button>문의하기</button>
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	resolvedUrl,
	query,
}) => {
	// let result = await (await fetch('http://3.36.132.160/hello')).text();
	// 분양글 상세 로직
	return {
		props: {},
	};
};

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
