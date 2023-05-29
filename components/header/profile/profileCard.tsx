import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {AisProfileBoxOn, AuserInfo} from '@/utils/recoil/recoilStore';
import ChatNoteBox from './chatNoteBox';
import styles from '@/styles/components/header/profile/profileCard.module.scss';

function ProfileCard() {
	const router = useRouter();
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [userInfo, setUserInfo] = useRecoilState(AuserInfo);

	console.log(userInfo);

	console.log(userInfo);
	return (
		<div className={styles.profileWrap}>
			<div className={styles.profileCard}>
				<img className={styles.profileImgWrap} src={userInfo.profile} alt="" />
				<div>
					<div className={styles.name}>{userInfo.name}</div>
					<div className={styles.address}>{userInfo.location}</div>
					<div className={styles.activity}>
						<div
							onClick={() => {
								setIsProfileBoxOn(false);
								router.push('/activity');
							}}
							className={styles.acts}
						>
							활동내역
						</div>
						<span>게시글 {userInfo.activity.document}</span>
						<span>댓글 {userInfo.activity.comment}</span>
					</div>
				</div>
			</div>
			<ChatNoteBox />
		</div>
	);
}

export default ProfileCard;
