import React, {useEffect, useRef, useState} from 'react';
import Script from 'next/script';
import styles from '@/styles/components/header/alarm/alarmCard/chat/chatLocationBox.module.scss';
function ChatLocationBox({location}: {location: {x: string; y: string}}) {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.kakao) {
			window.kakao.maps.load(loadMap);
		}
	});

	function loadMap() {
		const mapOption = {
			center: new window.kakao.maps.LatLng(location.x, location.y),
			level: 7,
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
				<div className={styles.map} ref={mapRef} />
			</div>
		</>
	);
}

export default ChatLocationBox;
