import {useRecoilState} from 'recoil';
import {useEffect, useState} from 'react';
import {AisComment} from '@/utils/recoil/recoilStore';
import ActivityCard from './activityCard';
import ActivityComment from './activityComment';
import styles from '@/styles/components/activity/activityCardList.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';

function ActivityCardList() {
	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);
	const [isComment, setIsComment] = useRecoilState(AisComment);
	const [myDoc, setMyDoc] = useState<Activitydoc[]>([]);
	const [myComment, setMyComment] = useState<Activitycomment[]>([]);
	const refresh = useRefreshToken();

	useEffect(() => {
		// 유저 게시글 조회
		async function getMyDoc() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/mypage/article`;
			let response = await fetch(`${URL}`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			});
			const result = await response.json();
			console.log(result);
			if (result.status === 401) refresh();
			setMyDoc(await result);
		}

		getMyDoc();
	}, []);

	useEffect(() => {
		// 유저 댓글 조회
		async function getMyComment() {
			let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/mypage/comment`;
			let response = await fetch(`${URL}`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			});
			const result = await response.json();
			console.log(result);
			if (result.status === 401) refresh();
			setMyComment(await result);
		}

		getMyComment();
	}, []);

	return (
		<ul className={styles.cardList}>
			{isComment === false
				? myDoc.map((data, i) => <ActivityCard key={i} article={data} />)
				: myComment.map((data, i) => (
						<ActivityComment key={i} article={data} />
				  ))}
		</ul>
	);
}

export default ActivityCardList;
