import styles from '@/styles/components/header/login.module.scss';
import Link from 'next/link';
import {BaseSyntheticEvent} from 'react';

const providerList = ['kakao', 'naver', 'google'];

export default function Login({hideModal}: {hideModal: () => void}) {
	return (
		<div
			onClick={(e: BaseSyntheticEvent) => {
				e.stopPropagation();
			}}
			className={styles.loginModal}
		>
			<header className={styles.header}>
				<img
					onClick={hideModal}
					className={styles.close}
					src="/icon/close.svg"
					alt="close icon"
				/>
			</header>
			<div className={styles.body}>
				<span className={styles.message}>
					기존 계정으로 간단하게 시작하세요.
				</span>
				<ul className={styles.provider}>
					{providerList.map((provider: string) => {
						return (
							<>
								<li>
									<div className={`${styles[provider]}`}>
										<img
											className={styles.logo}
											src={`/icon/provider/${provider}.svg`}
											alt={provider}
										/>
									</div>
									<span
										className={styles.subMessage}
									>{`${provider.toUpperCase()}로 계속하기`}</span>
								</li>
							</>
						);
					})}
				</ul>
				<div className={styles.policy}>
					<Link href={'/'}>서비스 이용약관</Link>
					<Link href={'/'}>개인정보 처리방침</Link>
				</div>
			</div>
		</div>
	);
}
