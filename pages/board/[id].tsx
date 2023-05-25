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

	async function fetchCommentList() {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment/${id}`,
		);

		let result = await response.json();

		if (result.status) {
			alert(`error code : ${result.status}`);
			router.push(`/board/${id}`);
		} else if (result.status === 401) {
			router.push(`/refreshToken`);
		}
		console.log(result);
		setCommentList(result);
	}

	useEffect(() => {
		fetchCommentList();
	}, []);

	async function onClickWriteComment() {
		if (!window.localStorage.getItem('accessToken')) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}

		if (!commentRef.current?.value) {
			alert('댓글 내용을 입력하세요');
			return;
		}

		if (!target) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment`,
				{
					headers: {
						'Content-Type': 'application/json',
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
			setInputValue('');

			if (result.status === 200) {
				fetchCommentList();
			} else if (result.status === 401) {
				router.push(`/refreshToken`);
			} else {
				alert(`error code : ${result.status}`);
				router.push(`/board/${id}`);
			}
		} else if (!target.modify) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					method: 'POST',
					body: JSON.stringify({
						parentId: target.commentId,
						boardId: id,
						context: commentRef.current?.value,
					}),
				},
			);
			console.log({
				parentId: target.commentId,
				boardId: id,
				context: commentRef.current?.value,
			});
			let result = await response.json();
			setInputValue('');
			setTarget(null);

			if (result.status === 200) {
				fetchCommentList();
			} else if (result.status === 401) {
				router.push(`/refreshToken`);
			} else {
				alert(`error code : ${result.status}`);
				router.push(`/board/${id}`);
			}
		} else if (target.modify) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.localStorage.getItem('accessToken') as string,
					},
					method: 'PATCH',
					body: JSON.stringify({
						id: target.commentId,
						context: commentRef.current?.value,
					}),
				},
			);

			let result = await response.json();
			setInputValue('');
			setTarget(null);

			if (result.status === 200) {
				fetchCommentList();
			} else if (result.status === 401) {
				router.push(`/refreshToken`);
			} else {
				alert(`error code : ${result.status}`);
				router.push(`/board/${id}`);
			}
		}
	}

	function setInputValue(value: string) {
		if (commentRef.current) commentRef.current.value = value;
	}

	async function deleteComment(id: number) {
		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/comment/${id}`,
			{
				headers: {
					Authorization: window.localStorage.getItem('accessToken') as string,
				},
				method: 'DELETE',
			},
		);

		let result = await response.json();

		if (result.status === 200) {
			alert('댓글이 삭제되었습니다.');
			fetchCommentList();
		} else {
			alert('삭제에 실패했습니다.');
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
						setInputValue={setInputValue}
						deleteComment={deleteComment}
					/>
				</div>
			</div>
			<div className={styles.commentInputContainer}>
				{target && (
					<div className={styles.commentTarget}>
						<span>
							{target.modify
								? '내 댓글 수정'
								: `${target.author}에게 답글 작성`}
						</span>
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
