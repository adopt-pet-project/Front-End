import React from 'react';
import styles from '@/styles/components/admin/admin.module.scss';
import AdminBlock from './adminBlock';
import {useRecoilState} from 'recoil';
import {AisAdminModalOn} from '@/utils/recoil/recoilStore';

function ModalWrap() {
	const [_, setIsModal] = useRecoilState(AisAdminModalOn);
	return (
		<div
			onClick={() => {
				setIsModal(false);
			}}
			className={styles.modalWrap}
		>
			<AdminBlock />
		</div>
	);
}

export default ModalWrap;
