import styles from '@/styles/components/admin/admin.module.scss';
import React from 'react';

function IpAddLine() {
	return (
		<div className={styles.ipAddLine}>
			<div>
				<input type="text" />. <input type="text" />. <input type="text" />.{' '}
				<input type="text" />
			</div>
			<button className={styles.admit}>확인</button>
			<button>취소</button>
		</div>
	);
}

export default IpAddLine;
