import React, {useState} from 'react';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import ProfileBox from './profileBox';

function ProfileLoginTrue() {
	const [isProfileBoxOn, setIsProfileBoxOn] = useState(false);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useState(false);
	return (
		<div className={styles.profileLoginWrap}>
			<div
				onClick={() => {
					setIsAlarmBoxOn(prev => !prev);
				}}
				className={styles.imgWrap}
			>
				<img src="/icon/alarm.svg" width={30} height={30} alt="login icon" />
				<div className={styles.alarmD}></div>
			</div>

			{isProfileBoxOn ? <ProfileBox /> : null}

			<div
				onClick={() => {
					setIsProfileBoxOn(prev => !prev);
				}}
				className={styles.profile}
			>
				<img src="/icon/person.svg" width={30} height={30} alt="login icon" />
			</div>
		</div>
	);
}

export default ProfileLoginTrue;
