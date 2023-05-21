import React, {useRef} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/input.module.scss';
import {useRecoilState} from 'recoil';
import {AgaraChat} from '@/utils/recoil/recoilStore';

function Input() {
	const textarea = useRef<HTMLTextAreaElement>(null);
	const [chatData, setChatData] = useRecoilState(AgaraChat);

	const handleResizeHeight = () => {
		if (textarea && textarea.current) {
			textarea.current.style.height = 'auto';
			textarea.current.style.height = textarea.current.scrollHeight + 'px';
		}
	};
	return (
		<div className={styles.inputLine}>
			<div className={styles.inputWrap}>
				<img className={styles.icon} src="/icon/picture.svg" alt="" />
				<img className={styles.icon} src="/icon/location.svg" alt="" />
				<textarea
					onKeyUp={e => {
						if (
							e.shiftKey === false &&
							e.code === 'Enter' &&
							e.currentTarget.value !== '\n' &&
							e.currentTarget.value !== ''
						) {
							e.currentTarget.value = '';
							setChatData(prev => [
								...prev,
								{
									id: 4,
									type: 'location',
									chatContents: {x: '37.55467', y: '126.970609'},
									date: '2023. 5. 7 16:38',
									checked: true,
									isMy: true,
								},
							]);
						}
						handleResizeHeight();
					}}
					onInput={e => {
						if (e.currentTarget.value === '\n') {
							e.currentTarget.value = '';
						}
						handleResizeHeight();
					}}
					rows={1}
					onChange={handleResizeHeight}
					ref={textarea}
				/>
				<img className={styles.icon} src="/icon/send.svg" alt="" />
			</div>
		</div>
	);
}

export default Input;
