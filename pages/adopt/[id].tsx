import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useState} from 'react';
import Layout from '@/components/layout/layout';
import Carousel from '@/components/adopt/carousel';
import Header from '@/components/adopt/header';
import Metadata from '@/components/adopt/metadata';
import Context from '@/components/adopt/context';
import Author from '@/components/adopt/author';
import Position from '@/components/adopt/coords';
import Inquiry from '@/components/adopt/inquiry';
import {toDate} from '@/utils/functions/toDate';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '@/styles/pages/adopt/view.module.scss';

export default function View({
	article,
	id,
}: {
	article: AdoptDetail;
	id: number;
}) {
	const [isMine, setIsMine] = useState<boolean>(false);
	const router = useRouter();
	const refresh = useRefreshToken();

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
				await refresh();
				router.reload();
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
				<Link className={styles.return} href={'/adopt'}>
					돌아가기
				</Link>
			</div>
			<Inquiry
				status={article.header.status}
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
		result.header.publishedAt = toDate(result.header.publishedAt + 32400000);

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
