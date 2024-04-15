import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import px2vw from '../../util/px2vw';
import px2vwMobile from '../../util/px2vwMobile';

const Div = styled.div`
  width: ${({ width }) => px2vwMobile(width)};
  height: calc(
    ${({ width }) => px2vwMobile(width + 23)} +
      ${({ width }) => (width == 220 ? 32 : 40)}px
  );
  > img {
    width: ${({ width }) => px2vwMobile(width)};
    height: ${({ width }) => px2vwMobile(width)};
    border-radius: ${({ width }) => px2vwMobile(width / 2)};
    object-fit: cover;
    display: block;
  }
  > p {
    font-family: ${({ theme }) => theme.noto};
    font-weight: 500;
    font-size: ${({ width }) => (width === 220 ? 11.3 : 14)}px;

    margin-top: ${({ width }) =>
      width === 220 ? px2vwMobile(20) : px2vwMobile(23)};
    letter-spacing: -${({ width }) => (width === 220 ? 0.283 : 0.35)}px;
    text-align: center;
    word-break: break-all;
  }
`;

const ArtistEl = ({ width = 220, thumbnail, id, author }) => {
  const { serverAddress } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Div width={width} onClick={() => navigate(`/author/detail/${id}`)}>
      <img
        src={thumbnail ? serverAddress + thumbnail : '/img/author-img.png'}
        alt={author}
      />
      <p>{author}</p>
    </Div>
  );
};

export default ArtistEl;
