import {
	BaseSyntheticEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
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

	const validateUsername = (e: BaseSyntheticEvent) => {
		e.preventDefault();

		// 닉네임 중복 검증 로직

		setValid(true);
		userInfo.current.nickname = inputRef.current?.value as string;
	};

	function setValid(value: boolean) {
		setIsUsernameValid(value);
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
					onChange={() => setValid(false)}
				/>
				{!isUsernameValid && (
					<button onClick={validateUsername} className={styles.button}>
						중복확인
					</button>
				)}
			</div>
		</>
	);
}
