declare global {
	interface Boarduser {
		id: number;
		name: string;
		sanctions: number;
		joinDate: string;
		ip: string;
		state: boolean;
	}

	interface Boardreport {
		id: number;
		state: '미확인' | '반려' | '처리완료';
		contentId: number;
		reporterId: number;
		reporter: string;
		targetId: number;
		target: string;
		summary: string;
		reportDate: string;
	}

	interface Boardblock {
		id: number;
		state: string;
		userId: number;
		userName: string;
		times: number;
		blockDate: string;
		reason: string;
	}

	interface Boardipblock {
		ipAddress: string;
		blockDate: string;
	}
}

export default {};
