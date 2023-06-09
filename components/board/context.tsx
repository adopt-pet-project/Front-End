import Images from './images';
import styles from '@/styles/components/board/context.module.scss';

export default function Context({context}: {context: any}) {
	return (
		<>
			<div className={styles.container}>
				{context.context.split('\n').map((line: string, index: number) => {
					return (
						<span key={index}>
							{line}
							<br />
						</span>
					);
				})}
			</div>
			{context.imageList.length > 0 && (
				<Images image={context.imageList}></Images>
			)}
		</>
	);
}
