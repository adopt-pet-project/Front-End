import styles from '@/styles/components/chat/chatInput.module.scss';
import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';

export default function ChatInput() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [currentMenuType, setCurrentMenuType] = useState<number>(0);

	const inputRef = useRef<HTMLInputElement>(null);

	function onClickMenu() {
		if (!isMenuOpen) {
			if (inputRef.current) inputRef.current.blur();
			setIsMenuOpen(true);
		} else {
			setIsMenuOpen(false);
		}
	}

	function onFocusInput(e: BaseSyntheticEvent) {
		setIsMenuOpen(false);
	}

	function onClickSend() {}

	return (
		<div className={styles.container}>
			<div className={styles.chatInput}>
				<img
					style={{
						transform: `${isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)'}`,
					}}
					src="/icon/plus.svg"
					width={22}
					height={22}
					alt="menu"
					onClick={onClickMenu}
				/>
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
			{isMenuOpen && (
				<ul className={styles.menu}>
					<li>
						<div className={styles.icon}>
							<img
								src="/icon/picture.svg"
								alt="picture"
								width={28}
								height={28}
							/>
						</div>
						사진
					</li>
					<li>
						<div className={styles.icon}>
							<img
								src="/icon/location.svg"
								alt="picture"
								width={24}
								height={24}
							/>
						</div>
						위치
					</li>
				</ul>
			)}
		</div>
	);
}
