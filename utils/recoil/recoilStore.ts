import {atom} from 'recoil';
import {v1} from 'uuid';

export const Aexample = atom<string>({
	key: `example/${v1}`,
	default: 'test',
});

export default Aexample;
