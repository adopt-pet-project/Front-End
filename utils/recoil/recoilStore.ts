import {atom} from 'recoil';
import {v1} from 'uuid';

export const AisStatistic = atom<boolean>({
	key: `adminCtg/${v1()}`,
	default: false,
});

export const AisComment = atom<boolean>({
	key: `activityCtg/${v1()}`,
	default: false,
});

export const AselectedTime = atom<string>({
	key: `selectedTime/${v1()}`,
	default: '1',
});

export const AisSelectTime = atom<boolean>({
	key: `selectModal/${v1()}`,
	default: false,
});

export const AmodalWrap = atom<React.RefObject<HTMLDivElement> | null>({
	key: `modalWrap/${v1()}`,
	default: null,
});

export const AmodalType = atom<
	| 'adminBlock'
	| 'userInfo'
	| 'checkReport'
	| 'setAdoptType'
	| 'deleteModal'
	| 'none'
>({
	key: `modalType/${v1()}`,
	default: 'none',
});

export const AcurrentTable = atom<'user' | 'report' | 'block' | 'IP-block'>({
	key: `adminTable/${v1()}`,
	default: 'user',
});

export const AmyAdoptBoardType = atom<
	'adopting' | 'reserved' | 'end' | 'interested'
>({
	key: `myAdoptBoardType/${v1()}`,
	default: 'adopting',
});

export const AgetAdoptBoardType = atom<'reserved' | 'end'>({
	key: `getAdoptBoardType/${v1()}`,
	default: 'reserved',
});

export const AmyAdoptModal = atom({
	key: `myAdoptModal/${v1()}`,
	default: {
		modalID: 0,
		type: 'adopting',
		isOn: false,
		x: 0,
		y: 0,
	},
});

export const AisProfileBoxOn = atom({
	key: `profileBox/${v1()}`,
	default: false,
});

export const AisAlarmBoxOn = atom({
	key: `alarmBox/${v1()}`,
	default: false,
});

export const AalarmboxCtg = atom<0 | 1 | 2>({
	key: `alarmboxCtg/${v1()}`,
	default: 0,
});

export const AnoteLog = atom({
	key: `alarmboxCtg/${v1()}`,
	default: {id: 2, on: false, name: ''},
});

export const AwriteNote = atom({
	key: `writeNote/${v1()}`,
	default: false,
});

export const AisLogin = atom({
	key: `login/${v1()}`,
	default: false,
});

export const AcurrentMyPageCtg = atom<0 | 1 | 2>({
	key: `myPageCtg/${v1()}`,
	default: 0,
});

export const AuserInfo = atom<Userinfo>({
	key: `userInfo/${v1()}`,
	default: {
		id: 0,
		profile: '',
		name: '',
		location: '',
		activity: {
			document: 0,
			comment: 0,
			sanction: 0,
		},
	},
});

export const AalarmData = atom<(Alarmdata | Alarmdataname)[]>({
	key: `alarmData/${v1()}`,
	default: [],
});

export const ArefetchAdoptList = atom<0 | 1>({
	key: `refetch/${v1()}`,
	default: 0,
});
export default {};
