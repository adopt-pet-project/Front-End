import {
	BaseSyntheticEvent,
	ReactElement,
	useCallback,
	useRef,
	useState,
} from 'react';
import Layout from '@/components/layout/layout';
import Script from 'next/script';
import styles from '@/styles/pages/register.module.scss';

declare global {
	interface Window {
		kakao: any;
	}
}

export default function Register() {
	const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
	const [isLocationSetted, setIsLocationSetted] = useState<boolean>(false);
	const [profileImage, setProfileImage] = useState<File>();
	const locationRef = useRef<HTMLInputElement>(null);

	function changeImageInput(e: BaseSyntheticEvent) {
		setProfileImage(e.currentTarget.files[0]);
	}

	const getAddress = useCallback(() => {
		navigator.geolocation.getCurrentPosition(position => {
			let {latitude, longitude} = position.coords;
			const geocoder = new window.kakao.maps.services.Geocoder();
			const coord = new window.kakao.maps.LatLng(latitude, longitude);
			console.log(latitude, longitude);
			geocoder.coord2RegionCode(
				coord.getLng(),
				coord.getLat(),
				(result: any, status: any) => {
					if (
						status === window.kakao.maps.services.Status.OK &&
						locationRef.current
					) {
						locationRef.current.value = result[0].address_name
							.split(' ')
							.slice(0, 2)
							.join(' ');
					}
				},
			);
			setIsLocationSetted(true);
		});
	}, []);

	const validateUsername = useCallback((e: BaseSyntheticEvent) => {
		e.preventDefault();
		// 닉네임 중복 검증 로직
		setIsUsernameValid(true);
	}, []);

	return (
		<>
			<Script
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
			/>
			<h1 className={styles.title}>회원가입</h1>
			<section className="body">
				<div className={styles.container}>
					<form className={styles.form}>
						<span className={styles.label}>*닉네임을 설정해요.</span>
						<div className={styles.inputContainer}>
							<input
								className={`${styles.input} ${
									isUsernameValid ? styles.valid : ''
								}`}
								type="text"
								placeholder="닉네임을 입력해 주세요."
								onChange={() => setIsUsernameValid(false)}
							/>
							{!isUsernameValid && (
								<button onClick={validateUsername} className={styles.button}>
									중복확인
								</button>
							)}
						</div>
						<span className={styles.label}>*활동 지역을 설정해요.</span>
						<div className={styles.inputContainer}>
							<input
								ref={locationRef}
								className={`${styles.input} ${
									isLocationSetted ? styles.valid : ''
								}`}
								type="text"
								disabled
								placeholder="위치권한을 허용 해 주세요."
							/>
							{!isLocationSetted && (
								<button
									onClick={e => {
										e.preventDefault();
										window.kakao.maps.load(getAddress);
									}}
									className={styles.button}
								>
									위치설정
								</button>
							)}
						</div>
						<span className={styles.label}>프로필 사진을 설정해요.</span>
						<div
							className={styles.inputContainer}
							style={{justifyContent: 'center'}}
						>
							<label className={styles.profile} htmlFor="profile">
								{profileImage && (
									<img
										className={styles.profile}
										src={URL.createObjectURL(profileImage)}
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
					</form>
					{isUsernameValid && isLocationSetted && (
						<button className={styles.registerButton}>회원가입</button>
					)}
				</div>
			</section>
		</>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
