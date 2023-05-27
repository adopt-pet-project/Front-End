import {
	BaseSyntheticEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import {CompatClient, IMessage} from '@stomp/stompjs';
import {useRouter} from 'next/router';
import Script from 'next/script';
import styles from '@/styles/components/chat/chatInput.module.scss';

export default function ChatInput({
	client,
	id,
}: {
	client: MutableRefObject<CompatClient | undefined>;
	id: number;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	let map: any;
	let marker: any;

	useEffect(() => {
		if (window.kakao) window.kakao.maps.load(loadMap);
	});

	function onClickMenu() {
		if (!isMenuOpen) {
			if (inputRef.current) inputRef.current.blur();
			setIsMenuOpen(true);
		} else {
			inputRef.current!.value = '';
			setIsMapOpen(false);
			setIsMenuOpen(false);
		}
	}

	function onFocusInput(e: BaseSyntheticEvent) {
		setIsMenuOpen(false);
	}

	function onClickSend() {
		if (
			inputRef.current &&
			inputRef.current.value &&
			client.current &&
			client.current
		) {
			try {
				client.current.send(
					'/publish/message',
					{Authorization: window.localStorage.getItem('accessToken')},
					JSON.stringify({
						chatNo: id,
						contentType: 'text',
						content: inputRef.current.value,
					}),
				);
			} catch (e) {
				alert(e);
				router.push(router.asPath);
			} finally {
				setIsMapOpen(false);
				setIsMenuOpen(false);
				inputRef.current!.value = '';
			}
		}
	}

	function changeImageInput(e: BaseSyntheticEvent) {
		const regExp = /(.*?)\.(jpg|jpeg|png|bmp|gif)$/;
		const file: File = e.currentTarget.files[0];

		if (file.name.match(regExp)) {
			// set inputRef value to BASE64 Encoding Image
			onClickSend();
			setIsMenuOpen(false);
		} else {
			alert(`허용되지 않은 확장자입니다.\n${file.name.split('.')[1]}`);
		}
	}

	function loadMap() {
		const mapOption = {
			center: new window.kakao.maps.LatLng(37.55467, 126.970609),
			level: 6,
		};

		map = new window.kakao.maps.Map(mapRef.current, mapOption);
		marker = new window.kakao.maps.Marker({
			position: map.getCenter(),
		});
		marker.setMap(map);

		window.kakao.maps.event.addListener(
			map,
			'click',
			function (mouseEvent: any) {
				let latlng = mouseEvent.latLng;
				map.setCenter(latlng);
				marker.setPosition(latlng);
				inputRef.current!.value = `${latlng.Ma} ${latlng.La}`;
			},
		);
	}

	return (
		<>
			<Script
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
			/>
			<form className={styles.container}>
				<div className={styles.chatInput}>
					<img
						style={{
							transform: `${isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)'}`,
						}}
						src="/icon/plus.svg"
						width={22}
						height={22}
						alt="menu"
						onClick={onClickMenu}
					/>
					<input
						className={`${isMenuOpen ? styles.hidden : ''}`}
						type="text"
						placeholder="메시지를 입력하세요."
						ref={inputRef}
						onFocus={onFocusInput}
					/>
					<img
						src="/icon/send.svg"
						width={24}
						height={24}
						alt="send"
						onClick={onClickSend}
					/>
				</div>
				<div
					className={`${styles.map} ${isMapOpen ? '' : styles.hidden}`}
					ref={mapRef}
				/>
				{isMenuOpen && (
					<ul className={styles.menu}>
						<li>
							<label htmlFor="image">
								<div className={styles.icon}>
									<img
										src="/icon/picture.svg"
										alt="picture"
										width={28}
										height={28}
									/>
								</div>
								사진
							</label>
							<input
								onChange={changeImageInput}
								type="file"
								name="image"
								accept="image/*"
								id="image"
							/>
						</li>
						<li onClick={() => setIsMapOpen(true)}>
							<div className={styles.icon}>
								<img
									src="/icon/location.svg"
									alt="location"
									width={24}
									height={24}
								/>
							</div>
							위치
						</li>
					</ul>
				)}
			</form>
		</>
	);
}
