import { useRef, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMediaArts } from '../../util/axiosGet';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import { MediaArtStyle } from '../components/MediaArtStyle';
import MediaEl from '../components/MediaEl';
import MobileFooter from '../components/MobileFooter';
import MobileHeader from '../components/MobileHeader';
import { Title } from '../components/Title';
import KaKaoBtn from '../../Components/KaKaoBtn';

const Div = styled.div`
  > div {
    padding: 0 ${px2vwMobile(40)};
    margin-top: ${px2vhMobile(60)};
    margin-bottom: ${px2vwMobile(225)};
    > ul {
      min-height: 100vh;
      display: flex;
      gap: ${px2vwMobile(40)};
      flex-wrap: wrap;
    }
  }
  .hidden {
    padding: 0;
    margin: 0;
    width: 100px;
    height: 1px;
  }
`;

const MediaArtPage = () => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(1);
  const [toNext, setToNext] = useState(false);
  const ulRef = useRef(null);
  const hiddenRef = useRef(null);
  const winHeight = window.innerHeight;
  const { data, isLoading, isFetched } = useQuery(['mediaList', page], () =>
    getMediaArts(page, 'top')
  );
  // const handleScroll = () => {
  //   setPage((prev) =>
  //     prev < Math.round((window.scrollY - 60) / winHeight + 1)
  //       ? prev < totalPage
  //         ? Math.round((window.scrollY - 60) / winHeight + 1)
  //         : totalPage
  //       : prev
  //   );
  // };
  

  const scrollHandle = async () => {
    if (window.pageYOffset + winHeight >= hiddenRef.current.offsetTop) {
      setToNext(true);
    } else {
      setToNext(false);
    }
  };
  useEffect(() => {
    if (toNext) {
      setPage((prev) => {
        console.log('page' + prev);
        return prev < total ? prev + 1 : prev;
      });
    }
  }, [toNext]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, []);

  useEffect(() => {
    if (isFetched) {
      const tempList = list;
      setTotal(data.totalPage);
      if (data.data.length > 0) {
        if (tempList.some((v) => v.id === data.data[0].id)) {
          setList([...tempList]);
          console.log('exist');
        } else {
          setList([...tempList, ...data.data]);
          console.log(list);
          console.log('notexist');
        }
      }
    }
  }, [data, isFetched, page]);

  const setTotalPage = (data) => {
    return data.totalPage;
  };

  return (
    <Div>
      <MobileHeader />
      {/* <KaKaoBtn mobile={true}/> */}
      <div>
        <ul ref={ulRef}>
          {Array.isArray(list)
            ? list.map((v) => (
                <li key={v.id}>
                  <MediaEl
                    id={v.id}
                    title={v.title}
                    thumbnail={v.thumbnailPath}
                    author={v.author.authorName}
                    profile={v.author.profileImgPath}
                  />
                </li>
              ))
            : null}
          <li className="hidden" ref={hiddenRef} />
        </ul>
      </div>
      <MobileFooter toTop={true} />
    </Div>
  );
};

export default MediaArtPage;
