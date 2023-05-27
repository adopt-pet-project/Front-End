import {
	BaseSyntheticEvent,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import Layout from '@/components/layout/layout';
import ImageUploader from '@/components/imageUploader';
import AnimalInput from '@/components/adopt/animalInput';
import CoordsInput from '@/components/adopt/coordsInput';
import Header from '@/components/new/modifyHeader';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';
import styles from '@/styles/pages/adopt/new.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

export default function Modify({query}: {query: {id: string}}) {
	const [serverImageList, setServerImageList] = useState<MyFile[]>([]);
	const [coords, setCoords] = useState<AdoptCoords>();
	const formRef = useRef<HTMLFormElement>(null);
	const type = useRef<string>('');
	const router = useRouter();
	const refresh = useRefreshToken();

	useEffect(() => {
		if (!window.localStorage.getItem('accessToken')) {
			router.back();
		}
	});

	useEffect(() => {
		async function setInputValue() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${
				query.id as string
			}`;
			let response = await fetch(`${URL}`, {
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
			});
			let result: AdoptDetail = await response.json();

			if (!result.mine) {
				alert('잘못된 접근입니다.');
				router.back();
			}
			if (formRef.current) {
				(formRef.current.title as any).value = result.header.title;
				(formRef.current.context as any).value = result.context.context;
				(formRef.current.name as any).value = result.metadata.name;
				(formRef.current.gender as any).value = result.metadata.gender;
				(formRef.current.age as any).value = result.metadata.age;
				(formRef.current.species as any).value = result.metadata.species;

				setServerImageList([
					...result.imageList.map((image: ImageUploadResponse2) => {
						return {
							isUploaded: true,
							serverSrc: image.imgUrl,
							imageId: image.imgNo,
						};
					}),
				]);

				setCoords({
					latitude: result.coords.latitude,
					longitude: result.coords.longitude,
					address: result.coords.address,
				});
			}
		}

		setInputValue();
	}, []);

	async function onSubmit(e: BaseSyntheticEvent) {
		e.preventDefault();
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
			kind: type.current || '강아지',
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
		}

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/${query.id as string}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
				method: 'PATCH',
				body: JSON.stringify(body),
			},
		);
		let result = await response.json();

		if (result.status === 200) {
			router.push(`/adopt/${router.query.id}`);
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도해 주세요.');
		} else {
			alert(result.error);
			router.push('/adopt');
		}
	}

	return (
		<section className="body" style={{zIndex: '101'}}>
			<form
				className={styles.form}
				ref={formRef}
				onSubmit={onSubmit}
				method="POST"
			>
				<Header type="분양글" />
				<ImageUploader
					serverImageList={serverImageList}
					setServerImageList={setServerImageList}
				/>
				<AnimalInput />
				{coords && <CoordsInput coords={coords} />}
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
