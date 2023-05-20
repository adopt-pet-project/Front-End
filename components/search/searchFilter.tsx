import {
	BaseSyntheticEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from '@/styles/components/search/searchFilter.module.scss';

export default function SearchFilter({
	currentPath,
	currentFilter,
	setCurrentFilter,
}: {
	currentPath: string;
	currentFilter: number;
	setCurrentFilter: Dispatch<SetStateAction<number>>;
}) {
	const [isActive, setIsActive] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	let option: string[] =
		currentPath === 'board'
			? ['제목', '내용', '제목 + 내용']
			: ['제목', '내용', '제목 + 내용', '품종'];

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

	function toggleOption() {
		setIsActive(!isActive);
	}

	function setFilter(e: BaseSyntheticEvent) {
		setCurrentFilter(e.target.getAttribute('data-filter'));
	}

	return (
		<div className={styles.container} ref={containerRef} onClick={toggleOption}>
			<span>{option[currentFilter]}</span>
			<ul
				className={`${styles.optionList} ${isActive ? '' : styles.hidden}`}
				data-filter={currentFilter}
				onClick={setFilter}
			>
				{option.map((opt: string, index: number) => {
					return (
						<li key={opt} data-filter={index}>
							{opt}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
