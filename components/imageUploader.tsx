import {
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from '@/styles/components/imageUploader.module.scss';
import {useRouter} from 'next/router';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';

export default function ImageUploader({
	serverImageList,
	setServerImageList,
}: {
	serverImageList: MyFile[];
	setServerImageList: Dispatch<SetStateAction<MyFile[]>>;
}) {
	const router = useRouter();
	const [localImageUploadState, setLocalImageUploadState] = useState<boolean[]>(
		[],
	);
	const localImageList = useRef<MyFile[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	let type: string;

	useDepsOnlyEffect(() => {
		if (router.asPath.includes('adopt')) type = 'adopt';
		else if (router.asPath.includes('board')) type = 'community';
		else if (router.asPath.includes('register')) type = 'profile';
	}, [router.isReady]);

	useEffect(() => {
		// Modify 시 serverImageList 를 LocalImageList로 불러와 사용
		if (serverImageList.length !== 0) {
			localImageList.current = serverImageList;
		}
	}, []);

	function changeImageInput(e: BaseSyntheticEvent) {
		let prevLength = localImageList.current.length;
		let fileList: File[] = [
			...localImageList.current.map((myFile: MyFile) => myFile.localFile),
			...e.currentTarget.files,
		];
		e.currentTarget.value = '';

		if (fileList.length > 8) {
			alert('최대 8개까지만 선택이 가능합니다.');
		}

		fileList = fileList
			.filter((file: File) => {
				const regExp = /(.*?)\.(jpg|jpeg|png|bmp|gif)$/;
				return file.name.match(regExp) != null;
			})
			.filter((file: File, index: number) => index < 8);

		const newLocalImageList: MyFile[] = [...localImageList.current];
		for (let i = prevLength; i < fileList.length; i++) {
			newLocalImageList.push({
				localFile: fileList[i],
				isUploaded: false,
				src: URL.createObjectURL(fileList[i]),
			});
		}
		localImageList.current = newLocalImageList;
		updateState();

		newLocalImageList.map((myFile: MyFile, index: number) => {
			if (index >= prevLength) {
				uploadImage(myFile, index);
			}
		});
	}

	function deleteImage(index: number) {
		localImageList.current = [
			...localImageList.current.slice(0, index),
			...localImageList.current.slice(index + 1, localImageList.current.length),
		];
		setLocalImageUploadState([
			...localImageUploadState.slice(0, index),
			...localImageUploadState.slice(index + 1, localImageUploadState.length),
		]);
		setServerImageList([
			...serverImageList.slice(0, index),
			...serverImageList.slice(index + 1, serverImageList.length),
		]);
	}

	async function uploadImage(myFile: MyFile, index: number) {
		try {
			let formData = new FormData();
			if (!myFile.localFile) {
				throw new Error('Missing files');
			}
			formData.append('imageFile', myFile.localFile);
			formData.append('type', type);

			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/API/Image`,
				{
					method: 'POST',
					headers: {
						Authorization: 'testToken',
						'Content-Type': 'multipart/form-data',
					},
					body: formData,
				},
			);

			let result: ImageUploadResponse = await response.json();
			myFile.isUploaded = true;
			myFile.imageId = result.imageNo;
			// myFile.src = result.imageUrl;
		} catch (e) {
			alert(e);
			deleteImage(index);
		} finally {
			updateState();
		}
	}

	function updateState() {
		setLocalImageUploadState(
			localImageList.current.map((myFile: MyFile) => {
				return myFile.isUploaded;
			}),
		);
		setServerImageList(localImageList.current);
	}

	return (
		<form>
			<div className={styles.imageContainer}>
				<label className={styles.imageButton} htmlFor="articleImage">
					<img src="/icon/picture.svg" alt="add image icon" />
					<span>{localImageList.current.length} / 8</span>
				</label>
				{localImageList.current.map((myFile: MyFile, index: number) => {
					return (
						<div key={myFile.src} className={styles.previewContainer}>
							<img
								onClick={() => {
									deleteImage(index);
								}}
								className={styles.preview}
								src={myFile.src}
							/>
							{!myFile.isUploaded && (
								<div className={styles.loading}>업로드 중</div>
							)}
						</div>
					);
				})}
			</div>
			<input
				ref={inputRef}
				onChange={changeImageInput}
				multiple={true}
				className={styles.imageInput}
				type="file"
				accept="image/*"
				name="image"
				id="articleImage"
			/>
		</form>
	);
}
