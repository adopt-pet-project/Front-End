import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import ProfileBox from './profileBox';

function ProfileLoginTrue() {
	const [isProfileBoxOn, setIsProfileBoxOn] = useState(false);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useState(false);
	const profileBtnRef = useRef<HTMLDivElement>(null);
	return (
		<div className={styles.profileLoginWrap}>
			<div
				onClick={() => {
					setIsAlarmBoxOn(prev => !prev);
				}}
				className={styles.imgWrap}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src="/icon/alarm.svg"
					width={30}
					height={30}
					alt="alarm icon"
				/>
				<div className={styles.alarmD}></div>
			</div>

			{isProfileBoxOn ? (
				<ProfileBox
					isProfileBoxOn={isProfileBoxOn}
					setIsProfileBoxOn={setIsProfileBoxOn}
					profileBtnRef={profileBtnRef}
				/>
			) : null}

			<div
				ref={profileBtnRef}
				onClick={() => {
					setIsProfileBoxOn(prev => !prev);
				}}
				className={styles.profile}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src="/icon/person.svg"
					width={30}
					height={30}
					alt="profile icon"
				/>
			</div>
		</div>
	);
}

export default ProfileLoginTrue;
