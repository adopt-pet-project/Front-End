import styles from '@/styles/components/admin/admin.module.scss';
import Slider from './slider';
import {useRecoilState} from 'recoil';
import {
	AisAdminModalOn,
	AisSelectTime,
	AselectedTime,
} from '@/utils/recoil/recoilStore';
function SelectTime({option}: {option: '차단' | '제한'}) {
	const [selectedTime, setSelectedTime] = useRecoilState(AselectedTime);
	const [_, setIsModal] = useRecoilState(AisAdminModalOn);
	const [isSelectTime, setIsSelectTime] = useRecoilState(AisSelectTime);
	return (
		<div
			onClick={e => {
				setIsSelectTime(false);
			}}
			className={styles.selectTimeWrap}
		>
			<div
				onClick={e => {
					e.stopPropagation();
				}}
				className={styles.selectTime}
			>
				기간을 선택하세요
				<Slider />
				{selectedTime !== '영구' ? selectedTime + '일' : selectedTime}{' '}
				{option == '차단' ? '접속차단' : '작성제한'}
				<div>
					<button
						className={styles.cancelBtn}
						onClick={() => {
							setIsSelectTime(false);
						}}
					>
						취소
					</button>
					<button
						className={styles.admitBtn}
						onClick={() => {
							setIsModal(false);
							setIsSelectTime(false);
						}}
					>
						적용
					</button>
				</div>
			</div>
		</div>
	);
}

export default SelectTime;
