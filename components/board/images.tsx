import styles from '@/styles/components/board/images.module.scss';

export default function Images({image}: {image: ImageUploadResponse1[]}) {
	return (
		<ul className={styles.container}>
			{image.map((img: ImageUploadResponse1, index: number) => {
				return (
					<li key={index}>
						<img src={img.imageUrl} alt={`image ${img.imageNo}`} />
					</li>
				);
			})}
		</ul>
	);
}
