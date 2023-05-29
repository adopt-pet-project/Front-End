import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {
	AmyAdoptBoardType,
	AmyAdoptModal,
	ArefetchAdoptList,
} from '@/utils/recoil/recoilStore';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import MyAdoptModal from './myAdoptModal';
import MyAdoptCard from './myAdoptCard';
import styles from '@/styles/components/myPage/myAdopt/myAdoptCardList.module.scss';

function MyAdoptCardList() {
	const refresh = useRefreshToken();
	const [myAdoptBoardType, setMyAdoptBoardType] =
		useRecoilState(AmyAdoptBoardType);
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);
	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);
	const [refetch, setRefetch] = useRecoilState(ArefetchAdoptList);
	const [myAdoptData, setMyAdoptData] = useState<any[]>([]);

	useEffect(() => {
		async function fetchMyInfo() {
			await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/mypage/adopt?status=${myAdoptBoardType}`,
				{
					method: 'GET',
					headers: {
						Authorization: `${accessToken}`,
					},
				},
			)
				.then(response => response.json())
				.then(data => {
					data.status === 401 ? refresh() : setMyAdoptData(data);
					data.status === 500 ? alert('DB오류') : null;
				});
		}
		fetchMyInfo();
	}, [myAdoptBoardType, refetch]);

	return (
		<>
			<ul className={styles.cardList}>
				{myAdoptData.map((data, i) => (
					<MyAdoptCard key={i} boardType={myAdoptBoardType} article={data} />
				))}
			</ul>
			{myAdoptModal.isOn ? <MyAdoptModal /> : null}
		</>
	);
}

export default MyAdoptCardList;
