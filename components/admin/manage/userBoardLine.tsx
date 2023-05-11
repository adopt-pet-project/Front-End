import styles from '@/styles/components/admin/admin.module.scss';
import {AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';

function BoardUserLine({lineData}: {lineData: Boarduser}) {
	const {id, name, sanctions, joinDate, ip, state} = lineData;
	const [isModalWrap, setIsModalWrap] = useRecoilState(AmodalWrap);
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
