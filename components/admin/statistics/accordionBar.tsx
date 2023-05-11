import React, {useState} from 'react';
import styles from '@/styles/components/admin/admin.module.scss';
import UserStatistics from './userStatistics';
import AdoptStatistics from './adoptStatistics';
import ContentsStatistics from './contentsStatistics';

function AccordionBar() {
	const [isUserGraph, setIsUserGraph] = useState(false);
	const [isAdoptGraph, setIsAdoptGraph] = useState(false);
	const [isContentGraph, setIsContentGraph] = useState(false);

	return (
		<ul className={styles.AccordionUl}>
			<li className={styles.menuLi}>
				{isUserGraph ? <UserStatistics /> : null}
				<div
					onClick={() => {
						setIsUserGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isUserGraph ? styles.on : null}`}> 사용자 통계</p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>

			<li className={styles.menuLi}>
				{isAdoptGraph ? <AdoptStatistics /> : null}
				<div
					onClick={() => {
						setIsAdoptGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isAdoptGraph ? styles.on : null}`}> 분양 통계 </p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>

			<li className={styles.menuLi}>
				{isContentGraph ? <ContentsStatistics /> : null}
				<div
					onClick={() => {
						setIsContentGraph(prev => !prev);
					}}
					className={styles.menuTitle}
				>
					<p className={`${isContentGraph ? styles.on : null}`}> 컨텐츠 통계</p>
					<hr className={styles.menuBoundary} />
				</div>
			</li>
		</ul>
	);
}

export default AccordionBar;
