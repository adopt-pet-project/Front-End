import Link from 'next/link';
import styles from '@/styles/components/aside/footer.module.scss';

const footerLinkItem: Link[] = [
	{text: '이용약관', href: '/tos'},
	{text: '개인정보처리방침', href: '/policy'},
	{text: '문의', href: '/'},
];

export default function Footer() {
	return (
		<div className={styles.footer}>
			<ul className={styles.linkList}>
				{footerLinkItem.map((item: Link) => {
					return (
						<li key={item.text}>
							<Link className={styles.link} href={item.href}>
								{item.text}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className={styles.info}>
				<span className={styles.copyright}>© 2023 pet-hub</span>
				<Link
					className={styles.link}
					href={'https://github.com/adopt-pet-project'}
				>
					GitHub
				</Link>
			</div>
		</div>
	);
}
