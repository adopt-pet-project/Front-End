import styles from '@/styles/components/order.module.scss';
import Link from 'next/link';

export default function OrderBy({
	currentOrder,
	orderList,
}: {
	currentOrder: string;
	orderList: Order[];
}) {
	return (
		<div className={styles.order}>
			{orderList.map((order: Order) => {
				return (
					<Link
						key={order.order}
						className={`${styles.orderItem} ${
							currentOrder === order.order ? `${styles.active}` : ''
						}`}
						href={order.href}
					>
						{order.orderText}
					</Link>
				);
			})}
		</div>
	);
}
