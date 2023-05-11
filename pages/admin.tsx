import Layout from '@/components/layout/layout';
import {ReactElement} from 'react';
import AdminCategory from '@/components/admin/adminCategory';
import AccordionBar from '@/components/admin/statistics/accordionBar';
import {AisStatistic, AmodalWrap} from '@/utils/recoil/recoilStore';
import {useRecoilState} from 'recoil';
import ManageBoard from '@/components/admin/manage/manageBoard';
import ModalWrap from '@/components/layout/modalWrap';

export default function Home(props: {str: string}) {
	const [isStatistic, setIsStatistic] = useRecoilState(AisStatistic);
	return (
		<>
			<AdminCategory />
			{isStatistic ? <ManageBoard /> : <AccordionBar />}
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
