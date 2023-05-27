import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '@/components/layout/layout';
import Carousel from '@/components/adopt/carousel';
import Header from '@/components/adopt/header';
import Metadata from '@/components/adopt/metadata';
import Context from '@/components/adopt/context';
import Author from '@/components/adopt/author';
import Position from '@/components/adopt/coords';
import Inquiry from '@/components/adopt/inquiry';
import {toDate} from '@/utils/functions/toDate';

export default function View({
	article,
	id,
}: {
	article: AdoptDetail;
	id: number;
}) {
	const [isMine, setIsMine] = useState<boolean>(false);
	const router = useRouter();

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

			if (result.status === 401) {
				router.push(`/refreshToken`);
			} else {
				setIsMine(result.mine);
			}
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
			<Inquiry
				authorId={article.author.id}
				id={article.id}
				chat={article.context.chat}
				mine={isMine}
			/>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.id}`;
	let response = await fetch(`${URL}`);
	let result = await response.json();

	if (!result.status)
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
