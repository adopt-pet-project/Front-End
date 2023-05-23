import React from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AisLogin, AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import ProfileCard from './profileCard';
import styles from '@/styles/components/header/profile/profileNav.module.scss';

function ProfileNav() {
	const router = useRouter();
	const [isLogin, setIsLogin] = useRecoilState(AisLogin);
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	return (
		<div className={styles.innerWrap}>
			<ProfileCard />
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					router.push('/myPage');
				}}
				className={styles.myNav}
			>
				내 계정
			</div>
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					router.push('/myPage/myAdopt');
				}}
				className={styles.myNav}
			>
				분양 내역
			</div>
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					router.push('/myPage/getAdopt');
				}}
				className={styles.myNav}
			>
				분양 받기 내역
			</div>
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					router.push('/activity');
				}}
				className={styles.myNav}
			>
				활동 내역
			</div>
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					setIsLogin(false);
					router.push('/');
				}}
				className={`${styles.myNav} ${styles.logout}`}
			>
				로그아웃
			</div>
		</div>
	);
}

export default ProfileNav;
