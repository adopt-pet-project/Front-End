import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useRouter} from 'next/router';
import styles from '@/styles/components/main/mainMap.module.scss';

import React, {useEffect, useState} from 'react';
import Script from 'next/script';

function MainMap() {
	const router = useRouter();
	const [filterCtg, setFilterCtg] = useState<'a' | 'd' | 'c' | 'o'>('a');

	const [mapMarkerData, setMapMarkerData] = useState<Mapmarker[]>([]);

	useEffect(() => {
		async function fetchMapData() {
			await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt/render`, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					setMapMarkerData(data);
				});
		}
		fetchMapData();
	}, []);

	useEffect(() => {
		console.log(mapMarkerData);
	}, [mapMarkerData]);
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
						else if (filterCtg === 'd') return markerData.kind === '강아지';
						else if (filterCtg === 'c') return markerData.kind === '고양이';
						else return markerData.kind === '기타';
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
							position={{lat: markerData.latitude, lng: markerData.longitude}}
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
										<div>{`${markerData.age}`}</div>
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
