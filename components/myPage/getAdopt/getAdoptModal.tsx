import React from 'react';
import {useRecoilState} from 'recoil';
import {AmyAdoptModal} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/myPage/myAdopt/myAdoptModal.module.scss';

function MyAdoptModal() {
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);

	return (
		<div
			className={`${styles.moreModal} ${myAdoptModal.isOn ? styles.on : null}`}
			style={{left: myAdoptModal.x, top: myAdoptModal.y}}
		>
			{myAdoptModal.type == 'adopting' ? <div>예약됨</div> : <div>분양중</div>}
			<div>분양완료</div>
			<div>숨김</div>
			<div>수정</div>
			<div>삭제</div>
		</div>
	);
}

export default MyAdoptModal;
