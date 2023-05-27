interface RegisterInfo {
	email: string;
	provider: string;
}

interface Register {
	email: string;
	provider: string;
	nickname: string;
	address: string;
	imgNo?: string;
	imgUrl?: string;
}

interface Userinfo {
	id: number;
	profile: string;
	name: string;
	location: string;
	activity: {
		document: number;
		comment: number;
		sanction: number;
	};
}
