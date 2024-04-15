import AxiosConfig from '../../../AxiosConfig';

const getDashBoardMonthlyData = async (month) => {
  try {
    const res = await AxiosConfig.get(`/user/statistics/month/${month}`);
  } catch (e) {
    console.log(e);
  }
  return res.data.result;
};

export default getDashBoardMonthlyData;
