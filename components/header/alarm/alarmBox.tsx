import {useEffect, useRef, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
	AalarmData,
	AalarmRefetch,
	AcheckedAlarmList,
	AisAlarmBoxOn,
} from '@/utils/recoil/recoilStore';
import CardListWrap from './cardListWrap';
import styles from '@/styles/components/header/alarm/alarmBox.module.scss';
import useFetch from '@/utils/hooks/useFetch';

function AlarmBox() {
	const alarmBoxRef = useRef<HTMLDivElement>(null);
	const accessToken = window.localStorage.getItem('accessToken');
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [alarmData, setAlarmData] = useRecoilState(AalarmData);
	const checkedAlarmList = useRecoilValue(AcheckedAlarmList);
	const [alarmRefetch, setAlarmRefetch] = useRecoilState(AalarmRefetch);

	const fetchDeleteAlarmData = useFetch(
		'/notification',
		'POST',
		true,
		() => {
			setAlarmRefetch(prev => (prev === 0 ? 1 : 0));
		},
		{idList: checkedAlarmList},
	);

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
		// 확인된 알림의 id를 가진 객체의 del을 true로 변경함

		checkedAlarmList.map(checkedListId => {
			setTimeout(() => {
				setAlarmData(prev => {
					//0.07초 주기로 리스트를 하나씩 del true함
					let result = [...prev];
					console.log('on this');
					result = prev.map((alarmData, i) => {
						if (alarmData.id === checkedListId) {
							return {...alarmData, del: true};
						}
						return alarmData;
					});

					return result;
				});
			}, delay);
			delay += 70;
		});

		setTimeout(() => {
			console.log('end');
			fetchDeleteAlarmData();
		}, checkedAlarmList.length * 70);
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
