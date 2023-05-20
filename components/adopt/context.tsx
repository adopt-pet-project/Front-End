import styles from '@/styles/components/adopt/context.module.scss';
import {AdoptContext} from '@/utils/@types/adopt';

export default function Context({context}: {context: AdoptContext}) {
	return (
		<div className={styles.container}>
			<div style={{minHeight: '200px'}}>
				{context.context.split('\n').map((line: string, index: number) => {
					return (
						<span key={index}>
							{line}
							<br />
						</span>
					);
				})}
			</div>
			<div className={styles.info}>
				<div>
					<span>관심 {context.bookmark}</span>
					{' · '}
					<span>연락 {context.chat}</span>
				</div>
				<span>수정 · 삭제</span>
			</div>
		</div>
	);
}
