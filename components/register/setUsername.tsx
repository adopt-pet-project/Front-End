import {
	BaseSyntheticEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from '@/styles/components/register/setUsername.module.scss';

export default function SetUsername({
	userInfo,
	setIsReady,
}: {
	userInfo: MutableRefObject<Register>;
	setIsReady: Dispatch<SetStateAction<boolean>>;
}) {
	const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [search, isSearch] = useState(false);
	const validateUsername = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		if (inputRef.current && inputRef.current.value === '') {
			setValid(false);
			return;
		}
		isSearch(true);

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/member/validate?nickname=${inputRef.current?.value}`,
		);

		let result = await response.json();

		if (!result.duplicated) {
			setValid(true);
			userInfo.current.nickname = inputRef.current?.value as string;
		} else {
			setValid(false);
		}
	};

	function setValid(value: boolean) {
		if (inputRef.current) setIsUsernameValid(value);
		setIsReady(value);
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '64px',
					animation: '1s ease-in-out fadeIn',
				}}
			>
				<span className={styles.label}>처음 오셨군요! 환영합니다.</span>
				<span className={styles.label}>닉네임을 설정해요.</span>
			</div>
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} ${isUsernameValid ? styles.valid : ''}`}
					ref={inputRef}
					type="text"
					name="username"
					placeholder="닉네임을 입력해 주세요."
					onChange={() => {
						isSearch(false);
						setValid(false);
					}}
				/>
				{!isUsernameValid && search ? (
					<div className={styles.duplicatedName}>중복된 닉네임</div>
				) : null}
				{!isUsernameValid && (
					<button onClick={validateUsername} className={styles.button}>
						중복확인
					</button>
				)}
			</div>
		</>
	);
}
