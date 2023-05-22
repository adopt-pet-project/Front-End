import {GetServerSideProps} from 'next';
import {ReactElement, useState} from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/layout';
import Comments from '@/components/board/comments';
import Header from '@/components/board/header';
import Context from '@/components/board/context';
import Option from '@/components/board/option';
import styles from '@/styles/pages/board/view.module.scss';

const dummyData = {
	id: 2,
	authorId: '378shdf67c',
	header: {
		title: '저 라면쏟음.. ㅠㅠ',
		author: '홍길동',
		view: 3,
		like: 3,
		comment: 3,
		publishedAt: '2023.05.10 19:27',
		profile:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
	},
	context: {
		context:
			'안녕하세요... 제가 고민이 있어요.. \n다름이 아니고 집에 고양이를 키우는데..',
		image: [
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		],
	},
};

const dummyComments = [
	{
		type: 'comment',
		id: 1,
		authorId: 15,
		username: '홍길동',
		context: 'ㅋㅋ 그러게 조심좀 하시지',
		profile:
			'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
		publishedAt: '2023.05.11 19:27',
		like: 3,
		commments: [
			{
				type: 'reply',
				id: 2,
				authorId: 15,
				username: '홍길동',
				context: 'ㅠㅠ',
				profile:
					'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
				publishedAt: '2023.05.11 19:29',
				like: 5,
			},
			{
				type: 'reply',
				id: 3,
				authorId: 16,
				username: '양의지',
				context: 'ㅠㅠ',
				profile:
					'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800',
				publishedAt: '2023.05.11 19:29',
				like: 5,
			},
		],
	},
	{
		id: 4,
		authorId: 15,
		username: '김성태',
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
	const [target, setTarget] = useState<CommentTarget | null>(null);
	console.log(target);
	return (
		<section className="body">
			<div>
				<Header header={dummyData.header} />
				<Context context={dummyData.context} />
				<Option />
				<Link className={styles.return} href={'/board'}>
					목록으로
				</Link>
				<div className={styles.commentContainer}>
					<Comments
						parentId={null}
						setTarget={setTarget}
						comments={dummyComments}
					/>
				</div>
			</div>
			<div className={styles.commentInputContainer}>
				{target && (
					<div className={styles.commentTarget}>
						<span>{target.username}에게 댓글</span>
						<img
							src="/icon/close.svg"
							width={20}
							height={20}
							alt="close"
							onClick={() => {
								setTarget(null);
							}}
						/>
					</div>
				)}
				<div className={styles.commentInput}>
					<input
						placeholder="댓글을 작성하세요."
						className={styles.input}
						type="text"
					/>
					<button>작성</button>
				</div>
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const id = query.id;

	let result = await (
		await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/community/article/${id}`)
	).json();

	console.log(result);

	return {
		props: {},
	};
};

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
