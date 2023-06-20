import {useRecoilState} from 'recoil';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/admin/manage/boardLine.module.scss';

function BlockBoardLine({lineData}: {lineData: Boardblock}) {
	const {id, state, userId, userName, times, blockDate, reason} = lineData;
	const [modalType, setModalType] = useRecoilState(AmodalType);
	const [isModalWrap, setIsModalWrap] = useRecoilState(AmodalWrap);
	return (
		<li>
			<span>{state}</span>
			<span
				onClick={() => {
					setModalType('userInfo');
					if (isModalWrap && isModalWrap.current) {
						isModalWrap.current.style.display = 'flex';
					}
				}}
				className={styles.userName}
			>
				{userName}
			</span>
			<span>{times}</span>
			<span>{blockDate}</span>
			<span>{reason}</span>
			<span>해제</span>
		</li>
	);
}

export default BlockBoardLine;
