import {
	BaseSyntheticEvent,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import styles from '@/styles/pages/board/new.module.scss';
import {useRouter} from 'next/router';

export default function New() {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (!window.localStorage.getItem('accessToken')) {
			router.back();
		}
	});

	async function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/article`,
			{
				method: 'POST',
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify({
					categoryId: 1,
					title: e.target.title.value,
					context: e.target.context.value,
					imageList: [
						...serverImageList.map((myFile: MyFile) => {
							return {
								id: myFile.imageId,
								url: myFile.serverSrc,
							};
						}),
					],
				}),
			},
		);

		let result = await response.json();
		if (result.status === 200) {
			router.push('/board');
		} else {
			alert(result.error);
			router.push('/board');
		}
	}

	return (
		<section className="body" style={{zIndex: '101'}}>
			<form className={styles.form} onSubmit={onSubmit}>
				<Header type="게시글" />
				<ImageUploader
					serverImageList={serverImageList}
					setServerImageList={setServerImageList}
				/>
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

New.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
