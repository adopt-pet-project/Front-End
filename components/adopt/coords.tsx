import {useEffect, useRef, useState} from 'react';
import Script from 'next/script';
import styles from '@/styles/components/adopt/coords.module.scss';

export default function Position({coords}: {coords: AdoptCoords}) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [address, setAddress] = useState<string>('');

	useEffect(() => {
		if (window.kakao) {
			window.kakao.maps.load(loadMap);
		}
	});

	function loadMap() {
		const mapOption = {
			center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
			level: 3,
		};

		const map = new window.kakao.maps.Map(mapRef.current, mapOption);
		const marker = new window.kakao.maps.Marker({
			position: map.getCenter(),
		});
		marker.setMap(map);

		const geocoder = new window.kakao.maps.services.Geocoder();

		geocoder.coord2Address(
			coords.longitude,
			coords.latitude,
			(result: any, status: any) => {
				if (status === window.kakao.maps.services.Status.OK) {
					setAddress(
						result[0].road_address
							? result[0].road_address.address_name
							: result[0].address.address_name,
					);
				}
			},
		);
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
				<div className={styles.map} ref={mapRef} />
				<span>{address}</span>
			</div>
		</>
	);
}
