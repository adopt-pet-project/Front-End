import styles from '@/styles/components/board/context.module.scss';
import Images from './images';

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
			{context.image.length > 0 && <Images image={context.image}></Images>}
		</>
	);
}
