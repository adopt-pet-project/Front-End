import React from 'react';
import styles from '@/styles/components/header/profileBox.module.scss';
function ProfileBox() {
	return (
		<div className={styles.box}>
			<div className={styles.boxHeader}>
				<div className={styles.closeBtn}>X</div>
			</div>
			<hr className={styles.headerBoundary} />
			<div className={styles.profileCard}>
				<div>프사영역</div>
				<div>
					<div>닉네임</div>
					<div>경상남도 창원시</div>
					<div>
						<span>게시글 7</span>
						<span>댓글 22</span>
					</div>
				</div>
			</div>
			<div>내 계정</div>
			<div>분양 내역</div>
			<div>분양 받기 내역</div>
			<div>활동 내역</div>
		</div>
	);
}

export default ProfileBox;
