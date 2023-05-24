import styles from '@/styles/components/adopt/inquiry.module.scss';

export default function Inquiry({chat, mine}: {chat: number; mine: boolean}) {
	return (
		<div className={styles.container}>
			{mine ? (
				<div
					style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}
				>
					<button>받은 문의 {chat}</button>
				</div>
			) : (
				<>
					<button>관심목록에 추가</button>
					<button>문의하기</button>
				</>
			)}
		</div>
	);
}
