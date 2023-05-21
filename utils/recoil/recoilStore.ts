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
	'adminBlock' | 'userInfo' | 'checkReport' | 'setAdoptType' | 'none'
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
	default: true,
});

export const AgaraChat = atom<(chatLogLocationData | chatLogStringData)[]>({
	key: `garaChat/${v1()}`,
	default: [
		{
			id: 0,
			type: 'text',
			chatContents: '강아지 사진좀 보여주실래요?',
			date: '2023. 5. 1 11:30',
			checked: true,
			isMy: false,
		},
		{
			id: 1,
			type: 'image',
			chatContents:
				'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
			date: '2023. 5. 2 11:20',
			checked: true,
			isMy: true,
		},
		{
			id: 2,
			type: 'text',
			chatContents:
				'댕댕이 진짜 너무 귀여워요 혹시 다른 사진 있으면 더 보내주세요 ㅠㅠ',
			date: '2023. 5. 3 12:23',
			checked: true,
			isMy: false,
		},
		{
			id: 3,
			type: 'text',
			chatContents: '왜 채팅을 안보세요...',
			date: '2023. 5. 6 16:30',
			checked: true,
			isMy: false,
		},
		{
			id: 4,
			type: 'location',
			chatContents: {x: '37.55467', y: '126.970609'},
			date: '2023. 5. 7 16:38',
			checked: true,
			isMy: true,
		},
		{
			id: 5,
			type: 'text',
			chatContents: '분양 받으시려면 여기로 오세욘',
			date: '2023. 5. 7 16:40',
			checked: false,
			isMy: true,
		},
	],
});

export default {};
