import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '@/styles/components/order.module.scss';

export default function OrderBy({
	currentOrder,
	orderList,
	orderType,
}: {
	currentOrder: string;
	orderList: Order[];
	orderType: string;
}) {
	const router = useRouter();

	return (
		<div className={styles.order}>
			{orderList.map((order: Order) => {
				let href = router.pathname;
				Object.keys(router.query).forEach((key: string, index: number) => {
					let queryString =
						key === orderType
							? order.order === ''
								? ''
								: `${key}=${order.order}`
							: `${key}=${router.query[key]}`;

					if (queryString !== '') {
						href += index === 0 ? '?' + queryString : '&' + queryString;
					}
				});

				if (router.query[orderType] == null && order.order !== '') {
					const typeString = `${orderType}=${order.order}`;
					href +=
						Object.keys(router.query).length === 0
							? '?' + typeString
							: '&' + typeString;
				}
				return (
					<Link
						key={order.order}
						className={`${styles.orderItem} ${
							currentOrder == order.order ? `${styles.active}` : ''
						}`}
						href={href}
					>
						{order.orderText}
					</Link>
				);
			})}
		</div>
	);
}
