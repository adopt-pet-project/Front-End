import styles from '@/styles/components/adopt/inquiry.module.scss';

export default function Inquiry({mine}: {mine: boolean}) {
	return (
		<div className={styles.container}>
			<button>관심목록에 추가</button>
			<button>문의하기</button>
		</div>
	);
}
