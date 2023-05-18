import styles from '@/styles/components/header/alarmBox.module.scss';

function AlarmBox({
	setIsAlarmBoxOn,
}: {
	setIsAlarmBoxOn: (status: boolean) => void;
}) {
	return <div className={styles.box}>alarm</div>;
}

export default AlarmBox;
