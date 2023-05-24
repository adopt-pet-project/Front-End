import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useState} from 'react';
import Layout from '@/components/layout/layout';
import Carousel from '@/components/adopt/carousel';
import Header from '@/components/adopt/header';
import Metadata from '@/components/adopt/metadata';
import Context from '@/components/adopt/context';
import Author from '@/components/adopt/author';
import Position from '@/components/adopt/coords';
import {toDate} from '@/utils/functions/toDate';
import Inquiry from '@/components/adopt/inquiry';

export default function View({
	article,
	id,
}: {
	article: AdoptDetail;
	id: number;
}) {
	const [isMine, setIsMine] = useState<boolean>(false);

	useEffect(() => {
		async function fetchMine() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${id}`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
				},
			);
			let result = await response.json();
			setIsMine(result.mine);
		}

		if (window.localStorage.getItem('accessToken') as string) fetchMine();
	}, []);

	return (
		<section className="body">
			<div>
				{article.imageList.length !== 0 && (
					<Carousel imageList={article.imageList} />
				)}
				<Header header={article.header} />
				<Author author={article.author} />
				<Metadata metadata={article.metadata} />
				<Context mine={isMine} id={id} context={article.context} />
				<Position coords={article.coords} />
			</div>
			<Inquiry chat={article.context.chat} mine={isMine} />
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.id}`;
	let response = await fetch(`${URL}`);
	let result = await response.json();
	result.header.publishedAt = toDate(result.header.publishedAt);

	return result.status
		? {
				redirect: {
					permanent: false,
					destination: '/404',
				},
		  }
		: {
				props: {
					id: query.id,
					article: result,
				},
		  };
};

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
