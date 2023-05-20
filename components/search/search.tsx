import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/search/search.module.scss';
import useDepsOnlyEffect from '@/utils/hooks/useDepsOnlyEffect';
import SearchFilter from './searchFilter';

export default function Search({currentPath}: {currentPath: string}) {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [currentFilter, setCurrentFilter] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as HTMLElement)
			)
				setIsActive(false);
		}
		window.addEventListener('click', onClickOutside);

		return () => {
			window.removeEventListener('click', onClickOutside);
		};
	}, []);

	useDepsOnlyEffect(() => {
		if (isActive) {
			containerRef.current?.setAttribute('data-active', 'active');
			inputRef.current?.focus();
		} else {
			containerRef.current?.removeAttribute('data-active');
			if (inputRef.current) inputRef.current.value = '';
		}
	}, [isActive]);

	function enterSearch(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			search();
			setIsActive(!isActive);
		}
	}

	function search() {
		if (inputRef.current?.value !== '') {
			router.push(`/${currentPath}?q=${inputRef.current?.value}`);
			if (inputRef.current) inputRef.current.value = '';
			inputRef.current?.blur();
		}
	}

	return (
		<div className={styles.container} ref={containerRef}>
			<img
				src="icon/search.svg"
				width={32}
				height={32}
				alt="search"
				onClick={() => {
					search();
					setIsActive(!isActive);
				}}
			/>
			<input
				type="text"
				placeholder="검색할 내용을 입력하세요."
				ref={inputRef}
				onKeyUp={enterSearch}
			/>
			<SearchFilter
				currentFilter={currentFilter}
				setCurrentFilter={setCurrentFilter}
				currentPath={currentPath}
			/>
		</div>
	);
}
