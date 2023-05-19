import styles from '@/styles/components/register/setProfile.module.scss';
import {
	BaseSyntheticEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

export default function setProfile({
	userInfo,
	setIsReady,
}: {
	userInfo: MutableRefObject<Register>;
	setIsReady: Dispatch<SetStateAction<boolean>>;
}) {
	const [profileImage, setProfileImage] = useState<MyFile>();

	useEffect(() => {
		setIsReady(true);
	}, []);

	function changeImageInput(e: BaseSyntheticEvent) {
		const newProfileImage: MyFile = {
			localFile: e.currentTarget.files[0],
			localSrc: URL.createObjectURL(e.currentTarget.files[0]),
			isUploaded: false,
		};
		setProfileImage(newProfileImage);

		// 이미지 업로드 로직
		setTimeout(() => {
			setProfileImage({...newProfileImage, isUploaded: true});
		}, 50000);
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '32px',
					animation: '1s ease-in-out fadeIn',
				}}
			>
				<span className={styles.label}>프로필 사진을 설정해요.</span>
				<span className={styles.label}>꼭 설정할 필요는 없어요.</span>
			</div>
			<div className={styles.inputContainer} style={{justifyContent: 'center'}}>
				<label className={styles.profile} htmlFor="profile">
					{profileImage && !profileImage.isUploaded && (
						<div className={styles.loading}>업로드 중</div>
					)}
					{profileImage && (
						<img
							className={styles.profile}
							src={profileImage.localSrc}
							alt="profile"
						/>
					)}
				</label>
				<input
					onChange={changeImageInput}
					style={{display: 'none'}}
					type="file"
					accept="image/*"
					id="profile"
				/>
			</div>
		</>
	);
}
