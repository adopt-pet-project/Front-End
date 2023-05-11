import styles from '@/styles/components/admin/manage/boardLine.module.scss';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';

function BoardUserLine({lineData}: {lineData: Boarduser}) {
	const {id, name, sanctions, joinDate, ip, state} = lineData;
	const [isModalWrap, setIsModalWrap] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);

	return (
		<li>
			<span>{id}</span>
			<span
				className={styles.userName}
				onClick={() => {
					setModalType('userInfo');
					if (isModalWrap && isModalWrap.current) {
						isModalWrap.current.style.display = 'flex';
					}
				}}
			>
				{name}
			</span>
			<span>{sanctions}</span>
			<span>{joinDate}</span>
			<span>
				{state ? (
					<>
						<span style={{color: 'lightgreen'}}>●</span>
						{ip}
					</>
				) : (
					<>
						<span style={{color: 'grey'}}>●</span>미접
					</>
				)}
			</span>
			<span
				onClick={() => {
					setModalType('adminBlock');
					if (isModalWrap && isModalWrap.current) {
						isModalWrap.current.style.display = 'flex';
					}
				}}
			>
				차단
			</span>
		</li>
	);
}

export default BoardUserLine;
