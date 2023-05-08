import Link from 'next/link';
import styles from '@/styles/components/aside/nav.module.scss';

const communityLinkItem: Link[] = [
	{text: '메인', href: '/'},
	{text: '게시판', href: '/'},
	{text: '공지사항', href: '/'},
];
const adpotLinkItem: Link[] = [
	{text: '강아지', href: '/'},
	{text: '고양이', href: '/'},
	{text: '기타', href: '/'},
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
