import styles from '@/styles/components/header/login.module.scss';
import Link from 'next/link';
import {BaseSyntheticEvent} from 'react';

const REST_API_KEY = '2d63fa4617e31a99b21eda3234db01cd';
const REDIRECT_URI = 'http://localhost:3000/test';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const providerList: Link[] = [
	{text: 'kakao', href: KAKAO_AUTH_URL},
	{text: 'naver', href: ''},
	{text: 'google', href: ''},
];

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
					{providerList.map((provider: Link) => {
						return (
							<>
								<li>
									<Link
										className={`${styles[provider.text]}`}
										href={provider.href}
									>
										<img
											className={styles.logo}
											src={`/icon/provider/${provider.text}.svg`}
											alt={provider.text}
										/>
									</Link>
									<span
										className={styles.subMessage}
									>{`${provider.text.toUpperCase()}로 계속하기`}</span>
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
