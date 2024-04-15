import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';

const Div = styled.header`
  border-bottom: ${({ theme }) => theme.border};
  height: ${px2vhMobile(280)};
  padding: 0 ${px2vwMobile(40)};
  position: relative;
  > div {
    display: flex;
    position: absolute;
    bottom: ${px2vhMobile(58)};
    align-items: flex-end;
    width: calc(100vw - ${px2vwMobile(80)});
    justify-content: space-between;
    > img {
      width: ${px2vwMobile(310)};
    }
    > nav {
      width: max-content;
      display: flex;
      gap: ${px2vwMobile(60)};
      a {
        font: 700 14px ${({ theme }) => theme.noto};
        letter-spacing: -0.36;
        transition: ${({ theme }) => theme.transition};
        &.active {
          color: ${({ theme }) => theme.highlightColor};
        }
      }
    }
  }
`;

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <Div>
      <div>
        <img onClick={() => navigate('/')} src="/img/logo_line.svg" />
        <nav>
          <NavLink to="/main">홈</NavLink>
          <NavLink to="/media-art">미디어아트</NavLink>
          <NavLink to="/author">아티스트</NavLink>
        </nav>
      </div>
    </Div>
  );
};

export default MobileHeader;
