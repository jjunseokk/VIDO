import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const InfoLi = styled.li`
  border-bottom: ${({ theme }) => theme.border};
  padding: 14px 30px;
  > div {
    height: ${(props) => (props.height ? props.height : '20px')};
    position: relative;
    > p {
      font: 700 14px/20px ${({ theme }) => theme.noto};
      letter-spacing: -0.35px;
      color: ${({mode})=>(mode == 'light' ? '#151515' : '#ffffff')};
    }
    > div {
      position: absolute;
      top: 0;
      left: 120px;
      > p {
        font: 400 14px/20px ${({ theme }) => theme.noto};
        letter-spacing: -0.35px;
        color: ${({mode})=>(mode == 'light' ? '#707070' : '#ffffff')};
      }
      > span {
        position: absolute;
        left: 200px;
        top: 0;
        width: 80px;
        color: #fff;
        height: 24px;
        cursor: pointer;
        border-radius: 12px;
        background-color: ${({ theme }) => theme.mainColor};
        font: 400 14px/24px ${({ theme }) => theme.noto};
        letter-spacing: -0.35px;
        transition: ${({ theme }) => theme.transition};
        text-align: center;
        &:hover {
          background-color: ${({ theme }) => theme.highlightColor};
        }
      }
      input {
        position: absolute;
        top: -5px;
        left: -5px;
        color: #707070;
        letter-spacing: -0.35px;
        font: 400 14px/20px ${({ theme }) => theme.noto};
        background-color: #f7f7f7;
        height: 30px;
        padding: 0 4px;
        width: 184px;
        border: ${({ theme }) => theme.border};
        border-radius: 2px;
        &:focus {
          outline: none;
          border: ${({ theme }) => theme.border};
        }
      }
      textarea {
        resize: none;
        border-radius: 2px;

        height: 100px;
        width: ${px2vw(780)};
        font: 400 14px/20px ${({ theme }) => theme.noto};

        color: #707070;
        border: ${({ theme }) => theme.border};
        padding: 4px 4px;
        background-color: #f8f8f8;
        &:focus {
          outline: none;
        }
      }
    }
    > span {
      position: absolute;
      left: 300px;
      font: 400 14px/20px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1428px) {
    padding: 12px 24px;
    > div {
      > p {
        font: 600 12px/20px ${({ theme }) => theme.noto};
      }
      > div {
        left: 110px;
        > p {
          font: 400 12px/20px ${({ theme }) => theme.noto};
        }
        > span {
          left: 200px;
          width: 60px;
          height: 20px;
          font: 400 12px/20px ${({ theme }) => theme.noto};
        }
        input {
          font: 400 12px/18px ${({ theme }) => theme.noto};
          height: 24px;
        }
        textarea {
          font: 400 12px/18px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 1064px) {
    padding: 12px 24px;
    > div {
      > p {
        font: 600 10px/20px ${({ theme }) => theme.noto};
      }
      > div {
        left: 90px;
        > p {
          font: 400 12px/20px ${({ theme }) => theme.noto};
        }
        > span {
          left: 200px;
          width: 60px;
          height: 20px;
          font: 400 12px/20px ${({ theme }) => theme.noto};
        }
        input {
          font: 400 12px/18px ${({ theme }) => theme.noto};
          height: 24px;
        }
        textarea {
          font: 400 12px/18px ${({ theme }) => theme.noto};
        }
      }
    }
  }
`;

export default InfoLi;
