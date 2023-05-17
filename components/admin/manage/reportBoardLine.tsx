import styles from '@/styles/components/admin/manage/boardLine.module.scss';
import {AmodalType, AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';

function BoardReportLine({lineData}: {lineData: Boardreport}) {
	const {
		id,
		state,
		reporterId,
		reporter,
		targetId,
		target,
		summary,
		reportDate,
	} = lineData;

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
				{reporter}
			</span>
			<span
				onClick={() => {
					setModalType('userInfo');
					if (isModalWrap && isModalWrap.current) {
						isModalWrap.current.style.display = 'flex';
					}
				}}
				className={styles.userName}
			>
				{target}
			</span>
			<span>{summary}</span>
			<span>{reportDate}</span>
			<span
				onClick={() => {
					setModalType('checkReport');
					if (isModalWrap && isModalWrap.current) {
						isModalWrap.current.style.display = 'flex';
					}
				}}
			>
				보기
			</span>
		</li>
	);
}

export default BoardReportLine;
