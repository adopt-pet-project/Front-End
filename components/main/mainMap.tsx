import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {useRouter} from 'next/router';
import styles from '@/styles/components/main/mainMap.module.scss';

import React, {useEffect, useState} from 'react';
import useFetch from '@/utils/hooks/useFetch';

function MainMap() {
	const router = useRouter();
	const [filterCtg, setFilterCtg] = useState<'a' | 'd' | 'c' | 'o'>('a');
	const fetchMapData = useFetch('/adopt/render', 'GET', false, data => {
		setMapMarkerData(data);
	});
	const [mapMarkerData, setMapMarkerData] = useState<Mapmarker[]>([]);

	useEffect(() => {
		fetchMapData();
	}, []);

	return (
		<>
			<Map
				onClick={() => {
					setMapMarkerData(prev => {
						let result = [...prev];
						return result.map(data => {
							return {...data, modal: false};
						});
					});
				}}
				center={{
					// 지도의 중심좌표
					lat: 37.55186,
					lng: 126.9515,
				}}
				style={{
					// 지도의 크기
					width: '100%',
					height: '100%',
				}}
				level={7} // 지도의 확대 레벨
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
								if (markerData.modal) {
									setMapMarkerData(prev => {
										let result = [...prev];
										return result.map(data => {
											return {...data, modal: false};
										});
									});
								} else {
									setMapMarkerData(prev => {
										let result = [...prev];
										result = result.map(data => ({
											...data,
											modal: false,
										}));
										return result.map(data => {
											if (data.id === markerData.id)
												return {...data, modal: true};
											else return data;
										});
									});
								}
							}}
							position={{lat: markerData.latitude, lng: markerData.longitude}}
						>
							{markerData.modal ? (
								<div
									onClick={() => {
										router.push(`./adopt/${markerData.id}`);
									}}
									className={styles.markerModal}
								>
									<img src={`${markerData.thumbnail}`} alt="동물 사진" />
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
						setMapMarkerData(prev => {
							let result = [...prev];
							return result.map(data => {
								return {...data, modal: false};
							});
						});
						setFilterCtg('a');
					}}
					className={styles.filterBtn}
				>
					전체
				</button>
				<button
					onClick={() => {
						setMapMarkerData(prev => {
							let result = [...prev];
							return result.map(data => {
								return {...data, modal: false};
							});
						});
						setFilterCtg('d');
					}}
					className={styles.filterBtn}
				>
					강아지
				</button>
				<button
					onClick={() => {
						setMapMarkerData(prev => {
							let result = [...prev];
							return result.map(data => {
								return {...data, modal: false};
							});
						});
						setFilterCtg('c');
					}}
					className={styles.filterBtn}
				>
					고양이
				</button>
				<button
					onClick={() => {
						setMapMarkerData(prev => {
							let result = [...prev];
							return result.map(data => {
								return {...data, modal: false};
							});
						});
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
