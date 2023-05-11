import styles from '@/styles/components/admin/admin.module.scss';

function BoardReportLine({lineData}: {lineData: Boardreport}) {
	const {
		id,
		state,
		reporterId,
		reporter,
		targetId,
		target,
		content,
		reportDate,
	} = lineData;
	return (
		<li>
			<span>{state}</span>
			<span>{reporter}</span>
			<span>{target}</span>
			<span>{content}</span>
			<span>{reportDate}</span>
			<span>보기</span>
		</li>
	);
}

export default BoardReportLine;
