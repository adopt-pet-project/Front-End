import styles from '@/styles/components/myPage/header.module.scss';

export default function Header({type}: {type: string}) {
	return (
		<div className={styles.container}>
			<img
				className={styles.goBack}
				src="/icon/left.svg"
				alt="go back icon"
				onClick={() => {
					window.history.back();
				}}
			/>
			{type}
		</div>
	);
}
