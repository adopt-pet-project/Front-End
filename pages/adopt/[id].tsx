import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import Carousel from '@/components/adopt/carousel';
import Header from '@/components/adopt/header';
import Metadata from '@/components/adopt/metadata';
import Context from '@/components/adopt/context';
import Author from '@/components/adopt/author';
import Position from '@/components/adopt/coords';
import styles from '@/styles/pages/adopt/view.module.scss';

export default function View({article}: {article: AdoptDetail}) {
	console.log(article);
	return (
		<section className="body">
			<div>
				{article.imageList.length !== 0 && (
					<Carousel imageList={article.imageList} />
				)}
				<Header header={article.header} />
				<Author author={article.author} />
				<Metadata metadata={article.metadata} />
				<Context context={article.context} />
				<Position coords={article.coords} />
			</div>
			<div className={styles.inquiry}>
				<button>관심목록에 추가</button>
				<button>문의하기</button>
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.id}`;
	let response = await fetch(`${URL}`);
	let result = await response.json();
	// return result.status
	// 	? {
	// 			redirect: {
	// 				permanent: false,
	// 				destination: '/404',
	// 			},
	// 	  }
	// 	: {
	// 			props: {
	// 				article: result,
	// 			},
	// 	  };
	return {
		props: {
			article: result,
		},
	};
};

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
