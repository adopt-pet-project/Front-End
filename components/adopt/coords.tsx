import {useEffect, useState} from 'react';
import {Map, MapMarker, useInjectKakaoMapApi} from 'react-kakao-maps-sdk';
import styles from '@/styles/components/adopt/coords.module.scss';
import Script from 'next/script';

export default function Position({coords}: {coords: AdoptCoords}) {
	const [address, setAddress] = useState<string>('');
	console.log(coords);
	useEffect(() => {
		fetch(
			`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coords.longitude}&y=${coords.latitude}&input_coord=WGS84`,
			{
				method: 'GET',
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
				},
			},
		)
			.then(data => data.json())
			.then(data => {
				console.log(data);
				setAddress(
					data.documents[0].road_address
						? data.documents[0].road_address.address_name
						: data.documents[0].address.address_name,
				);
			});
	}, []);

	useEffect(() => {
		console.log(address);
	}, [address]);

	return (
		<>
			<Script
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`}
				strategy="beforeInteractive"
			></Script>
			<div className={styles.container}>
				<span className={styles.title}>분양 지역</span>

				<Map
					center={{lat: coords.latitude, lng: coords.longitude}}
					style={{
						height: '300px',
					}}
					level={3}
				>
					<MapMarker
						position={{lat: coords.latitude, lng: coords.longitude}}
					></MapMarker>
				</Map>
				<span className={styles.address}>{address}</span>
			</div>
		</>
	);
}
