import React from 'react';
import styles from '@/styles/components/header/profileBox.module.scss';

function ProfileBox({
	setIsProfileBoxOn,
}: {
	setIsProfileBoxOn: (status: boolean) => void;
}) {
	return (
		<div className={styles.box}>
			<div className={styles.boxHeader}>
				<div
					onClick={() => {
						setIsProfileBoxOn(false);
					}}
					className={styles.closeBtn}
				>
					X
				</div>
			</div>

			<div className={styles.profileCard}>
				<img
					className={styles.profileImgWrap}
					src="https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800"
					alt=""
				/>
				<div>
					<div className={styles.name}>닉네임</div>
					<div className={styles.address}>경상남도 창원시</div>
					<div className={styles.activity}>
						<span>게시글 7</span>
						<span>댓글 22</span>
					</div>
				</div>
			</div>
			<div className={styles.myNav}>내 계정</div>
			<div className={styles.myNav}>분양 내역</div>
			<div className={styles.myNav}>분양 받기 내역</div>
			<div className={styles.myNav}>활동 내역</div>
		</div>
	);
}

export default ProfileBox;
