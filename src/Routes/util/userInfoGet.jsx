import AxiosConfig from '../../AxiosConfig';

const baseGetData = async (link) => {
  const res = await AxiosConfig.get(`${link}`).then(
    (result) => result.data.result
  );
  return res;
};
const getAccInfo = () => baseGetData(`/account/user`);
const getRequest = () => baseGetData(`/user/checkRequest`);
const getUserInfo = () => baseGetData(`/user/info`);
const getPayedInfo = () => baseGetData(`/user/refund`);
const getUserArt = () => baseGetData(`/user/art`);
const getMediaArtDetail = (id) => baseGetData(`/user/art/${id}`);
const getArtRes = (id) => baseGetData(`/user/art/${id}/resolution`);
const getResList = () => baseGetData('/art/resolutions');
const getCropList = () => baseGetData(`/user/art/crop`);
const getArtResReq = (id) =>
  baseGetData(`/user/art/crop/resolution/request/${id}`);
const getAskList = () => baseGetData(`/contact/inquiry`);
const getSettlementDate = () => baseGetData(`/user/settlement`);
const getSettlement = (date) => baseGetData(`/user/settlement/${date}`);
export {
  getAccInfo,
  getRequest,
  getUserInfo,
  getPayedInfo,
  getUserArt,
  getMediaArtDetail,
  getArtRes,
  getResList,
  getArtResReq,
  getCropList,
  getAskList,
  getSettlement,
  getSettlementDate,
};
