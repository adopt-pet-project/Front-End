import React from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/header/profile/profileCard.module.scss';
import ChatNoteBox from './chatNoteBox';
import {useQuery} from 'react-query';

function ProfileCard() {
	const accessToken = window.localStorage.getItem('accessToken');

	const router = useRouter();
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);

	const userInfo = useQuery<Userinfo>(
		['readMyInfo'],
		async () => {
			return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/0`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			})
				.then(response => response.json())
				.then(data => {
					return data;
				});
		},
		{retry: 0},
	);

	return (
		<div className={styles.profileWrap}>
			<div className={styles.profileCard}>
				<img
					className={styles.profileImgWrap}
					src={userInfo.data?.profile}
					alt=""
				/>
				<div>
					<div className={styles.name}>{userInfo.data?.name}</div>
					<div className={styles.address}>{userInfo.data?.location}</div>
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
						<span>게시글 {userInfo.data?.activity.document}</span>
						<span>댓글 {userInfo.data?.activity.comment}</span>
					</div>
				</div>
			</div>
			<ChatNoteBox />
		</div>
	);
}

export default ProfileCard;
