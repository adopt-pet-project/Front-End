import {useRouter} from 'next/router';
import styles from '@/styles/components/chat/header.module.scss';

export default function Header() {
	const router = useRouter();

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
			김성태
			<button type="submit" className={styles.writeButton}>
				나가기
			</button>
		</div>
	);
}
