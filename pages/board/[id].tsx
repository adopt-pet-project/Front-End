import {ReactElement} from 'react';
import Layout from '@/components/layout/layout';
import styles from '@/styles/pages/board/view.module.scss';
import Images from '@/components/board/images';
import More from '@/components/board/more';
import Link from 'next/link';
import Comments from '@/components/board/comments';

const dummyData = {
	title: '저 라면쏟음.. ㅠㅠ',
	author: '홍길동',
	profile:
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	view: 3,
	like: 3,
	comment: 3,
	publishedAt: '2023.05.10 19:27',
	context:
		'안녕하세요... 제가 고민이 있어요.. \n다름이 아니고 집에 고양이를 키우는데..',
	image: [
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	],
};

const dummyComments = [
	{
		author: '홍길동',
		type: 'comment',
		context: 'ㅋㅋ 그러게 조심좀 하시지',
		profile:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		publishedAt: '2023.05.11 19:27',
		like: 3,
		commments: [
			{
				author: '김철수',
				type: 'reply',
				context: 'ㅠㅠ',
				profile:
					'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
				publishedAt: '2023.05.11 19:29',
				like: 5,
			},
			{
				author: '김철수',
				type: 'reply',
				context: 'ㅠㅠ',
				profile:
					'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
				publishedAt: '2023.05.11 19:29',
				like: 5,
			},
		],
	},
	{
		author: '홍길동',
		type: 'comment',
		context: 'ㅋㅋ 그러게 조심좀 하시지',
		profile:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		publishedAt: '2023.05.11 19:27',
		like: 3,
		commments: [],
	},
];

export default function View() {
	return (
		<section className="body">
			<div className={styles.header}>
				<span className={styles.title}>{dummyData.title}</span>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div className={styles.authorInfo}>
						<img
							className={styles.profile}
							src={dummyData.profile}
							alt="profile"
						/>
						<span className={styles.author}>{dummyData.author}</span>
					</div>
					<More />
				</div>
				<div className={styles.metadata}>
					<span>{`조회 ${dummyData.view} 댓글 ${dummyData.comment} 추천 ${dummyData.like}`}</span>
					<span>{dummyData.publishedAt}</span>
				</div>
			</div>
			<div className={styles.context}>
				{dummyData.context.split('\n').map((line: string, index: number) => {
					return (
						<span key={index}>
							{line}
							<br />
						</span>
					);
				})}
			</div>

			{dummyData.image.length > 0 && <Images image={dummyData.image}></Images>}
			<div className={styles.option}>
				<div className={styles.item}>
					<img src="/icon/like.svg" alt="like" />
					좋아요
				</div>
				<div className={styles.item}>
					<img src="/icon/report.svg" alt="report" />
					신고
				</div>
			</div>
			<Link className={styles.return} href={'/board'}>
				목록으로
			</Link>
			<div className={styles.commentContainer}>
				<Comments comments={dummyComments} />
			</div>
			<div className={styles.writeComment}>
				<input
					placeholder="댓글을 작성하세요."
					className={styles.commentInput}
					type="text"
				/>
				<button>작성</button>
			</div>
		</section>
	);
}

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
