interface RegisterInfo {
	email: string;
	provider: string;
}

interface Register {
	email: string;
	provider: string;
	nickname: string;
	address: string;
	profile?: string;
}

interface userInfo {
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
