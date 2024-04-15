import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMediaArts } from '../../../util/axiosGet';
import px2vhMobile from '../../../util/px2vhMobile';
import px2vwMobile from '../../../util/px2vwMobile';
import { MediaArtStyle } from '../../components/MediaArtStyle';
import MediaEl from '../../components/MediaEl';
import { Title } from '../../components/Title';

const Div = styled.div`
  position: relative;
  padding: 0 ${px2vwMobile(40)};
  width: 100vw;
  margin-bottom: ${px2vhMobile(160)};
  > .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${px2vhMobile(48)};
    > button {
      color: #707070;
      font: 400 14px ${({ theme }) => theme.noto};
      letter-spacing: -0.35;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: ${px2vwMobile(40)};
    padding-bottom: 32px;
  }
`;

const MediaArt = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['medialist', 1], () =>
    getMediaArts(1, 'createdDatetime')
  );
  return (
    <Div>
      <div className="head">
        <Title>미디어아트</Title>
        <button onClick={() => navigate('/media-art')}>전체보기</button>
      </div>
      <ul>
        {data
          ? Array.isArray(data.data)
            ? data.data.slice(0, 4).map((v) => (
              <li key={v.id}>
                <MediaEl
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  thumbnail={v.thumbnailPath}
                  author={v.author.authorName}
                  profile={v.author.profileImgPath}
                />
              </li>
            ))
            : null
          : null}
      </ul>
    </Div>
  );
};

export default MediaArt;
