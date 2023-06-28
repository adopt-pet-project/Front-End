import {Dispatch, SetStateAction} from 'react';
import styles from '@/styles/components/imageUploader.module.scss';
import useImageUpload from '@/utils/hooks/useImageUpload';

export default function ImageUploader({
	serverImageList,
	setServerImageList,
}: {
	serverImageList: MyFile[];
	setServerImageList: Dispatch<SetStateAction<MyFile[]>>;
}) {
	const [localImageList, deleteImage, changeImageInput] = useImageUpload(
		serverImageList,
		setServerImageList,
	);

	return (
		<>
			<div className={styles.imageContainer}>
				<label className={styles.imageButton} htmlFor="articleImage">
					<img src="/icon/picture.svg" alt="add image icon" />
					<span>{localImageList.current.length} / 8</span>
				</label>
				{localImageList.current.map((myFile: MyFile) => {
					return (
						<div
							key={`${myFile.localSrc}  ${myFile.imageId}`}
							className={styles.previewContainer}
						>
							<img
								onClick={() => {
									deleteImage(myFile.localFile?.name, myFile.imageId);
								}}
								className={styles.preview}
								src={myFile.localSrc || myFile.serverSrc}
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
