import {
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from '@/styles/components/imageUploader.module.scss';
import {useRouter} from 'next/router';

export default function ImageUploader({
	serverImageList,
	setServerImageList,
}: {
	serverImageList: MyFile[];
	setServerImageList: Dispatch<SetStateAction<MyFile[]>>;
}) {
	const router = useRouter();
	const [, setLocalImageUploadState] = useState<boolean[]>([]);
	const localImageList = useRef<MyFile[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const type = useRef<string>('profile');

	useEffect(() => {
		// Modify 시 serverImageList 를 LocalImageList로 불러와 사용
		if (serverImageList.length !== 0) {
			localImageList.current = serverImageList;
		}

		if (router.asPath.includes('adopt')) type.current = 'adopt';
		else if (router.asPath.includes('board')) type.current = 'community';
	}, []);

	async function changeImageInput(e: BaseSyntheticEvent) {
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
				localSrc: URL.createObjectURL(fileList[i]),
			});
		}
		localImageList.current = newLocalImageList;
		updateState();

		for (let i = prevLength; i < newLocalImageList.length; i++) {
			await uploadImage(newLocalImageList[i]);
		}
	}

	function deleteImage(fileName: string | undefined) {
		if (!fileName) return;
		localImageList.current = localImageList.current.filter((myFile: MyFile) => {
			if (myFile.localFile?.name == fileName) {
				window.URL.revokeObjectURL(myFile.localSrc as string);
			}
			return myFile.localFile?.name != fileName;
		});

		setLocalImageUploadState(
			localImageList.current.map((myFile: MyFile) => {
				return myFile.isUploaded;
			}),
		);
		setServerImageList(localImageList.current);
	}

	async function uploadImage(myFile: MyFile) {
		try {
			let formData = new FormData();
			if (!myFile.localFile) {
				throw new Error('Missing files');
			}
			formData.append('file', myFile.localFile);
			formData.append('type', type.current);
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/image`,
				{
					method: 'POST',
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					body: formData,
				},
			);

			let result = await response.json();
			if (result.status === 200) {
				myFile.isUploaded = true;
				myFile.imageId = result.data.id;
				myFile.serverSrc = result.data.url;
			} else {
				throw new Error('이미지 업로드 실패');
			}
		} catch (e) {
			alert(e);
			deleteImage(myFile.localFile?.name);
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
		<>
			<div className={styles.imageContainer}>
				<label className={styles.imageButton} htmlFor="articleImage">
					<img src="/icon/picture.svg" alt="add image icon" />
					<span>{localImageList.current.length} / 8</span>
				</label>
				{localImageList.current.map((myFile: MyFile, index: number) => {
					return (
						<div key={myFile.localSrc} className={styles.previewContainer}>
							<img
								onClick={() => {
									deleteImage(myFile.localFile?.name);
								}}
								className={styles.preview}
								src={myFile.localSrc}
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
		</>
	);
}
