import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {useEffect, useRef} from 'react';
import {
	AisLogin,
	AisProfileBoxOn,
	AwriteNote,
} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/header/profileBox.module.scss';

function ProfileBox() {
	const router = useRouter();
	const profileBoxRef = useRef<HTMLDivElement>(null);
	const [isLogin, setIsLogin] = useRecoilState(AisLogin);
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	function findHaveParent(
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement {
		if (node === target) {
			return true;
		} else {
			if (node === null) {
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	}
	const handleCloseProfile = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			findHaveParent(
				e.target as HTMLElement,
				profileBoxRef.current as HTMLElement,
			) ||
			target.classList[0].includes('profileLoginTrue_profile')
		) {
		} else setIsProfileBoxOn(false);
	};

	useEffect(() => {
		window.addEventListener<any>('click', handleCloseProfile);

		return () => {
			window.removeEventListener<any>('click', handleCloseProfile);
		};
	}, []);

	return (
		<div ref={profileBoxRef} className={styles.box}>
			<div className={styles.boxHeader}>
				<img
					className={styles.closeBtn}
					src="/icon/close.svg"
					onClick={() => {
						setIsProfileBoxOn(false);
					}}
					width={30}
					height={30}
					alt=""
				/>
			</div>
			<hr className={styles.headerBoundary} />
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

export default ProfileBox;
