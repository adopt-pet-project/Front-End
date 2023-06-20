import {useRecoilState} from 'recoil';
import {
	AisSelectTime,
	AmodalWrap,
	AselectedTime,
} from '@/utils/recoil/recoilStore';
import Slider from './slider';
import styles from '@/styles/components/admin/modal/selectTime.module.scss';
function SelectTime({option}: {option: '차단' | '제한'}) {
	const [selectedTime, setSelectedTime] = useRecoilState(AselectedTime);
	const [isSelectTime, setIsSelectTime] = useRecoilState(AisSelectTime);
	const [isModalWrap, setIsModalWrap] = useRecoilState(AmodalWrap);

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
						onClick={e => {
							e.preventDefault();
							setIsSelectTime(false);
						}}
					>
						취소
					</button>
					<button
						className={styles.admitBtn}
						onClick={() => {
							if (isModalWrap && isModalWrap.current) {
								isModalWrap.current.style.display = 'none';
							}
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
