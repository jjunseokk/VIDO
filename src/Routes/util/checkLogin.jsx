import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { loginState, userBaseInfoState } from './recoilState';
import { getAccInfo } from './userInfoGet';

const checkLogin = (enabled = true) => {
  const setLoggedIn = useSetRecoilState(loginState);
  const setInfo = useSetRecoilState(userBaseInfoState);

  const { data, status } = useQuery('loginCheck', getAccInfo, {
    enabled: enabled,
  });
  if (status === 'success') {
    setLoggedIn(true);
    setInfo(data);
  } else {
    setLoggedIn(false);
  }
};
export default checkLogin;
