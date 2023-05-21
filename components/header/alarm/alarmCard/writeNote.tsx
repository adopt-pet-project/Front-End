import React from 'react';
import styles from '@/styles/components/header/alarm/alarmCard/writeNote.module.scss';
import {useRecoilState} from 'recoil';
import {AwriteNote} from '@/utils/recoil/recoilStore';

function WriteNote() {
	const [isWriteNote, setIsWriteNote] = useRecoilState(AwriteNote);
	return (
		<div
			onClick={() => {
				setIsWriteNote(false);
			}}
			className={styles.writeWrap}
		>
			<div
				onClick={e => {
					e.stopPropagation();
				}}
				className={styles.writebox}
			>
				<div className={styles.sendTo}>to. 홍길동</div>
				<hr />
				<textarea
					placeholder="쪽지 내용 입력"
					className={styles.input}
				></textarea>
				<div className={styles.btnLine}>
					<button
						onClick={() => {
							setIsWriteNote(false);
						}}
						className={styles.cancelBtn}
					>
						취소
					</button>
					<button
						onClick={() => {
							setIsWriteNote(false);
						}}
						className={styles.sendBtn}
					>
						전송
					</button>
				</div>
			</div>
		</div>
	);
}

export default WriteNote;
