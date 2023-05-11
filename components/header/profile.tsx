import styles from '@/styles/components/header/profile.module.scss';
import {RefObject, useState} from 'react';
import Login from './login';

export default function Profile({
	containerRef,
}: {
	containerRef: RefObject<HTMLDivElement>;
}) {
	const [isModalActive, setIsModalActive] = useState<boolean>(false);

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
			<button className={styles.loginButton} onClick={onClickLogin}>
				<img src="/icon/login.svg" width={24} height={24} alt="login icon" />
				<span>로그인</span>
			</button>
			{isModalActive && (
				<div className={styles.loginWrap} tabIndex={-1} onClick={hideModal}>
					<Login hideModal={hideModal} />
				</div>
			)}
		</>
	);
}
