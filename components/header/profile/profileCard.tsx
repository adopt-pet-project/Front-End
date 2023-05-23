import React from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/header/profile/profileCard.module.scss';
import ChatNoteBox from './chatNoteBox';

function ProfileCard() {
	const router = useRouter();
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);

	return (
		<div className={styles.profileWrap}>
			<div className={styles.profileCard}>
				<img
					className={styles.profileImgWrap}
					src="https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800"
					alt=""
				/>
				<div>
					<div className={styles.name}>잠자는오리</div>
					<div className={styles.address}>경상남도 창원시</div>
					<div className={styles.activity}>
						<div
							onClick={() => {
								setIsProfileBoxOn(false);
								router.push('/activity');
							}}
							className={styles.acts}
						>
							활동내역
						</div>
						<span>게시글 7</span>
						<span>댓글 22</span>
					</div>
				</div>
			</div>
			<ChatNoteBox />
		</div>
	);
}

export default ProfileCard;
