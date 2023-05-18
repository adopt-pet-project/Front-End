import AdminBlock from '../admin/modal/adminBlock';
import CheckReport from '../admin/modal/checkReport';
import UserInfo from '../admin/modal/userInfo';
import SetAdoptType from '../adopt/setAdoptType';

export default function ModalSelector({modalType}: {modalType: string}) {
	switch (modalType) {
		case 'adminBlock':
			return <AdminBlock />;
		case 'userInfo':
			return <UserInfo />;
		case 'checkReport':
			return <CheckReport />;
		case 'setAdoptType':
			return <SetAdoptType />;
		default:
			return <></>;
	}
}
