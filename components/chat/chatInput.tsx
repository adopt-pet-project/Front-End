import styles from '@/styles/components/chat/chatInput.module.scss';
import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';

export default function ChatInput() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [currentMenuType, setCurrentMenuType] = useState<number>(0);

	// const keyboardHeight = useRef<number>(180);
	const inputRef = useRef<HTMLInputElement>(null);

	const initViewport = useRef<Viewport>();
	const keyboardHeight = useRef<number>(0);

	function detectKeyboardHeight() {
		if (
			initViewport.current?.width === window.innerWidth &&
			initViewport.current.height - window.innerHeight > 50 &&
			initViewport.current.height - window.innerHeight < 200
		) {
			// resize 시 width 가 동일하면서도 height 가 50 ~ 200 사이 변화하면 키보드 높이로 취급하자.
			keyboardHeight.current = initViewport.current.height - window.innerHeight;
		} else {
			// 일반적인 resize 라면 initViewport 갱신해 keyboard height 가 설정되는것을 방지
			initViewport.current!.height = window.innerHeight;
		}
		setCurrentMenuType(currentMenuType + 1);
	}

	useEffect(() => {
		initViewport.current = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		window.addEventListener('resize', detectKeyboardHeight);

		return () => {
			window.removeEventListener('resize', detectKeyboardHeight);
		};
	}, []);

	function onClickOpen() {
		if (inputRef.current) inputRef.current.blur();
		setIsMenuOpen(true);
	}

	function onClickClose() {
		setIsMenuOpen(false);
	}

	function onFocusInput(e: BaseSyntheticEvent) {
		setIsMenuOpen(false);
	}

	function onClickSend() {}

	return (
		<div className={styles.container}>
			for moblie keyboard height test, innerHeight : {keyboardHeight.current}
			<div className={styles.chatInput}>
				{isMenuOpen ? (
					<img
						style={{
							transform: 'rotate(45deg)',
						}}
						src="/icon/plus.svg"
						width={20}
						height={20}
						alt="close"
						onClick={onClickClose}
					/>
				) : (
					<img
						src="/icon/plus.svg"
						width={20}
						height={20}
						alt="open"
						onClick={onClickOpen}
					/>
				)}
				<input
					type="text"
					placeholder="메시지를 입력하세요."
					ref={inputRef}
					onFocus={onFocusInput}
				/>
				<img
					src="/icon/send.svg"
					width={24}
					height={24}
					alt="send"
					onClick={onClickSend}
				/>
			</div>
			{isMenuOpen && <div className={styles.menu}></div>}
		</div>
	);
}
