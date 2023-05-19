import Link from 'next/link';
import styles from '@/styles/components/aside/nav.module.scss';

const communityLinkItem: Link[] = [
	{text: '메인', href: '/'},
	{text: '게시판', href: '/board'},
	{text: '공지사항', href: '/notice'},
];
const adpotLinkItem: Link[] = [
	{text: '전체', href: '/adopt'},
	{text: '강아지', href: '/adopt?filter=dog'},
	{text: '고양이', href: '/adopt?filter=cat'},
	{text: '기타', href: '/adopt?filter=etc'},
];

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<ul className={styles.menuList}>
				<span>커뮤니티</span>
				{communityLinkItem.map((item: Link) => {
					return (
						<li key={item.text}>
							<Link className={styles.link} href={item.href}>
								{item.text}
							</Link>
						</li>
					);
				})}
			</ul>
			<ul className={styles.menuList}>
				<span>분양</span>
				{adpotLinkItem.map((item: Link) => {
					return (
						<li key={item.text}>
							<Link className={styles.link} href={item.href}>
								{item.text}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
