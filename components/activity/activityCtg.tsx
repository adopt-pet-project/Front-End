import React from 'react';
import styles from '@/styles/components/activity/activityCategory.module.scss';
import {useRecoilState} from 'recoil';
import {AisComment} from '@/utils/recoil/recoilStore';

function ActivityCtg() {
	const [isComment, setIsComment] = useRecoilState(AisComment);
	return (
		<>
			<div className={styles.avtivityCategory}>
				<span
					onClick={() => {
						setIsComment(false);
					}}
					className={`${styles.categoryBtn} ${
						isComment === true ? styles.currentBtn : null
					} drag-prevent`}
				>
					게시글
				</span>
				<span
					onClick={() => {
						setIsComment(true);
					}}
					className={`${styles.categoryBtn} ${
						isComment === false ? styles.currentBtn : null
					} drag-prevent`}
				>
					댓글
				</span>
				<hr
					className={`${styles.ctgBoundary} ${
						isComment === true ? styles.onRight : null
					} `}
				/>
			</div>
		</>
	);
}

export default ActivityCtg;
