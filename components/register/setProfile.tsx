import {
	BaseSyntheticEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import styles from '@/styles/components/register/setProfile.module.scss';

export default function setProfile({
	email,
	userInfo,
	setIsReady,
}: {
	email: string;
	userInfo: MutableRefObject<Register>;
	setIsReady: Dispatch<SetStateAction<boolean>>;
}) {
	const [profileImage, setProfileImage] = useState<MyFile>();

	useEffect(() => {
		setIsReady(true);
	}, []);

	function changeImageInput(e: BaseSyntheticEvent) {
		setIsReady(false);

		const newProfileImage: MyFile = {
			localFile: e.currentTarget.files[0],
			localSrc: URL.createObjectURL(e.currentTarget.files[0]),
			isUploaded: false,
		};
		setProfileImage(newProfileImage);

		// 이미지 업로드 로직
		uploadImage(newProfileImage);
	}

	async function uploadImage(myFile: MyFile) {
		try {
			let formData = new FormData();
			if (!myFile.localFile) {
				throw new Error('Missing files');
			}
			formData.append('file', myFile.localFile);
			formData.append('type', 'profile');
			formData.append('email', email);
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/image`,
				{
					method: 'POST',
					body: formData,
				},
			);

			let result = await response.json();
			if (result.status === 200) {
				myFile.isUploaded = true;
				myFile.imageId = result.data.id;
				myFile.serverSrc = result.data.url;
				setProfileImage({...myFile, isUploaded: true});
				userInfo.current = {
					...userInfo.current,
					imgNo: result.data.id,
					imgUrl: result.data.url,
				};
				setIsReady(true);
			} else {
				throw new Error('이미지 업로드 실패');
			}
		} catch (e) {
			alert(e);
			setProfileImage(undefined);
		}
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
