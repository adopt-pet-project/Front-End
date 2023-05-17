import React from 'react';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';

function ProfileLoginTrue() {
	return (
		<div className={styles.profileLoginWrap}>
			<div className={styles.imgWrap}>
				<img src="/icon/alarm.svg" width={30} height={30} alt="login icon" />
				<div className={styles.alarmD}></div>
			</div>

			<div className={styles.profile}>
				<img src="/icon/person.svg" width={30} height={30} alt="login icon" />
			</div>
		</div>
	);
}

export default ProfileLoginTrue;
