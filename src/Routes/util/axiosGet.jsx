import AxiosConfig from '../../AxiosConfig';

const baseGetData = async (link) => {
  const res = await AxiosConfig.get(`${link}`).then(
    (result) => result.data.result
  );
  return res;
};

const getTop10 = () => baseGetData('/art/top10');
const getWeek10 = () => baseGetData(`/art/week10`)
const getTagList = () => baseGetData(`/art/tags`);
const getNewMedia = () => baseGetData(`art/new10`);
const getNewAuthor = () => baseGetData(`/author?p=1`);
const getSpotlightAuthor = () => baseGetData(`/author/top10`)
const getEditorPick = () => baseGetData(`/art/editorPick`);
const getTaggedArt = (page, selectedTag) =>
  baseGetData(`/art/tag?p=${page}&tag=${selectedTag}`);
const getSuggestedArt = () => baseGetData(`art/recommended`);
const getMediaArts = (page, orderBy) =>
  baseGetData(`/art?p=${page}&o=${orderBy}&s=desc`);
const getSearch = (detail, page, keyword) =>
  baseGetData(`/search?p=${page}&search=${keyword}&detail=${detail}`);
const getAuthors = (page) => baseGetData(`/author?p=${page}`);
const getSuggestedArtist = () => baseGetData(`/author/recommended`);
const getAuthorDetail = (id) => baseGetData(`/author/${id}`);
const getArtDetail = (id) => baseGetData(`/art/${id}`);
const getSimillarArt = (id) => baseGetData(`/art/similar/${id}`);
const getArtTag = (id) => baseGetData(`/art/${id}/tag`);
const getNoticeList = (page, search = '') =>
  baseGetData(`/contact/notice?p=${page}&search=${search}`);
const getMockup = (id) => baseGetData(`/user/art/${id}/mockup`);
const getArtMockup = (id) => baseGetData(`/art/${id}/mockup`);
const getAuthorByName = (page) => baseGetData(`author?p=${page}&orderBy=name`);

export {
  getTop10,
  getWeek10,
  getTagList,
  getNewMedia,
  getNewAuthor,
  getSpotlightAuthor,
  getEditorPick,
  getTaggedArt,
  getSuggestedArt,
  getMediaArts,
  getSearch,
  getAuthors,
  getAuthorDetail,
  getArtDetail,
  getArtTag,
  getSimillarArt,
  getNoticeList,
  getMockup,
  getArtMockup,
  getSuggestedArtist,
  getAuthorByName,
};
