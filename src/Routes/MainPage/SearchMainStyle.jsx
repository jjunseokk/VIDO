import styled from 'styled-components';
import px2vw from '../util/px2vw';

const SearchMainStyle = styled.div`
  padding-bottom: 60px;
  min-height: calc(100vh - 290px);
  background : ${({mode})=>(mode == 'light'? '#ffff' : '#151515')};
  div.notFound {
    width: 100%;
    text-align: center;
    > p {
      font: 600 22px/33px ${({ theme }) => theme.noto};
      color: ${({mode})=>(mode == 'light'? '#151515' : '#ffffff')};
      margin-bottom: 13px;
      letter-spacing: -0.44px;
      > span {
        letter-spacing: -0.44px;
        color: ${({ theme }) => theme.mainColor};
        font: 500 22px/33px ${({ theme }) => theme.noto};
      }
    }
    > span {
      font: 400 16px/24px ${({ theme }) => theme.noto};
      letter-spacing: -0.32px;
    }
  }
  > h1 {
    margin: 0 ${({ theme }) => theme.left};
    padding-top: 57px;
    margin-bottom: 36px;
    font: 600 28px ${({ theme }) => theme.noto};
    color: ${({mode})=>(mode == 'light'? '#151515' : '#ffffff')};
  }
  > section {
    position: relative;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 62px;
    > h2 {
      color: ${({mode})=>(mode == 'light'? '#151515' : '#ffffff')};
      font: 500 20px ${({ theme }) => theme.noto};
      margin: 0 ${({ theme }) => theme.left};
    }
    > div {
      margin: 0 ${({ theme }) => theme.left};
      margin-bottom: 54px;
      margin-top: 24px;
      width: ${({ theme }) => theme.pgWidth};
      min-height: 30px;
      transition: all 0.2s;

      > p {
        font: 500 16px ${({ theme }) => theme.noto};

        text-align: center;
        color: ${({ theme }) => theme.mainColor};
      }
      > ul {
        display: flex;
        left: 0;
      }
      .pagination{
      display: flex;
      justify-content: center;
      width: ${px2vw(500)};
      margin: 0 auto;
  
      >p{
        padding: 0px 10px;
        font: 400 14px/20px;
        color: #9d9d9d;
        cursor: pointer;
      }
      >p.active{
       color: ${({ mode }) => (mode == 'light' ? '#1152CC' : 'white')};
      }
      >button{
        padding: 0px 5px;
      }
    }
    }
    > button {
      position: absolute;
      bottom: -16px;
      height: 32px;
      width: 120px;
      border-radius: 16px;
      cursor: pointer;
      font: 500 12px ${({ theme }) => theme.noto};
      box-shadow: 0px 3px 6px #00000029;
      background-color: #fff;
      border: none;
      left: 50%;
      transform: translateX(-50%);
    }
    &:first-of-type {
      ul {
        padding-bottom: 40px;
        &:first-of-type {
          gap: 20px ${px2vw(40)};

          flex-wrap: wrap;
          p {
          }
        }
      }
    }
  }
`;
export default SearchMainStyle;
