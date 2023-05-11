import Search from '../search/search';
import styles from '@/styles/components/board/header.module.scss';

export default function Header({query}: {query: string}) {
	const titleText = query ? `${query}에 대한 검색 결과` : '게시판';

	return (
		<div className={styles.header}>
			<span className={styles.title}>{titleText}</span>
			<Search currentPath="board" />
			<button className={styles.writeButton}>
				<img
					style={{padding: '4px'}}
					width={32}
					height={32}
					src="/icon/write.svg"
					alt="write icon"
				/>
			</button>
		</div>
	);
}
