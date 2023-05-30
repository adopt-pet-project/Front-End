import useRefreshToken from '@/utils/hooks/useRefreshToken';
import {useState} from 'react';
import styles from '@/styles/components/board/option.module.scss';

export default function Option({id, like}: {id: string; like: number}) {
	const [likeCount, setLikeCount] = useState<number>(like);
	const refresh = useRefreshToken();
	async function onClickLike() {
		const token = window.localStorage.getItem('accessToken');
		if (!token) {
			dispatchEvent(new Event('fadeLogin'));
			return;
		}

		let response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/community/heart`,
			{
				method: 'POST',
				headers: {Authorization: token, 'Content-Type': 'application/json'},
				body: JSON.stringify({target: 'article', id: Number(id)}),
			},
		);

		let result = await response.json();

		if (result.status === 200) {
			setLikeCount(result.data);
		} else if (result.status === 401) {
			refresh();
			alert('다시 시도해 주세요.');
		} else if (result.status === 404) {
			alert('삭제된 글 또는 댓글 입니다.');
		} else if (result.status === 409) {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/community/heart/article/${id}`,
				{
					method: 'DELETE',
					headers: {Authorization: token, 'Content-Type': 'application/json'},
				},
			);

			let result = await response.json();
			if (result.status === 200) {
				setLikeCount(result.data);
			} else if (result.status === 401) {
				refresh();
				alert('다시 시도해 주세요.');
			} else if (result.status === 404) {
				alert('삭제된 글 또는 댓글 입니다.');
			}
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.item} onClick={onClickLike}>
				<img src="/icon/like.svg" alt="like" />
				좋아요 {likeCount}
			</div>
			<div className={styles.item}>
				<img src="/icon/letter.svg" alt="letter" />
				쪽지
			</div>
			<div className={styles.item}>
				<img src="/icon/report.svg" alt="report" />
				신고
			</div>
		</div>
	);
}
