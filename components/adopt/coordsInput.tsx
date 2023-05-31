import {BaseSyntheticEvent, useState} from 'react';
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

	//현재 지정된 포인트
	const [currentPosition, setCurrentPosition] = useState({
		lat: 37.55467,
		lng: 126.970609,
	});
	const [address, setAddress] = useState('');

	//버튼을 누를 시 현재 접속자 위치로 포지션 변경 → 안건들임
	function setCurrentPositionByBtn(e: BaseSyntheticEvent) {
		// 버튼
		e.preventDefault();
		navigator.geolocation.getCurrentPosition(position => {
			let {latitude, longitude} = position.coords;
			const coord = new window.kakao.maps.LatLng(latitude, longitude);

			setCurrentPosition(coord);
		});
	}

	//좌표로 주소를 받는 rest api
	function getAddressByCoords() {
		fetch(
			`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${currentPosition.lng}&y=${currentPosition.lat}&input_coord=WGS84`,
			{
				method: 'GET',
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
				},
			},
		)
			.then(data => data.json())
			.then(data => {
				setAddress(
					data.documents[0].road_address
						? data.documents[0].road_address.address_name
								.split(' ')
								.slice(0, 2)
								.join(' ')
						: data.documents[0].address.address_name
								.split(' ')
								.slice(0, 2)
								.join(' '),
				);
			});
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<span>지역 설정</span>
					<button onClick={setCurrentPositionByBtn}>현 위치로 지정</button>
				</div>
				<Map
					onClick={(_t, e) => {
						getAddressByCoords();
						setCurrentPosition({
							lat: e.latLng.getLat(),
							lng: e.latLng.getLng(),
						});
					}}
					center={currentPosition}
					style={mapStyle}
					level={6}
				>
					<MapMarker position={currentPosition}></MapMarker>
				</Map>
				<input
					type="text"
					name="latitude"
					id="latitude"
					value={currentPosition.lat}
					onChange={e => {}}
				/>
				<input
					type="text"
					name="longitude"
					id="longitude"
					value={currentPosition.lng}
					onChange={e => {}}
				/>
				<input
					type="text"
					name="address"
					id="address"
					value={address}
					onChange={e => {}}
				/>
			</div>
		</>
	);
}
