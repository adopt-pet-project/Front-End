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
import useFetch from '@/utils/hooks/useFetch';

function MyAdoptCardList() {
	const refresh = useRefreshToken();
	const [myAdoptBoardType, setMyAdoptBoardType] =
		useRecoilState(AmyAdoptBoardType);
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);

	const [_, fetchMyAdopt] = useFetch(
		`/mypage/adopt?status=${myAdoptBoardType}`,
		'GET',
		true,
		data => {
			setMyAdoptData(data);
		},
	);
	const [refetch, setRefetch] = useRecoilState(ArefetchAdoptList);
	const [myAdoptData, setMyAdoptData] = useState<any[]>([]);

	useEffect(() => {
		fetchMyAdopt();
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
