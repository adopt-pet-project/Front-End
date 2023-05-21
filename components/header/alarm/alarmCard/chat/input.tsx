import React, {useRef} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/input.module.scss';

function Input() {
	const textarea = useRef<HTMLTextAreaElement>(null);

	const handleResizeHeight = () => {
		if (textarea && textarea.current) {
			textarea.current.style.height = 'auto';
			textarea.current.style.height = textarea.current.scrollHeight + 'px';
		}
	};
	return (
		<div className={styles.inputWrap}>
			<img className={styles.icon} src="/icon/picture.svg" alt="" />
			<img className={styles.icon} src="/icon/location.svg" alt="" />
			<textarea rows={1} onChange={handleResizeHeight} ref={textarea} />
			<img className={styles.icon} src="/icon/send.svg" alt="" />
		</div>
	);
}

export default Input;
