import { useSetRecoilState } from 'recoil';
import { errorState } from './recoilState';

const setError = (errorMessage) => {
  const setError = useSetRecoilState(errorState);
  setError({ errorMessage: errorMessage, popup: true });
};

export default setError;
