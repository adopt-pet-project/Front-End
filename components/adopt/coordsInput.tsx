import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styles from '@/styles/components/adopt/coordsInput.module.scss';

export default function CoordsInput({coords}: {coords?: AdoptCoords}) {
	const mapStyle = {
		//맵 css
		height: '300px',
		width: '100%',
		backgroundColor: '#ececee',
		borderRadius: '8px',
	};

	const INIT_LATITUDE = '37.55467';
	const INIT_LONGITUDE = '126.970609';
	const INIT_ADDRESS = '서울특별시 중구';

	// coords for display
	const [latitude, setLatitude] = useState<string>(INIT_LATITUDE);
	const [longitude, setLongitude] = useState<string>(INIT_LONGITUDE);

	// coords for logic
	const latitudeRef = useRef<HTMLInputElement>(null);
	const longitudeRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (latitudeRef.current && longitudeRef.current && addressRef.current) {
			latitudeRef.current.value = coords
				? coords.latitude.toString()
				: INIT_LATITUDE;
			longitudeRef.current.value = coords
				? coords.longitude.toString()
				: INIT_LONGITUDE;
			addressRef.current.value = coords ? coords.address : INIT_ADDRESS;

			setLatitude(latitudeRef.current.value);
			setLongitude(longitudeRef.current.value);
		}
	}, []);

	function getCurrentPosition(e: BaseSyntheticEvent) {
		e.preventDefault();
		navigator.geolocation.getCurrentPosition(position => {
			let {latitude, longitude} = position.coords;
			const coord = new window.kakao.maps.LatLng(latitude, longitude);
			latitudeRef.current!.value = coord.Ma;
			longitudeRef.current!.value = coord.La;

			setAddress({lat: coord.Ma, lng: coord.La});
		});
	}

	async function setAddress({lat, lng}: {lat: number; lng: number}) {
		let response = await fetch(
			`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
			{
				method: 'GET',
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
				},
			},
		);
		let result = await response.json();
		if (addressRef.current && result.documents[0]) {
			addressRef.current.value = result.documents[0].road_address
				? result.documents[0].road_address.address_name
						.split(' ')
						.slice(0, 2)
						.join(' ')
				: result.documents[0].address.address_name
						.split(' ')
						.slice(0, 2)
						.join(' ');
		}

		setLatitude(lat.toString());
		setLongitude(lng.toString());
	}
	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<span>지역 설정</span>
					<button onClick={getCurrentPosition}>현 위치로 지정</button>
				</div>
				<Map
					onClick={(_t, e) => {
						let lat = e.latLng.getLat();
						let lng = e.latLng.getLng();
						latitudeRef.current!.value = lat.toString();
						longitudeRef.current!.value = lng.toString();
						setAddress({lat, lng});
					}}
					center={{
						lat: Number(latitude),
						lng: Number(longitude),
					}}
					style={mapStyle}
					level={6}
				>
					<MapMarker
						position={{
							lat: Number(latitude),
							lng: Number(longitude),
						}}
					></MapMarker>
				</Map>
				<input type="text" name="latitude" id="latitude" ref={latitudeRef} />
				<input
					type="text"
					name="longitude"
					id="longitude"
					ref={longitudeRef}
					onChange={e => {}}
				/>
				<input
					type="text"
					name="address"
					id="address"
					ref={addressRef}
					onChange={e => {}}
				/>
			</div>
		</>
	);
}
