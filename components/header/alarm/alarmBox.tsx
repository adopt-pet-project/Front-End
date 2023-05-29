import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {AalarmData, AisAlarmBoxOn} from '@/utils/recoil/recoilStore';
import CardListWrap from './cardListWrap';
import styles from '@/styles/components/header/alarm/alarmBox.module.scss';

function AlarmBox() {
	const alarmBoxRef = useRef<HTMLDivElement>(null);
	const accessToken = window.localStorage.getItem('accessToken');
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useRecoilState(AalarmData);
	const findHaveParent = (
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement => {
		if (node === target) {
			return true;
		} else {
			if (node === null) {
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	};
	const handleCloseAlarm = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			findHaveParent(
				e.target as HTMLElement,
				alarmBoxRef.current as HTMLElement,
			) ||
			(target.classList[0]?.includes('profileLoginTrue_imgWrap') &&
				target.classList[0] !== undefined)
		) {
		} else setIsAlarmBoxOn(false);
	};

	function deleteCheckedAlarm() {
		let delay = 0;
		alarmData.map((data, i) => {
			delay += 70;
			if (data && data.checked) {
				setTimeout(() => {
					setAlarmData(prev => {
						let result = [...prev];
						result[i] = {...prev[i]};
						result[i].del = true;

						return result;
					});
					if (i === alarmData.length - 1) {
						let delList: any = [];

						setTimeout(() => {
							setAlarmData(prev =>
								prev.filter(datas => {
									if (datas.del) {
										delList.push(datas.id);
									}
									return !datas.del;
								}),
							);
							deleteCheckedAlarmAPI(delList);
						}, 100);
					}
				}, delay);
			}
		});
	}

	async function deleteCheckedAlarmAPI(delList: any) {
		let URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/notification`;
		fetch(`${URL}`, {
			method: 'POST',
			headers: {
				Authorization: `${accessToken}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				idList: delList,
			}),
		});
	}

	useEffect(() => {
		window.addEventListener<any>('click', handleCloseAlarm);

		return () => {
			window.removeEventListener<any>('click', handleCloseAlarm);
		};
	}, []);

	return (
		<div ref={alarmBoxRef} className={styles.box}>
			<div className={styles.boxHeader}>
				<div className={styles.backWrap}>
					<img
						className={styles.closeBtn}
						src="/icon/left.svg"
						onClick={() => {
							setIsAlarmBoxOn(false);
						}}
						width={36}
						height={36}
						alt=""
					/>
					<span>알람</span>
				</div>
				<div
					onClick={() => {
						deleteCheckedAlarm();
					}}
					className={styles.delRead}
				>
					읽은 알람 삭제
				</div>
			</div>
			<div className={styles.innerWrap}>
				<CardListWrap alarmData={alarmData} />
			</div>
		</div>
	);
}

export default AlarmBox;
