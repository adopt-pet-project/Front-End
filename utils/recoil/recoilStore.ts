import {atom} from 'recoil';
import {v1} from 'uuid';

export const AisStatistic = atom<boolean>({
	key: `adminCtg/${v1}`,
	default: false,
});

export const AisAdminModalOn = atom<boolean>({
	key: `adminModal/${v1}`,
	default: false,
});

export const AselectedTime = atom<string>({
	key: `selectedTime/${v1}`,
	default: '1',
});

export const AisSelectTime = atom<boolean>({
	key: `selectModal/${v1}`,
	default: false,
});
export default {};
