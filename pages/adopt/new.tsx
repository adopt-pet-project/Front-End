import {BaseSyntheticEvent, ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {GetServerSideProps} from 'next';
import Header from '@/components/new/header';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import AnimalInput from '@/components/adopt/animalInput';
import CoordsInput from '@/components/adopt/coordsInput';
import styles from '@/styles/pages/adopt/new.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function New({query}: {query: {type: string}}) {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);
	const [preventClick, setPreventClick] = useState<boolean>(false);
	const router = useRouter();
	const refresh = useRefreshToken();

	useEffect(() => {
		if (!window.localStorage.getItem('accessToken')) {
			router.back();
		}

		if (!router.query.type) {
			alert('잘못된 접근입니다.');
			router.back();
		}
	});

	async function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();

		const type = router.query.type as string;

		const empty: string[] = [];

		const keyBind = {
			title: '제목',
			content: '본문',
			kind: '대분류',
			name: '동물 이름',
			gender: '동물 성별',
			age: '동물 나이',
			species: '동물 품종',
			latitude: '위도',
			longitude: '경도',
			address: '주소',
			image: '동물 사진',
		};

		const body = {
			title: e.target.title.value,
			content: e.target.context.value,
			kind: type,
			name: e.target.name.value,
			gender: e.target.gender.value,
			age: e.target.age.value,
			species: e.target.species.value,
			latitude: Number(e.target.latitude.value),
			longitude: Number(e.target.longitude.value),
			address: e.target.address.value,
			image: [
				...serverImageList.map((myFile: MyFile) => {
					return {imgNo: myFile.imageId, imgUrl: myFile.serverSrc};
				}),
			],
		};

		Object.keys(body).forEach((key: string) => {
			const bodyKey = key as AdoptPostBodyKey;
			if (!body[bodyKey]) empty.push(keyBind[bodyKey]);
		});

		if (empty.length !== 0) {
			alert(`다음 항목이 입력되지 않음\n${empty.join(', ')}`);
			return;
		}

		setPreventClick(true);

		let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('accessToken') as string,
			},
			method: 'POST',
			body: JSON.stringify(body),
		});
		let result = await response.json();
		if (result.status === 200) {
			router.push('/adopt');
		} else if (result.status === 401) {
			await refresh();
			alert('다시 시도해 주세요.');
			router.reload();
			setPreventClick(false);
		} else {
			alert(`Server Error : ${result.status}`);
			router.push('/adopt');
		}
	}

	return (
		<section className="body" style={{zIndex: '101'}}>
			<form className={styles.form} onSubmit={onSubmit} method="POST">
				<Header preventClick={preventClick} type="분양글" />
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
