import {useRouter} from 'next/router';
import styles from '@/styles/components/new/header.module.scss';
import {BaseSyntheticEvent, useState} from 'react';

export default function Header({type}: {type: string}) {
	const router = useRouter();
	const [isClicked, setIsClick] = useState<boolean>(false);

	function onClickSubmit(e: BaseSyntheticEvent) {
		if (isClicked) {
			e.preventDefault();
		} else {
			setIsClick(true);
		}
	}

	return (
		<div className={styles.container}>
			<img
				className={styles.goBack}
				src="/icon/left.svg"
				alt="go back icon"
				onClick={() => {
					router.back();
				}}
			/>
			새 {type} 작성
			<button
				type="submit"
				onClick={onClickSubmit}
				className={styles.writeButton}
			>
				작성
			</button>
		</div>
	);
}
