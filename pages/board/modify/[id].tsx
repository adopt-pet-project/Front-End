import {
	BaseSyntheticEvent,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import {useRouter} from 'next/router';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import Header from '@/components/new/modifyHeader';
import {GetServerSideProps} from 'next';
import styles from '@/styles/pages/board/new.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function Modify({query}: {query: {id: string}}) {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const refresh = useRefreshToken();

	useEffect(() => {
		if (!window.localStorage.getItem('accessToken')) {
			router.back();
		}
	});

	useEffect(() => {
		async function setInputValue() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/community/article/${
				query.id as string
			}`;
			let response = await fetch(`${URL}`, {
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
			});
			let result = await response.json();
			if (!result.mine) {
				alert('잘못된 접근입니다.');
				router.back();
			}
			if (formRef.current) {
				(formRef.current.title as any).value = result.header.title;
				(formRef.current.context as any).value = result.context.context;
				setServerImageList([
					...result.context.imageList.map((image: ImageUploadResponse1) => {
						return {
							isUploaded: true,
							serverSrc: image.imageUrl,
							imageId: image.imageNo,
						};
					}),
				]);
			}
		}
		setInputValue();
	}, []);

	async function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/article/${
				query.id as string
			}`,
			{
				method: 'PATCH',
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
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도해 주세요.');
		} else {
			alert(`error code : ${result.status}`);
			router.push('/board');
		}
	}

	return (
		<section className="body" style={{zIndex: '101'}}>
			<form className={styles.form} ref={formRef} onSubmit={onSubmit}>
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

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	return {
		props: {
			query,
		},
	};
};

Modify.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
