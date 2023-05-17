import styles from '@/styles/components/header/profile.module.scss';
import {RefObject, useEffect, useState} from 'react';
import Login from './login';
import {useRouter} from 'next/router';

export default function Profile({
	containerRef,
}: {
	containerRef: RefObject<HTMLDivElement>;
}) {
	const [isModalActive, setIsModalActive] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (Boolean(router.query.login)) onClickLogin();
	}, []);

	function onClickLogin() {
		setIsModalActive(true);
		containerRef.current?.classList.add('preventScroll');
	}

	function hideModal() {
		router.push(router.asPath.split('?')[0]);
		setIsModalActive(false);
		containerRef.current?.classList.remove('preventScroll');
	}

	return (
		<>
			<button className={styles.loginButton} onClick={onClickLogin}>
				<img src="/icon/login.svg" width={24} height={24} alt="login icon" />
				<span>로그인</span>
			</button>
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
