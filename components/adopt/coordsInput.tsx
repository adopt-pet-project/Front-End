import {BaseSyntheticEvent, useEffect, useRef} from 'react';
import Script from 'next/script';
import styles from '@/styles/components/adopt/coordsInput.module.scss';

export default function CoordsInput() {
	const mapRef = useRef<HTMLDivElement>(null);
	const latitudeRef = useRef<HTMLInputElement>(null);
	const longitudeRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);

	let map: any;
	let marker: any;

	useEffect(() => {
		if (window.kakao) {
			window.kakao.maps.load(loadMap);
		}
	});

	function setPosition(latLng: any) {
		map.setCenter(latLng);
		marker.setPosition(latLng);
		latitudeRef.current!.value = latLng.Ma;
		longitudeRef.current!.value = latLng.La;
		const geocoder = new window.kakao.maps.services.Geocoder();
		geocoder.coord2Address(latLng.La, latLng.Ma, (result: any, status: any) => {
			if (
				status === window.kakao.maps.services.Status.OK &&
				addressRef.current
			) {
				addressRef.current.value = result[0].road_address
					? result[0].road_address.address_name.split(' ').slice(0, 2).join(' ')
					: result[0].address.address_name.split(' ').slice(0, 3).join(' ');
			}
		});
	}

	function loadMap() {
		if (!latitudeRef.current?.value && !longitudeRef.current?.value) {
			latitudeRef.current!.value = '37.55467';
			longitudeRef.current!.value = '126.970609';
			addressRef.current!.value = '서울특별시 중구';
		}

		const mapOption = {
			center: new window.kakao.maps.LatLng(
				latitudeRef.current!.value,
				longitudeRef.current!.value,
			),
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
				setPosition(latlng);
			},
		);
	}

	function setCurrentPosition(e: BaseSyntheticEvent) {
		e.preventDefault();
		navigator.geolocation.getCurrentPosition(position => {
			let {latitude, longitude} = position.coords;
			const coord = new window.kakao.maps.LatLng(latitude, longitude);

			setPosition(coord);
		});
	}

	return (
		<>
			<Script
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
				onLoad={() => {
					window.kakao.maps.load(loadMap);
				}}
			/>
			<div className={styles.container}>
				<div className={styles.header}>
					<span>지역 설정</span>
					<button onClick={setCurrentPosition}>현 위치로 지정</button>
				</div>
				<div className={styles.map} ref={mapRef} />
				<input type="text" name="latitude" id="latitude" ref={latitudeRef} />
				<input type="text" name="longitude" id="longitude" ref={longitudeRef} />
				<input type="text" name="address" id="address" ref={addressRef} />
			</div>
		</>
	);
}
