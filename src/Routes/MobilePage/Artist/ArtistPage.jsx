import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import px2vwMobile from '../../util/px2vwMobile';
import MobileHeader from '../components/MobileHeader';
import { Title } from '../components/Title';
import MobileFooter from '../components/MobileFooter';
import { useQuery } from 'react-query';
import { getAuthors } from '../../util/axiosGet';
import ArtistEl from '../components/ArtistEl';
import px2vhMobile from '../../util/px2vhMobile';
import KaKaoBtn from '../../Components/KaKaoBtn';

const Div = styled.div`
  > div {
    padding: 0 ${px2vwMobile(40)};
    > ul {
      margin-top: ${px2vhMobile(60)};
      min-height: 100vh;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 48px;
      gap: ${px2vwMobile(40)};
    }
  }
  .hidden {
    padding: 0;
    margin: 0;
    width: 1px;
    height: 1px;
  }
`;

const El = styled.li`
  width: ${px2vwMobile(138)};
  > div {
    > img {
      width: ${px2vwMobile(138)};
      height: ${px2vwMobile(138)};
      border-radius: 100%;
      object-fit: cover;
    }
    > p {
      font: 500 16px ${({ theme }) => theme.noto};
      color: #151515;
      text-align: center;
      word-break: keep-all;
    }
  }
`;

const ArtistPage = () => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(1);
  const [toNext, setToNext] = useState(false);
  const hiddenRef = useRef(null);
  const winHeight = window.innerHeight;
  const { data, isLoading, isFetched } = useQuery(['authorList', page], () =>
    getAuthors(page)
  );

  const handleScroll = () => {
    setPage((prev) =>
      prev < Math.round(window.scrollY / winHeight)
        ? Math.round(window.scrollY / winHeight)
        : prev
    );
  };
  const scrollHandle = async () => {
    if (window.pageYOffset + winHeight >= hiddenRef.current.offsetTop) {
      setToNext(true);
    } else {
      setToNext(false);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', scrollHandle);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', scrollHandle);
    };
  }, []);
  useEffect(() => {
    if (toNext) {
      setPage((prev) => {
        console.log('page' + prev);
        return prev < total ? prev + 1 : prev;
      });
    }
  }, [toNext]);
  useEffect(() => {
    if (isFetched) {
      const tempList = list;
      setTotal(data.totalPage);
      if (data.author.length > 0) {
        if (tempList.some((v) => v.id === data.author[0].id)) {
          setList([...tempList]);
          console.log('exist');
        } else {
          setList([...tempList, ...data.author]);
          console.log(list);
          console.log('notexist');
        }
      }
    }
  }, [data, isFetched, page]);

  return (
    <>
      <Div>
        <MobileHeader />
        {/* <KaKaoBtn mobile={true} /> */}
        <div>
          <ul>
            {list.map((v) => (
              <li key={v.id}>
                <ArtistEl
                  id={v.id}
                  author={v.authorName}
                  thumbnail={v.profileImgPath}
                />
              </li>
            ))}
            <div className="hidden" ref={hiddenRef} />
          </ul>
        </div>
        <MobileFooter toTop />
      </Div>
    </>
  );
};

export default ArtistPage;
