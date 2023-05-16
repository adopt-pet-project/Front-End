import {
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import styles from '@/styles/components/imageUploader.module.scss';

export default function ImageUploader({
	serverImageList,
	setServerImageList,
}: {
	serverImageList: (string | null)[];
	setServerImageList: Dispatch<SetStateAction<(string | null)[]>>;
}) {
	const localImageList = useRef<MyFile[]>([]);
	const [localImageUploadState, setLocalImageUploadState] = useState<boolean[]>(
		[],
	);

	function changeImageInput(e: BaseSyntheticEvent) {
		let prevLength = localImageList.current.length;
		let fileList: File[] = [
			...localImageList.current,
			...e.currentTarget.files,
		];

		if (fileList.length > 8) {
			alert('이미지는 최대 8개까지 업로드가 가능합니다.');
			fileList = fileList.slice(0, 8);
		}

		const newLocalImageList: MyFile[] = [...localImageList.current];
		for (let i = prevLength; i < fileList.length; i++) {
			newLocalImageList.push({
				localFile: fileList[i],
				isUploaded: false,
				imageId: null,
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
		function Delay(delay: number) {
			return new Promise(function (resolve) {
				setTimeout(resolve, delay);
			});
		}
		let res: any = await Delay(10000); // 서버 응답 대기

		if (true) {
			myFile.isUploaded = true;
			myFile.imageId = 'response from server';
			updateState();
		} else {
			alert(`${myFile.localFile.name} 업로드 실패\n사유 : 어쩌고저쩌고`);
			deleteImage(index);
		}
	}

	function updateState() {
		setLocalImageUploadState(
			localImageList.current.map((myFile: MyFile) => {
				return myFile.isUploaded;
			}),
		);
		setServerImageList(
			localImageList.current.map((myFile: MyFile) => {
				return myFile.imageId;
			}),
		);
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
