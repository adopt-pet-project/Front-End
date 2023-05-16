import {BaseSyntheticEvent, ReactElement, useState} from 'react';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import styles from '@/styles/pages/board/new.module.scss';
import ImageUploader from '@/components/imageUploader';

export default function New() {
	const [serverImageList, setServerImageList] = useState<(string | null)[]>([]);

	function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		// 게시글 작성 로직
		console.log(e.target.title.value);
		console.log(e.target.context.value);
		console.log(serverImageList);
	}

	return (
		<section className="body">
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<Header />
				<ImageUploader
					serverImageList={serverImageList}
					setServerImageList={setServerImageList}
				/>
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
