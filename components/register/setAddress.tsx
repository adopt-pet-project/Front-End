import Script from 'next/script';
import styles from '@/styles/components/register/setAddress.module.scss';
import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useCallback,
	useRef,
	useState,
} from 'react';

export default function SetAddress({
	userInfo,
	setIsReady,
}: {
	userInfo: MutableRefObject<Register>;
	setIsReady: Dispatch<SetStateAction<boolean>>;
}) {
	const [isAddressSetted, setIsAddressSetted] = useState<boolean>(false);
	const addressRef = useRef<HTMLInputElement>(null);

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
					userInfo.current.address = addressRef.current?.value as string;
				},
			);
			setIsAddressSetted(true);
			setIsReady(true);
		});
	}, []);

	return (
		<>
			<Script
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '64px',
					animation: '1s ease-in-out fadeIn',
				}}
			>
				<span className={styles.label}>활동 지역을 설정해요.</span>
				<span className={styles.label}>위치 권한을 허용 해 주세요.</span>
			</div>
			<div className={styles.inputContainer}>
				<input
					ref={addressRef}
					className={`${styles.input} ${isAddressSetted ? styles.valid : ''}`}
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
						현 위치로 설정
					</button>
				)}
			</div>
		</>
	);
}
