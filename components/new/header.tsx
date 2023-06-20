import {useRouter} from 'next/router';
import styles from '@/styles/components/new/header.module.scss';
import {BaseSyntheticEvent} from 'react';

export default function Header({
	type,
	preventClick,
}: {
	type: string;
	preventClick: boolean;
}) {
	const router = useRouter();

	function onClickSubmit(e: BaseSyntheticEvent) {
		if (preventClick) {
			e.preventDefault();
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
