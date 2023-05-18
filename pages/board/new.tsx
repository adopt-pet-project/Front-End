import {BaseSyntheticEvent, ReactElement, useState} from 'react';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import styles from '@/styles/pages/board/new.module.scss';

export default function New() {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);

	function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		// 게시글 작성 로직
		console.log(e.target.title.value);
		console.log(e.target.context.value);
		console.log(serverImageList);
	}

	return (
		<section className="body">
			<Header type="게시글" />
			<ImageUploader
				serverImageList={serverImageList}
				setServerImageList={setServerImageList}
			/>
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<input
					className={styles.title}
					type="text"
					name="title"
					placeholder="제목을 입력하세요."
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

New.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
