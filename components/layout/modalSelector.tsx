import AdminBlock from '../admin/modal/adminBlock';
import CheckReport from '../admin/modal/checkReport';
import UserInfo from '../admin/modal/userInfo';
import SetAdoptType from '../adopt/setAdoptType';
import DeleteModal from '../deleteModal';

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
		case 'deleteModal':
			return <DeleteModal />;
		default:
			return <></>;
	}
}
