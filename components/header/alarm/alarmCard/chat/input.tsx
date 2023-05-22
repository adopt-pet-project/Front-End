import React, {useRef, useState} from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/chat/input.module.scss';
import {useRecoilState} from 'recoil';
import {AgaraChat} from '@/utils/recoil/recoilStore';
import InputImgLine from './inputImgLine';
import InputLocation from './inputLocation';

function Input() {
	const textarea = useRef<HTMLTextAreaElement>(null);
	const [chatData, setChatData] = useRecoilState(AgaraChat);
	const [inputValue, setInputValue] = useState('');
	const [isImgInput, setIsImgInput] = useState(false);
	const [isLocationInput, setIsLocationInput] = useState(false);

	const handleResizeHeight = () => {
		if (textarea && textarea.current) {
			textarea.current.style.height = 'auto';
			textarea.current.style.height = textarea.current.scrollHeight + 'px';
		}
	};
	return (
		<div className={styles.inputLine}>
			{isImgInput ? <InputImgLine /> : null}
			{isLocationInput ? <InputLocation /> : null}
			<div className={styles.inputWrap}>
				<img
					onClick={() => {
						setIsLocationInput(false);
						setIsImgInput(true);
					}}
					className={styles.icon}
					src="/icon/picture.svg"
					alt=""
				/>
				<img
					onClick={() => {
						setIsImgInput(false);
						setIsLocationInput(true);
					}}
					className={styles.icon}
					src="/icon/location.svg"
					alt=""
				/>
				<textarea
					value={inputValue}
					onKeyUp={e => {
						if (
							e.shiftKey === false &&
							e.code === 'Enter' &&
							e.currentTarget.value !== '\n' &&
							e.currentTarget.value !== ''
						) {
							setChatData(prev => [
								...prev,
								{
									id: 4,
									type: 'text',
									chatContents: e.currentTarget.value,
									date: '2023. 5. 7 16:38',
									checked: true,
									isMy: true,
								},
							]);
							setInputValue('');
						}
						handleResizeHeight();
					}}
					onInput={e => {
						setInputValue(e.currentTarget.value);
						if (e.currentTarget.value === '\n') {
							setInputValue('');
						}
						handleResizeHeight();
					}}
					rows={1}
					onChange={handleResizeHeight}
					ref={textarea}
				/>
				<img
					onClick={() => {
						if (inputValue !== '\n' && inputValue !== '') {
							setChatData(prev => [
								...prev,
								{
									id: 4,
									type: 'text',
									chatContents: inputValue,
									date: '2023. 5. 7 16:38',
									checked: true,
									isMy: true,
								},
							]);
							setInputValue('');
						}
						handleResizeHeight();
					}}
					className={styles.icon}
					src="/icon/send.svg"
					alt=""
				/>
			</div>
		</div>
	);
}

export default Input;
