import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { getEditorPick } from '../../util/axiosGet';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../util/recoilState';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import { useNavigate } from 'react-router-dom';
import px2vw from '../../util/px2vw';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  position: relative;
  width: 100vw;
  margin-top: 100px;
  > h1 {
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
    font: 600 28px/33px ${({ theme }) => theme.noto};
    letter-spacing: -0.44px;
    position: relative;
    left: ${({ theme }) => theme.left};
    margin-bottom: 24px;
  }
  > div {
    position: relative;
    left: ${({ theme }) => theme.left};
    width: ${({ theme }) => theme.pgWidth};
    > ul {
      display: flex;
      flex-wrap: wrap;
      gap: ${px2vw(24)} ${px2vw(10)};
      padding-bottom: 100px;
      > li {
        cursor: pointer;
        &:hover {
          img {
            transform: scale(1.2);
          }
          p {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
        width: ${px2vw(420)};
        > div {
          width: ${px2vw(400)};
          height: ${px2vw(225)};
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 8px;
          > img {
            width: ${px2vw(400)};
            height: ${px2vw(225)};
            object-fit: cover;
            transition: ${({ theme }) => theme.transition};
          }
        }
        > p {
          font: 500 16px/24px ${({ theme }) => theme.noto};
          letter-spacing: -0.4px;
          color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
          transition: ${({ theme }) => theme.transition};
        }
      }
    }
  }
  @media (max-width: 806px) {
    > div > ul > li > p {
      font: 500 12px ${({ theme }) => theme.noto};
    }
  }
`;

const EditorPick = ({mode}) => {
  const { t } = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const navigate = useNavigate();
  const { data, status } = useQuery('EditorPick', getEditorPick, []);
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError({
      errorMessage: '에디터픽',
      popup: true,
    });
  }
  if (status == 'success')
    return (
      <Div mode={mode}>
        <h1>{t("media_art.editor_pick")}</h1>
        <div>
          <ul>
            {data
              ? data.slice(0, 6).map((value) => (
                  <li
                    key={value.id}
                    onClick={() =>
                      navigate(`/editor-pick-detail/${value.id}`, {
                        state: {
                          title: value.title,
                        },
                      })
                    }
                  >
                    <div>
                      <img src={serverAddress + value.thumbnailPath} />
                    </div>
                    <p>{value.title}</p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </Div>
    );
};

export default EditorPick;
