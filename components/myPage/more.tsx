import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {AmyAdoptModal} from '@/utils/recoil/recoilStore';
import styles from '@/styles/components/myPage/more.module.scss';

function More({type, mID}: {type: string; mID: number}) {
	const [myAdoptModal, setMyAdoptModal] = useRecoilState(AmyAdoptModal);

	useEffect(() => {
		window.addEventListener('click', handleCloseModal);
		return () => {
			window.removeEventListener('click', handleCloseModal);
		};
	}, []);

	function handleCloseModal(e: any) {
		setMyAdoptModal({
			modalID: mID,
			type: 'myAdopt',
			isOn: false,
			x: e.clientX - 215 - 280,
			y: e.clientY - 40,
		});
	}

	return (
		<>
			<div>
				<span
					className={styles.moreBtn}
					onClick={e => {
						e.stopPropagation();
						window.innerWidth > 1024
							? setMyAdoptModal(prev =>
									prev.isOn && mID === prev.modalID
										? {
												modalID: mID,
												type: type,
												isOn: false,
												x: e.clientX - 215 - 280,
												y: e.clientY - 40,
										  }
										: {
												modalID: mID,
												type: type,
												isOn: true,
												x: e.clientX - 215 - 280,
												y: e.clientY - 40,
										  },
							  )
							: setMyAdoptModal(prev =>
									prev.isOn
										? {
												modalID: mID,
												type: type,
												isOn: false,
												x: e.clientX - 215,
												y: e.clientY - 40,
										  }
										: {
												modalID: mID,
												type: type,
												isOn: true,
												x: e.clientX - 215,
												y: e.clientY - 40,
										  },
							  );
					}}
				>
					<img width={20} src="/icon/more.svg" alt="" />
				</span>
			</div>
		</>
	);
}

export default More;
