import UserBoard from './userBoard';
import ReportBoard from './reportBoard';
import BlockBoard from './blockBoard';
import IpBlockBoard from './ipBlockBoard';
import TableCtg from './tableCtg';
import {useRecoilState} from 'recoil';
import {AcurrentTable} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/admin/manage/manageBoard.module.scss';
function ManageBoard() {
	const [currentTable, setCurrentTable] = useRecoilState(AcurrentTable);
	return (
		<section className="body">
			<div className={styles.boardWrap}>
				<TableCtg />
				{currentTable === 'user' ? (
					<UserBoard />
				) : currentTable === 'report' ? (
					<ReportBoard />
				) : currentTable === 'block' ? (
					<BlockBoard />
				) : currentTable === 'IP-block' ? (
					<IpBlockBoard />
				) : null}
			</div>
		</section>
	);
}

export default ManageBoard;
