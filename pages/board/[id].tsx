import {GetServerSideProps} from 'next';
import {ReactElement, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/layout';
import Comments from '@/components/board/comments';
import Header from '@/components/board/header';
import Context from '@/components/board/context';
import Option from '@/components/board/option';
import {toDate} from '@/utils/functions/toDate';
import {useRouter} from 'next/router';
import styles from '@/styles/pages/board/view.module.scss';

export default function View({board, id}: {board: BoardDetail; id: string}) {
	const router = useRouter();
	const [target, setTarget] = useState<CommentTarget | null>(null);
	const commentRef = useRef<HTMLInputElement>(null);

	const [commentList, setCommentList] = useState<any>([]);

	useEffect(() => {
		async function fetchCommentList() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment/${id}`,
			);

			let result = await response.json();
			console.log(result);
		}

		fetchCommentList();
	}, []);

	async function onClickWriteComment() {
		if (!window.localStorage.getItem('accessToken')) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}

		if (!target) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment`,
				{
					headers: {
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					method: 'POST',
					body: JSON.stringify({
						boardId: id,
						context: commentRef.current?.value,
					}),
				},
			);

			let result = await response.json();

			if (result.status === 200) {
				router.push('/board');
			} else if (result.status === 401) {
				router.push(`/refreshToken`);
			} else {
				alert(`error code : ${result.status}`);
				router.push('/board');
			}

			// console.log(result);
			// console.log({
			// 	boardId: id,
			// 	context: commentRef.current?.value,
			// });
			// console.log(window.localStorage.getItem('accessToken') as string);
		}
	}

	return (
		<section className="body">
			<div style={{display: 'flex', flexGrow: '1', flexDirection: 'column'}}>
				<Header header={board.header} />
				<Context context={board.context} />
				<Option />
				<Link className={styles.return} href={'/board'}>
					목록으로
				</Link>
				<div className={styles.commentContainer}>
					<Comments
						parentId={null}
						setTarget={setTarget}
						commentList={commentList}
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
						ref={commentRef}
						className={styles.input}
						type="text"
					/>
					<button onClick={onClickWriteComment}>작성</button>
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

	if (result.status)
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
		};

	result.header.publishedAt = toDate(
		new Date(result.header.publishedAt).getTime(),
	);

	if (result.header.username == null) {
		result.header.username = '탈퇴한 사용자';
	}
	return {
		props: {board: result, id},
	};
};

View.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
