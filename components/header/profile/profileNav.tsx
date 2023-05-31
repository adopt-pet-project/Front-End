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
import useFetch from '@/utils/hooks/useFetch';

function ProfileNav() {
	const refresh = useRefreshToken();
	const router = useRouter();
	const [isLogin, setIsLogin] = useRecoilState(AisLogin);
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [myPageCtg, setMyPageCtg] = useRecoilState(AcurrentMyPageCtg);

	const fetchLogout = useFetch('/token/logout', 'POST', true, () => {
		localStorage.removeItem('accessToken');
		setIsLogin(false);
		router.push('/');
	});

	async function logout() {
		await fetchLogout();
	}

	const navBtn = [
		{
			tag: '내 계정',
			route: '/myPage',
		},
		{
			tag: '분양 내역',
			route: '/myPage/myAdopt',
		},
		{
			tag: '분양 받기 내역',
			route: '/myPage/getAdopt',
		},
		{
			tag: '활동내역',
			route: '/activity',
		},
	];

	return (
		<nav className={styles.innerWrap}>
			<ProfileCard />
			{navBtn.map((data, i) => (
				<div
					onClick={() => {
						setMyPageCtg(0);
						setIsProfileBoxOn(false);
						router.push(`${data.route}`);
					}}
					className={`${styles.myNav}`}
				>
					{data.tag}
				</div>
			))}

			<div
				onClick={() => {
					logout();
					setMyPageCtg(0);
					setIsProfileBoxOn(false);
				}}
				className={`${styles.myNav} ${styles.logout}`}
			>
				로그아웃
			</div>
		</nav>
	);
}

export default ProfileNav;
