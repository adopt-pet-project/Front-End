import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/myPage/getAdopt/getAdoptCard.module.scss';
import {useRouter} from 'next/router';

function MyPageCard({article, boardType}: {article: any; boardType: string}) {
	const router = useRouter();
	return (
		<li
			className={styles.card}
			onClick={() => {
				router.push('/board/11');
			}}
		>
			{article.thumb && article.thumb === 'null' ? (
				<div className={styles.dummyThumbnails} />
			) : (
				<Image
					width={92}
					height={92}
					quality={75}
					loading="lazy"
					className={styles.thumbnail}
					src={article.thumb}
					alt={`${article.title} thumbnail`}
				/>
			)}

			<div className={styles.description}>
				<div className={styles.preview}>
					<div className={styles.title}>
						<span>{article.title}</span>
						{boardType === 'reserved' ? (
							<span className={styles.delete}>삭제</span>
						) : boardType === 'end' ? (
							<span className={styles.delete}>삭제</span>
						) : null}
					</div>

					<span className={styles.context}>{article.context}</span>
				</div>
				<div className={styles.metadata}>
					<span>{`${article.author} · ${article.publishedAt}`}</span>
					<ul className={styles.dataList}>
						<li>
							<img style={{marginTop: '2px'}} src="/icon/view.svg" alt="view" />
							<span>{article.view}</span>
						</li>
						<li>
							<img
								style={{marginTop: '2px'}}
								src="/icon/comment.svg"
								alt="comment"
							/>
							<span>{article.comment}</span>
						</li>
						<li>
							<img style={{padding: '2px'}} src="/icon/like.svg" alt="like" />
							<span>{article.like}</span>
						</li>
					</ul>
				</div>
			</div>
		</li>
	);
}

export default MyPageCard;
