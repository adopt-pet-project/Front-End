import styles from '@/styles/components/board/images.module.scss';

export default function Images({image}: {image: string[]}) {
	return (
		<ul className={styles.container}>
			{image.map((src: string, index: number) => {
				return (
					<li key={index}>
						<img src={src} alt={`post picture ${index}`} />
					</li>
				);
			})}
		</ul>
	);
}
