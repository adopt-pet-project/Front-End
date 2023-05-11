import styles from '@/styles/components/admin/manage/ipAddLine.module.scss';
import React from 'react';

function IpAddLine() {
	return (
		<div>
			<button className={styles.ipAddBtn}>+ 추가</button>
			<div className={styles.ipAddLine}>
				<div>
					<input type="text" />. <input type="text" />. <input type="text" />.{' '}
					<input type="text" />
				</div>
				<button className={styles.admit}>확인</button>
				<button>취소</button>
			</div>
		</div>
	);
}

export default IpAddLine;
