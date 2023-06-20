import {useRecoilState} from 'recoil';
import {AmodalWrap, AmodalType, AletterTarget} from '../recoil/recoilStore';

export default function useLetter() {
	const [modalRef, setModalRef] = useRecoilState(AmodalWrap);
	const [modalType, setModalType] = useRecoilState(AmodalType);
	const [letterTarget, setLetterTarget] = useRecoilState(AletterTarget);

	function fadeLetterModal(target: LetterTarget) {
		setLetterTarget(target);
		setModalType('LetterModal');
		modalRef!.current!.style.display = 'flex';
	}

	return fadeLetterModal;
}
