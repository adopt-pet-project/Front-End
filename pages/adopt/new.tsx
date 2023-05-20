import {BaseSyntheticEvent, ReactElement, useState} from 'react';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import styles from '@/styles/pages/adopt/new.module.scss';
import {GetServerSideProps} from 'next';
import AnimalInput from '@/components/adopt/animalInput';
import CoordsInput from '@/components/adopt/coordsInput';

export default function New({query}: {query: {type: string}}) {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);

	function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		// 게시글 작성 로직
		console.log(e.target.title.value);
		console.log(e.target.context.value);
		console.log(serverImageList);
	}

	return (
		<section className="body" style={{zIndex: '101'}}>
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<Header type="분양글" />
				<ImageUploader
					serverImageList={serverImageList}
					setServerImageList={setServerImageList}
				/>
				<AnimalInput />
				<CoordsInput />
				<span className={styles.contextTitle}>글 작성</span>
				<input
					className={styles.title}
					type="text"
					name="title"
					placeholder="제목"
				/>
				<textarea
					name="context"
					className={styles.context}
					placeholder="본문을 입력하세요."
				/>
			</form>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	return {
		props: {query},
	};
};

New.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
