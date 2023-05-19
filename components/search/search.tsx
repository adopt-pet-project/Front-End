import {useRef} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/components/search/search.module.scss';

export default function Search({currentPath}: {currentPath: string}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	function activate() {
		if (!containerRef.current?.dataset.active) {
			(containerRef.current as HTMLElement).setAttribute(
				'data-active',
				'active',
			);
			inputRef.current?.focus();
		}
	}

	function deActivate() {
		setTimeout(() => {
			if (containerRef.current)
				(containerRef.current as HTMLElement).removeAttribute('data-active');
		}, 0);
	}

	function clickSearch() {
		if (containerRef.current?.dataset.active) {
			search();
		}
	}

	function enterSearch(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			search();
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
		<div className={styles.container} ref={containerRef} onClick={activate}>
			<img
				src="icon/search.svg"
				width={32}
				height={32}
				alt="search"
				onClick={clickSearch}
			/>
			<input
				type="text"
				placeholder="검색할 내용을 입력하세요."
				ref={inputRef}
				// onBlur={() => {
				// 	if (containerRef.current?.getAttribute('data-active'))
				// 		setTimeout(() => {
				// 			deActivate();
				// 		}, 250);
				// }}
				onKeyUp={enterSearch}
			/>
			<span>test</span>
		</div>
	);
}
