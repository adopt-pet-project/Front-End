import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {AmyAdoptModal, ArefetchAdoptList} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/myPage/myAdopt/myAdoptModal.module.scss';

function MyAdoptModal() {
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);
	const [refetch, setRefetch] = useRecoilState(ArefetchAdoptList);
	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);
	function updateMyAdoptState(status: any) {
		fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt`, {
			method: 'PATCH',
			headers: {
				Authorization: `${accessToken}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				id: myAdoptModal.modalID,
				status: status,
			}),
		}).then(() => {
			setRefetch(prev => (prev === 0 ? 1 : 0));
		});
	}

	return (
		<div
			className={`${styles.moreModal} ${myAdoptModal.isOn ? styles.on : null}`}
			style={{left: myAdoptModal.x, top: myAdoptModal.y}}
		>
			{myAdoptModal.type == 'adopting' ? (
				<div
					onClick={() => {
						updateMyAdoptState('reserved');
					}}
				>
					예약됨
				</div>
			) : (
				<div
					onClick={() => {
						updateMyAdoptState('adopting');
					}}
				>
					분양중
				</div>
			)}
			<div
				onClick={() => {
					updateMyAdoptState('end');
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
