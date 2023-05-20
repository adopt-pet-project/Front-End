import styles from '@/styles/components/adopt/metadata.module.scss';

export default function Metadata({metadata}: {metadata: AdoptMetadata}) {
	return (
		<ul className={styles.container}>
			<li>
				<span className={styles.dataName}>이름</span>
				<span>{metadata.name}</span>
			</li>
			<li>
				<span className={styles.dataName}>성별</span>
				<span>{metadata.gender}</span>
			</li>
			<li>
				<span className={styles.dataName}>나이</span>
				<span>{metadata.age}</span>
			</li>
			<li>
				<span className={styles.dataName}>품종</span>
				<span>{metadata.species}</span>
			</li>
		</ul>
	);
}
