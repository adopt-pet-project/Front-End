import Header from '@/components/board/new/header';
import Layout from '@/components/layout/layout';
import {BaseSyntheticEvent, ReactElement, useState} from 'react';
import styles from '@/styles/pages/board/new.module.scss';

export default function New() {
	const [currentImages, setCurrentImages] = useState<File[]>([]);

	function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		// 게시글 작성 로직
		console.log(e.target.title.value);
		console.log(e.target.context.value);
		console.log(currentImages);
	}

	function changeImageInput(e: BaseSyntheticEvent) {
		let files: File[] = [...currentImages, ...e.currentTarget.files];

		if (files.length > 8) {
			alert('이미지는 최대 8개까지 업로드가 가능합니다.');
			files = files.slice(0, 8);
		}

		setCurrentImages(files);
	}

	function deleteImage(index: number) {
		setCurrentImages([
			...currentImages.slice(0, index),
			...currentImages.slice(index + 1, currentImages.length),
		]);
	}

	return (
		<section className="body">
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<Header />
				<div className={styles.imageContainer}>
					<label className={styles.imageButton} htmlFor="articleImage">
						<img src="/icon/picture.svg" alt="add image icon" />
						<span>{currentImages.length} / 8</span>
					</label>
					{currentImages.map((image: File, index: number) => {
						let src = URL.createObjectURL(image);
						return (
							<img
								key={image.name}
								onClick={() => {
									deleteImage(index);
								}}
								className={styles.preview}
								src={src}
							/>
						);
					})}
				</div>
				<input
					onChange={changeImageInput}
					multiple={true}
					className={styles.imageInput}
					type="file"
					accept="image/*"
					name="image"
					id="articleImage"
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
