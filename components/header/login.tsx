import styles from '@/styles/components/header/login.module.scss';
import useRegister from '@/utils/hooks/useRegister';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {BaseSyntheticEvent, useEffect} from 'react';

const providerList: Link[] = [
	{
		text: 'kakao',
		href: 'https://ez-tour.org/oauth2/authorization/kakao',
	},
	{text: 'naver', href: 'https://ez-tour.org/oauth2/authorization/naver'},
	{text: 'google', href: 'https://ez-tour.org/oauth2/authorization/google'},
];

export default function Login({hideModal}: {hideModal: () => void}) {
	const setRegister = useRegister();
	const router = useRouter();

	useEffect(() => {
		const reset = () => {
			setRegister();
		};

		const toRegister = () => {
			window.dispatchEvent(new Event('hideLogin'));
			const register = JSON.parse(
				window.localStorage.getItem('register') || '',
			);

			router.push(
				`/register?email=${register.email}&provider=${register.provider}`,
			);
		};
		window.addEventListener('beforeunload', reset);
		window.addEventListener('storage', toRegister);

		return () => {
			window.removeEventListener('beforeunload', reset);
			window.removeEventListener('storage', toRegister);
		};
	}, []);

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
							<li key={provider.text}>
								<button
									onClick={() => {
										setRegister();
										window.open(
											provider.href,
											'_blank',
											'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=500',
										);
									}}
									className={`${styles[provider.text]}`}
								>
									<img
										className={styles.logo}
										src={`/icon/provider/${provider.text}.svg`}
										alt={provider.text}
									/>
								</button>
								<span
									className={styles.subMessage}
								>{`${provider.text.toUpperCase()}로 계속하기`}</span>
							</li>
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
