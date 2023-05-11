import styles from '@/styles/components/admin/adminCategory.module.scss';
import {useRecoilState} from 'recoil';
import {AisStatistic} from '@/utils/recoil/recoilStore';
function AdminCategory() {
	// false 통계, true 관리
	const [isStatistic, setIsStatistic] = useRecoilState(AisStatistic);
	return (
		<>
			<div className={styles.adminCategory}>
				<span
					onClick={() => {
						setIsStatistic(false);
					}}
					className={`${styles.categoryBtn} ${
						isStatistic === true ? styles.currentBtn : null
					} drag-prevent`}
				>
					통계
				</span>
				<span
					onClick={() => {
						setIsStatistic(true);
					}}
					className={`${styles.categoryBtn} ${
						isStatistic === false ? styles.currentBtn : null
					} drag-prevent`}
				>
					관리
				</span>
				<hr
					className={`${styles.ctgBoundary} ${
						isStatistic === true ? styles.onRight : null
					} `}
				/>
			</div>
		</>
	);
}

export default AdminCategory;
