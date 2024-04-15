import { useQuery } from 'react-query';
import { atom, selector } from 'recoil';
import { getTagList } from './axiosGet';

const loginState = atom({
  key: 'loginState',
  default: 'waiting',
});

const userBaseInfoState = atom({
  key: 'userBaseInfo',
  default: '',
});
const userInfo = atom({
  key: 'userInfo',
  default: {},
});
const errorState = atom({
  key: 'errorPopup',
  default: {
    errorMessage: '',
    popup: false,
  },
});

const editorPick = atom({
  key: 'editorPick',
  default: [],
});

const tagList = atom({
  key: 'tagList',
  default: [],
});
// const genreTag = atom({
//   key: 'genreTag',
//   default: [],
// });
// const moodTag = atom({
//   key: 'moodTag',
//   default: [],
// });

// const tagList = selector({
//   key: 'tagList',
//   get: async () => {
//     const { data, status } = useQuery('tagList', getTagList, []);
//     if (status === 'success') {
//       return data;
//     }
//   },
//   default: [],
// });

const tagCategory = selector({
  key: 'tagCategory',
  get: ({ get }) => {
    const tags = get(tagList);
    if (tags) {
      const genreTags = tags.genre;
      const moodTags = tags.mood;
      return { genreTags, moodTags };
    }
  },
});

const resList = atom({
  key: 'resList',
  default: [],
});

const tagSearch = atom({
  key: 'tagSearch',
  default: [],
});

const tagSearchPage = atom({
  key: 'tagSearchPage',
  default: 1,
});

const setLogout = selector({
  key: 'logout',
  get: ({ get }) => {
    const login = get(loginState);
  },
});

export {
  loginState,
  userBaseInfoState,
  errorState,
  editorPick,
  tagList,
  userInfo,
  resList,
  // moodTag,
  // genreTag,
  tagCategory,
  tagSearch,
  tagSearchPage,
};
