import {useRecoilState} from 'recoil';
import {useEffect, useState} from 'react';
import {AisComment} from '@/utils/recoil/recoilStore';
import ActivityCard from './activityCard';
import ActivityComment from './activityComment';
import styles from '@/styles/components/activity/activityCardList.module.scss';
import useRefreshToken from '@/utils/hooks/useRefreshToken';
import useFetch from '@/utils/hooks/useFetch';

function ActivityCardList() {
	const [accessToken, setAccessToken] = useState(
		typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '',
	);
	const [isComment, setIsComment] = useRecoilState(AisComment);
	const [myDoc, setMyDoc] = useState<Activitydoc[]>([]);
	const [myComment, setMyComment] = useState<Activitycomment[]>([]);
	const [_1, fetchMyDoc] = useFetch(`/mypage/article`, 'GET', true, data => {
		setMyDoc(data);
	});
	const [_2, fetchMyComment] = useFetch(
		`/mypage/comment`,
		'GET',
		true,
		data => {
			setMyComment(data);
		},
	);

	useEffect(() => {
		// 내 게시글 조회

		fetchMyDoc();
	}, []);

	useEffect(() => {
		// 유저 댓글 조회

		fetchMyComment();
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
