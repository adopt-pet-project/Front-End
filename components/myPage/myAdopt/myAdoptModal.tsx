import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {AmyAdoptModal, ArefetchAdoptList} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/myPage/myAdopt/myAdoptModal.module.scss';
import useFetch from '@/utils/hooks/useFetch';

function MyAdoptModal() {
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);
	const [refetch, setRefetch] = useRecoilState(ArefetchAdoptList);
	const updateMyAdoptState = useFetch('/adopt', 'PATCH', true, () => {
		setRefetch(prev => (prev === 0 ? 1 : 0));
	});

	return (
		<div
			className={`${styles.moreModal} ${myAdoptModal.isOn ? styles.on : null}`}
			style={{left: myAdoptModal.x, top: myAdoptModal.y}}
		>
			{myAdoptModal.type == 'adopting' ? (
				<div
					onClick={() => {
						updateMyAdoptState({
							id: myAdoptModal.modalID, // 분양글의 고유 번호
							status: 'reserved', // 변경 할 상태 값 -> adopting, end, reserved
						});
					}}
				>
					예약됨
				</div>
			) : (
				<div
					onClick={() => {
						updateMyAdoptState({
							id: myAdoptModal.modalID, // 분양글의 고유 번호
							status: 'adopting', // 변경 할 상태 값 -> adopting, end, reserved
						});
					}}
				>
					분양중
				</div>
			)}
			<div
				onClick={() => {
					updateMyAdoptState({
						id: myAdoptModal.modalID, // 분양글의 고유 번호
						status: 'end', // 변경 할 상태 값 -> adopting, end, reserved
					});
				}}
			>
				분양완료
			</div>
			<div
				onClick={() => {
					alert('미구현');
				}}
			>
				숨김
			</div>
		</div>
	);
}

export default MyAdoptModal;
