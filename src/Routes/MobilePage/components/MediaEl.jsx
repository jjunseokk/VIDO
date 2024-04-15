import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import px2vwMobile from '../../util/px2vwMobile';

const Div = styled.div`
  width: ${px2vwMobile(480)};
  height: ${px2vwMobile(480)};
  transition: ${({ theme }) => theme.transition};
  position: relative;
  .number {
    transition: ${({ theme }) => theme.transition};
    position: absolute;
    top: 0;
    left: ${px2vwMobile(16)};
    font: italic 900 33.3px/39px ${({ theme }) => theme.roboto};
    color: #fff;
  }
  > img {
    width: ${px2vwMobile(480)};
    height: ${px2vwMobile(320)};
    object-fit: cover;
    display: block;
    border-radius: ${px2vwMobile(4)};
    margin-bottom: ${px2vwMobile(16)};
    transition: ${({ theme }) => theme.transition};
  }
  > div {
    display: flex;
    gap: ${px2vwMobile(30)};
    transition: ${({ theme }) => theme.transition};
    > img {
      width: ${px2vwMobile(80)};
      height: ${px2vwMobile(80)};
      border-radius: ${px2vwMobile(50)};
      margin-bottom: ${px2vwMobile(5)};
      transition: ${({ theme }) => theme.transition};
    }
    > div {
      .title {
        transition: ${({ theme }) => theme.transition};
        font: 500 12px ${({ theme }) => theme.noto};
        word-break: keep-all;
        color: #151515;
        margin-bottom: ${px2vwMobile(6)};
      }
      .authorName {
        font: 400 10px ${({ theme }) => theme.noto};
        transition: ${({ theme }) => theme.transition};
        color: #707070;
      }
    }
  }
  &.small {
    width: ${px2vwMobile(375)};
    height: ${px2vwMobile(380)};
    > img {
      width: ${px2vwMobile(375)};
      height: ${px2vwMobile(250)};
    }
  }
`;

const MediaEl = ({
  thumbnail,
  title,
  author,
  profile = null,
  id,
  number = null,
  className,
}) => {
  const { serverAddress } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Div
      onClick={() => navigate(`/media-art/detail/${id}`)}
      className={className}
    >
      <img src={serverAddress + thumbnail} alt={title} />
      {number ? <p className="number">{number}</p> : null}
      <div>
        {profile == 'none' ? null : profile ? (
          <img src={serverAddress + profile} />
        ) : (
          <img src="/img/author-img.png" />
        )}
        <div>
          <p className="title">
            {title?.length > 16 ? title.slice(0, 14) + '...' : title}
          </p>
          <p className="authorName">
            {author?.length > 13 ? author.slice(0, 11) + '...' : author}
          </p>
        </div>
      </div>
    </Div>
  );
};

export default MediaEl;
