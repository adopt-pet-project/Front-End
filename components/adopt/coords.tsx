import styles from '@/styles/components/adopt/coords.module.scss';
import {AdoptCoords} from '@/utils/@types/adopt';
import Script from 'next/script';
import {useRef} from 'react';

export default function Position({coords}: {coords: AdoptCoords}) {
	const mapRef = useRef<HTMLDivElement>(null);

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
				<span>분양 지역</span>
				<div className={styles.map} ref={mapRef} />
			</div>
		</>
	);
}
