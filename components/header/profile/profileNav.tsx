import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {
	AcurrentMyPageCtg,
	AisLogin,
	AisProfileBoxOn,
} from '@/utils/recoil/recoilStore';
import ProfileCard from './profileCard';
import styles from '@/styles/components/header/profile/profileNav.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

function ProfileNav() {
	const refresh = useRefreshToken();
	const router = useRouter();
	const [isLogin, setIsLogin] = useRecoilState(AisLogin);
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [myPageCtg, setMyPageCtg] = useRecoilState(AcurrentMyPageCtg);
	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);

	async function logout() {
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/token/logout`, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
			},
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				localStorage.removeItem('accessToken');
				setIsLogin(false);
				router.push('/');
			});
	}
	return (
		<div className={styles.innerWrap}>
			<ProfileCard />
			<div
				onClick={() => {
					setIsProfileBoxOn(false);
					setMyPageCtg(0);
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
					logout();
					setIsProfileBoxOn(false);
				}}
				className={`${styles.myNav} ${styles.logout}`}
			>
				로그아웃
			</div>
		</div>
	);
}

export default ProfileNav;
