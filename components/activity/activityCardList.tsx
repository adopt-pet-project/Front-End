import styles from '@/styles/components/activity/activityCardList.module.scss';
import ActivityCard from './activityCard';
import ActivityComment from './activityComment';
import {useRecoilState} from 'recoil';
import {AisComment} from '@/utils/recoil/recoilStore';

function ActivityCardList() {
	const DummyDataDoc: any[] = [];
	const DummyDataComment: any[] = [];
	const [isComment, setIsComment] = useRecoilState(AisComment);

	for (let i = 0; i < 9; i++) {
		DummyDataDoc.push({
			id: i,
			title: '타이틀',
			context: '본문',
			author: '김성태',
			view: 3,
			comment: 6,
			like: 2,
			publishedAt: '글쓴시간',
			thumb:
				'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		});
	}

	for (let i = 0; i < 9; i++) {
		DummyDataComment.push({
			id: i,
			docId: i,
			title: '라면 쏟음...',
			comment: '어쩌긴요 버려야죠',
			publishedAt: '댓글단시간',
		});
	}
	return (
		<ul className={styles.cardList}>
			{isComment === false
				? DummyDataDoc.map((data, i) => <ActivityCard key={i} article={data} />)
				: DummyDataComment.map((data, i) => (
						<ActivityComment key={i} article={data} />
				  ))}
		</ul>
	);
}

export default ActivityCardList;
