import Layout from '@/components/layout.tsx/layout';
import {ReactElement} from 'react';
import AdminCategory from '@/components/admin/adminCategory';
import AccordionBar from '@/components/admin/statistics/accordionBar';
import {AisAdminModalOn, AisStatistic} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';
import ManageBoard from '@/components/admin/manage/manageBoard';
import ModalWrap from '@/components/admin/modal/modalWrap';

export default function Home(props: {str: string}) {
	const [isStatistic, setIsStatistic] = useRecoilState(AisStatistic);
	const [isModal, setIsModal] = useRecoilState(AisAdminModalOn);
	return (
		<>
			<AdminCategory />
			{isStatistic ? <ManageBoard /> : <AccordionBar />}
			{isModal ? <ModalWrap /> : null}
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
