import {RefObject, useEffect, useState} from 'react';
import Login from './login';
import ProfileLoginTrue from './profileLoginTrue';
import {useRouter} from 'next/router';
import styles from '@/styles/components/header/profile.module.scss';

export default function Profile({
	containerRef,
}: {
	containerRef: RefObject<HTMLDivElement>;
}) {
	const [isModalActive, setIsModalActive] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	useEffect(() => {
		window.addEventListener('fadeLogin', onClickLogin);
		window.addEventListener('hideLogin', hideModal);
		return () => {
			window.removeEventListener('toggleLogin', onClickLogin);
			window.removeEventListener('hideLogin', hideModal);
		};
	}, []);

	function onClickLogin() {
		setIsModalActive(true);
		containerRef.current?.classList.add('preventScroll');
	}

	function hideModal() {
		setIsModalActive(false);
		containerRef.current?.classList.remove('preventScroll');
	}

	return (
		<>
			{isLogin ? (
				<ProfileLoginTrue />
			) : (
				<button className={styles.loginButton} onClick={onClickLogin}>
					<img src="/icon/login.svg" width={24} height={24} alt="login icon" />
					<span>로그인</span>
				</button>
			)}

			{isModalActive && (
				<div
					key={Date.now()}
					className={styles.loginWrap}
					tabIndex={-1}
					onClick={hideModal}
				>
					<Login hideModal={hideModal} />
				</div>
			)}
		</>
	);
}
