import {
	BaseSyntheticEvent,
	ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import Layout from '@/components/layout/layout';
import Script from 'next/script';
import styles from '@/styles/pages/register.module.scss';
import {useRouter} from 'next/router';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';
import useRegister from '@/utils/hooks/useRegister';

export default function Register() {
	const setRegister = useRegister();
	const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
	const [isAddressSetted, setIsAddressSetted] = useState<boolean>(false);
	const [profileImage, setProfileImage] = useState<MyFile>();
	const addressRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();

	useEffect(() => {
		const reset = () => {
			setRegister();
		};

		window.addEventListener('beforeunload', reset);
		return () => {
			window.removeEventListener('beforeunload', reset);
		};
	}, []);

	useDepsOnlyEffect(() => {
		if (!router.query.email && !router.query.provider) {
			alert('잘못된 접근입니다.');
			router.back();
		}
	}, [router.isReady]);

	async function registerRequest(e: any) {
		if (!formRef.current) return;
		e.preventDefault();

		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: router.query.email,
				address: formRef.current.address.value,
				router: router.query.provider,
				username: formRef.current.username.value,
			}),
		});
	}

	function changeImageInput(e: BaseSyntheticEvent) {
		const newProfileImage = {
			localFile: e.currentTarget.files[0],
			src: URL.createObjectURL(e.currentTarget.files[0]),
			isUploaded: false,
		};
		setProfileImage(newProfileImage);

		// 이미지 업로드 로직
		setTimeout(() => {
			setProfileImage({...newProfileImage, isUploaded: true});
		}, 50000);
	}

	const getAddress = useCallback(() => {
		navigator.geolocation.getCurrentPosition(position => {
			let {latitude, longitude} = position.coords;
			const geocoder = new window.kakao.maps.services.Geocoder();
			const coord = new window.kakao.maps.LatLng(latitude, longitude);
			geocoder.coord2RegionCode(
				coord.getLng(),
				coord.getLat(),
				(result: any, status: any) => {
					if (
						status === window.kakao.maps.services.Status.OK &&
						addressRef.current
					) {
						addressRef.current.value = result[0].address_name
							.split(' ')
							.slice(0, 2)
							.join(' ');
					}
				},
			);
			setIsAddressSetted(true);
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
					<form
						className={styles.form}
						ref={formRef}
						onSubmit={registerRequest}
					>
						<div style={{flexGrow: '1'}}>
							<span className={styles.label}>*닉네임을 설정해요.</span>
							<div className={styles.inputContainer}>
								<input
									className={`${styles.input} ${
										isUsernameValid ? styles.valid : ''
									}`}
									type="text"
									name="username"
									placeholder="닉네임을 입력해 주세요."
									onChange={() => setIsUsernameValid(false)}
								/>
								{!isUsernameValid && (
									<button onClick={validateUsername} className={styles.button}>
										중복확인
									</button>
								)}
							</div>
							<span className={styles.label}>*내 지역을 설정해요.</span>
							<div className={styles.inputContainer}>
								<input
									ref={addressRef}
									className={`${styles.input} ${
										isAddressSetted ? styles.valid : ''
									}`}
									name="address"
									type="text"
									disabled
									placeholder="위치권한을 허용 해 주세요."
								/>
								{!isAddressSetted && (
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
									{profileImage && !profileImage.isUploaded && (
										<div className={styles.loading}>업로드 중</div>
									)}
									{profileImage && (
										<img
											className={styles.profile}
											src={profileImage.src}
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
						</div>
						{isUsernameValid && isAddressSetted && (
							<button type="submit" className={styles.registerButton}>
								회원가입
							</button>
						)}
					</form>
				</div>
			</section>
		</>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
