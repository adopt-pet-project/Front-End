import styles from '@/styles/components/board/order.module.scss';
import Link from 'next/link';

export default function Order({order}: {order: string}) {
	return (
		<div className={styles.order}>
			<Link
				className={`${styles.orderItem} ${
					order === 'recent' ? `${styles.active}` : ''
				}`}
				href="/board?order=recent"
			>
				최신순
			</Link>
			<Link
				className={`${styles.orderItem} ${
					order === 'popular' ? `${styles.active}` : ''
				}`}
				href="/board?order=popular"
			>
				인기순
			</Link>
		</div>
	);
}
