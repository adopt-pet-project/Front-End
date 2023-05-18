import Link from 'next/link';
import Search from './search/search';
import styles from '@/styles/components/header.module.scss';
import {AmodalWrap, AmodalType} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';

export default function Header({query, path}: {query: string; path: string}) {
	const type = path === 'board' ? '게시판' : '분양';
	const titleText = query ? `${query}에 대한 검색 결과` : type;
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	function onClickNewAdopt() {
		setModalType('setAdoptType');
		modalRef!.current!.style.display = 'flex';
	}

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>{titleText}</h1>
			<Search currentPath={path} />
			{type === '게시판' && (
				<Link className={styles.writeButton} href={`/${path}/new`}>
					<img
						style={{padding: '4px'}}
						width={32}
						height={32}
						src="/icon/write.svg"
						alt="write icon"
					/>
				</Link>
			)}
			{type === '분양' && (
				<button onClick={onClickNewAdopt} className={styles.writeButton}>
					<img
						style={{padding: '4px'}}
						width={32}
						height={32}
						src="/icon/write.svg"
						alt="write icon"
					/>
				</button>
			)}
		</div>
	);
}
