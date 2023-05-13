import Link from 'next/link';
import Search from './search/search';
import styles from '@/styles/components/header.module.scss';

export default function Header({query, path}: {query: string; path: string}) {
	const type = path === 'board' ? '게시판' : '분양';
	const titleText = query ? `${query}에 대한 검색 결과` : type;

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>{titleText}</h1>
			<Search currentPath={path} />
			<Link className={styles.writeButton} href={`/${path}/new`}>
				<img
					style={{padding: '4px'}}
					width={32}
					height={32}
					src="/icon/write.svg"
					alt="write icon"
				/>
			</Link>
		</div>
	);
}
