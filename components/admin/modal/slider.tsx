import React, {useState} from 'react';
import styles from '@/styles/components/admin/modal/selectTime.module.scss';
import {useRecoilState} from 'recoil';
import {AselectedTime} from '@/utils/recoil/recoilStore';

function Slider() {
	const [ballPosition, setBallPosition] = useState<number>(0);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [selectedTime, setSelectedTime] = useRecoilState(AselectedTime);
	const array = ['1', '3', '7', '15', '30', '90', '180', '360', '영구'];
	return (
		<div
			onMouseDown={() => {
				setIsMouseDown(true);
			}}
			onMouseUp={() => {
				setIsMouseDown(false);
			}}
			className={styles.slider}
		>
			<div className={styles.bar}>
				<div className={styles.checkers}>
					{array.map((data, i) => (
						<div
							style={{left: `${i * 12.5}%`}}
							onMouseEnter={() => {
								isMouseDown ? setSelectedTime(data) : null;
							}}
							onMouseUp={() => {
								setBallPosition(i);
								setSelectedTime(data);
							}}
							onMouseDown={() => {
								setBallPosition(i);
								setSelectedTime(data);
							}}
							className={styles.checker}
						>
							{selectedTime === data ? <div></div> : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Slider;
