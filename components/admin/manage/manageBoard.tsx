import UserBoard from './userBoard';
import ReportBoard from './reportBoard';
import BlockBoard from './blockBoard';
import IpBlockBoard from './ipBlockBoard';
import TableCtg from './tableCtg';
import {useRecoilState} from 'recoil';
import {AcurrentTable} from '@/utils/recoil/recoilStore';
function ManageBoard() {
	const [currentTable, setCurrentTable] = useRecoilState(AcurrentTable);
	return (
		<>
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
		</>
	);
}

export default ManageBoard;
