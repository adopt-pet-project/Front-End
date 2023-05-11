import React, {useEffect, useRef} from 'react';
import styles from '@/styles/components/layout/modalWrap.module.scss';

import {useRecoilState} from 'recoil';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';

import UserInfo from '../admin/modal/userInfo';
import AdminBlock from '../admin/modal/adminBlock';

function ModalWrap() {
	const modalWrapRef = useRef<HTMLDivElement>(null);
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	useEffect(() => {
		setModalRef(modalWrapRef);
	}, []);
	return (
		<div
			style={{display: 'none'}}
			ref={modalWrapRef}
			onClick={() => {
				if (modalWrapRef.current && modalWrapRef) {
					modalWrapRef.current.style.display = 'none';
				}
			}}
			className={styles.modalWrap}
		>
			{modalType === 'adminBlock' ? (
				<AdminBlock />
			) : modalType === 'userInfo' ? (
				<UserInfo />
			) : null}
		</div>
	);
}

export default ModalWrap;
