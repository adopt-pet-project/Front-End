import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useRouter} from 'next/router';
import styles from '@/styles/components/main/mainMap.module.scss';

import React, {useState} from 'react';
import Script from 'next/script';

function MainMap() {
	const router = useRouter();
	const [filterCtg, setFilterCtg] = useState<'a' | 'd' | 'c' | 'o'>('a');

	const [mapMarkerData, setMapMarkerData] = useState([
		{
			id: 22,
			name: '낑낑이',
			age: 5,
			type: 'd',
			lat: 37.410701,
			lng: 126.510667,
			isModal: false,
		},
		{
			id: 23,
			name: '든든이',
			age: 7,
			type: 'd',
			lat: 37.420701,
			lng: 126.620667,
			isModal: false,
		},
		{
			id: 24,
			name: '쫑쫑이',
			age: 8,
			type: 'c',
			lat: 37.430701,
			lng: 126.730667,
			isModal: false,
		},
		{
			id: 25,
			name: '컹컹이',
			age: 11,
			type: 'c',
			lat: 37.440701,
			lng: 126.840667,
			isModal: false,
		},
		{
			id: 26,
			name: '껌딱지',
			age: 7,
			type: 'o',
			lat: 37.450701,
			lng: 126.990667,
			isModal: false,
		},
	]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`}
				strategy="beforeInteractive"
			/>
			<Map
				onClick={() => {
					setMapMarkerData(prev => {
						let result = [...prev];
						return result.map(data => {
							return {...data, isModal: false};
						});
					});
				}}
				center={{
					// 지도의 중심좌표
					lat: 37.450701,
					lng: 126.770667,
				}}
				style={{
					// 지도의 크기
					width: '100%',
					height: '100%',
				}}
				level={10} // 지도의 확대 레벨
			>
				{mapMarkerData
					.filter((markerData, i) => {
						if (filterCtg === 'a') return true;
						else if (filterCtg === 'd') return markerData.type === 'd';
						else if (filterCtg === 'c') return markerData.type === 'c';
						else return markerData.type === 'o';
					})
					.map((markerData, i) => (
						<MapMarker
							key={i}
							onClick={() => {
								if (markerData.isModal) {
									setMapMarkerData(prev => {
										let result = [...prev];
										return result.map(data => {
											return {...data, isModal: false};
										});
									});
								} else {
									setMapMarkerData(prev => {
										let result = [...prev];
										result = result.map(data => ({
											...data,
											isModal: false,
										}));
										return result.map(data => {
											if (data.id === markerData.id)
												return {...data, isModal: true};
											else return data;
										});
									});
								}
							}}
							position={{lat: markerData.lat, lng: markerData.lng}}
						>
							{markerData.isModal ? (
								<div
									onClick={() => {
										router.push(`./adopt/${markerData.id}`);
									}}
									className={styles.markerModal}
								>
									<img
										src="https://project-adopt-bucket.s3.ap-northeast-2.amazonaws.com/other/cat.jpeg"
										alt=""
									/>
									<div className={styles.info}>
										<div>{`${markerData.name}`}</div>
										<div>{`${markerData.age}`}살</div>
									</div>
								</div>
							) : null}
						</MapMarker>
					))}
			</Map>

			<div className={styles.filterBtnWrap}>
				<button
					onClick={() => {
						setFilterCtg('a');
					}}
					className={styles.filterBtn}
				>
					전체
				</button>
				<button
					onClick={() => {
						setFilterCtg('d');
					}}
					className={styles.filterBtn}
				>
					강아지
				</button>
				<button
					onClick={() => {
						setFilterCtg('c');
					}}
					className={styles.filterBtn}
				>
					고양이
				</button>
				<button
					onClick={() => {
						setFilterCtg('o');
					}}
					className={styles.filterBtn}
				>
					그 외
				</button>
			</div>
		</>
	);
}

export default MainMap;
