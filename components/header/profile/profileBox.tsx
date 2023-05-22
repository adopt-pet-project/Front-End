import {useRecoilState} from 'recoil';
import {useEffect, useRef} from 'react';
import {AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import ProfileNav from './profileNav';
import styles from '@/styles/components/header/profile/profileBox.module.scss';

function ProfileBox() {
	const profileBoxRef = useRef<HTMLDivElement>(null);

	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	function findHaveParent(
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement {
		if (node === target) {
			return true;
		} else {
			if (node === null) {
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	}
	const handleCloseProfile = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			findHaveParent(
				e.target as HTMLElement,
				profileBoxRef.current as HTMLElement,
			) ||
			(target.classList[0]?.includes('profileLoginTrue_profile') &&
				target.classList[0] !== undefined)
		) {
		} else setIsProfileBoxOn(false);
	};

	useEffect(() => {
		window.addEventListener<any>('click', handleCloseProfile);

		return () => {
			window.removeEventListener<any>('click', handleCloseProfile);
		};
	}, []);

	return (
		<div ref={profileBoxRef} className={styles.box}>
			<div className={styles.boxHeader}>
				<div className={styles.backWrap}>
					<img
						className={styles.closeBtn}
						src="/icon/left.svg"
						onClick={() => {
							setIsProfileBoxOn(false);
						}}
						width={36}
						height={36}
						alt=""
					/>
					<span>프로필</span>
				</div>
			</div>

			<ProfileNav />
		</div>
	);
}

export default ProfileBox;
