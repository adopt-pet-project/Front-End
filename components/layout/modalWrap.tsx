import React, {RefObject, useEffect, useRef} from 'react';
import styles from '@/styles/components/admin/admin.module.scss';
import AdminBlock from '../admin/modal/adminBlock';
import {useRecoilState} from 'recoil';
import {AmodalWrap} from '@/utils/recoil/recoilStore';

function ModalWrap() {
	const modalWrapRef = useRef<HTMLDivElement>(null);
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);

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
			{<AdminBlock />}
		</div>
	);
}

export default ModalWrap;
