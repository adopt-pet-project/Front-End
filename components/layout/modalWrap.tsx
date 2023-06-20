import React, {useEffect, useRef} from 'react';
import {useRecoilState} from 'recoil';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import ModalSelector from './modalSelector';
import styles from '@/styles/components/layout/modalWrap.module.scss';

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
			<ModalSelector modalType={modalType} />
		</div>
	);
}

export default ModalWrap;
