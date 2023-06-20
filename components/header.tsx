import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {AmodalWrap, AmodalType} from '@/utils/recoil/recoilStore';
import Search from './search/search';
import styles from '@/styles/components/header.module.scss';

export default function Header({query, path}: {query: string; path: string}) {
	const type = path === 'board' ? '게시판' : '분양';
	const titleText = query ? `${query}에 대한 검색 결과` : type;
	const router = useRouter();
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	function onClickNewPost() {
		if (!window.localStorage.getItem('accessToken')) {
			window.dispatchEvent(new Event('fadeLogin'));
			return;
		}

		if (path === 'board') {
			router.push('/board/new');
		} else {
			setModalType('setAdoptType');
			modalRef!.current!.style.display = 'flex';
		}
	}

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>{titleText}</h1>
			<Search currentPath={path} />
			<button onClick={onClickNewPost} className={styles.writeButton}>
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
