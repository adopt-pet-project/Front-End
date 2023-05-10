import styles from '@/styles/components/admin/admin.module.scss';
import {AisAdminModalOn} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';

function BoardUserLine({lineData}: {lineData: Boarduser}) {
	const {id, name, sanctions, joinDate, ip, state} = lineData;
	const [isModal, setIsModal] = useRecoilState(AisAdminModalOn);
	return (
		<li className={styles.userList}>
			<span>{id}</span>
			<span>{name}</span>
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
					setIsModal(true);
				}}
			>
				차단
			</span>
		</li>
	);
}

export default BoardUserLine;
