import {ReactElement, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '@/components/layout/layout';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';
import useRegister from '@/utils/hooks/useRegister';
import SetUsername from '@/components/register/setUsername';
import SetAddress from '@/components/register/setAddress';
import SetProfile from '@/components/register/setProfile';
import styles from '@/styles/pages/register.module.scss';

const LAST_STEP = 2;

export default function Register() {
	const [isReady, setIsReady] = useState<boolean>(false);
	const [step, setStep] = useState<number>(0);
	const userInfo = useRef<Register>({
		email: '',
		provider: '',
		nickname: '',
		address: '',
	});
	const setRegister = useRegister();
	const router = useRouter();

	const stepContents = [
		<SetUsername userInfo={userInfo} setIsReady={setIsReady} />,
		<SetAddress userInfo={userInfo} setIsReady={setIsReady} />,
		<SetProfile userInfo={userInfo} setIsReady={setIsReady} />,
	];

	useEffect(() => {
		const reset = () => {
			setRegister();
		};

		window.addEventListener('beforeunload', reset);
		return () => {
			window.removeEventListener('beforeunload', reset);
		};
	}, []);

	useDepsOnlyEffect(() => {
		if (!router.query.email && !router.query.provider) {
			alert('잘못된 접근입니다.');
			router.back();
		}

		userInfo.current.provider = router.query.provider as string;
		userInfo.current.email = router.query.email as string;
	}, [router.isReady]);

	function onClickNext() {
		if (step !== LAST_STEP) {
			setStep(step + 1);
			setIsReady(false);
		} else {
			registerRequest();
		}
	}

	async function registerRequest() {
		let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo.current),
		});
		let result = await response.json();

		if (result.status !== 200) {
			alert(`회원가입에 실패했습니다.\
			사유 : {result.response}`);
			router.push('/');
		}
	}

	return (
		<>
			<h1 className={styles.title}>회원가입</h1>
			<section className="body">
				<div className={styles.container}>
					<div className={styles.header}>
						{step === 0 ? (
							<div className={styles.blank}></div>
						) : (
							<img
								src="/icon/left.svg"
								alt="back"
								width={36}
								height={36}
								onClick={() => {
									setStep(step - 1);
									setIsReady(false);
								}}
							/>
						)}
						<span>{`${step + 1} / ${LAST_STEP + 1}`}</span>
					</div>
					<div className={styles.wrap}>{stepContents[step]}</div>
					{isReady ? (
						<button onClick={onClickNext} className={styles.nextButton}>
							{step !== LAST_STEP ? '다음 단계로' : '회원가입'}
						</button>
					) : (
						<div className={styles.blankButton} />
					)}
				</div>
			</section>
		</>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
