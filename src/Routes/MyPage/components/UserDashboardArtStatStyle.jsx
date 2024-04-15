import styled from "styled-components";
import px2vw from "../../util/px2vw";

export const UserDashboardArtStatStyle = styled.div`
  padding: 17px 32px;
  > div {
    > p {
      font: 500 18px/26.64px ${({ theme }) => theme.noto};
      margin-bottom: 15px;
    }
    .art_analysis_area {
      display: flex;
      gap: ${px2vw(11)};
    }
    .line {
      border: 1px solid #707070;
      margin: 10px 0px;
    }
    .art_analysis_section {
      display: flex;
      gap: ${px2vw(11)};
      align-items: center;
      .upload,
      .views,
      .download {
        width: ${px2vw(295)};
        height: 213px;
        border-radius: 4px;
        border: 0.5px solid #e0e0e0;
        background: #f8f8f8;
        .art_analysis_title {
          text-align: center;
          font: 500 14px/20.72px ${({ theme }) => theme.noto};
          color: #707070;
          margin-top: 4px;
          margin-bottom: 19px;
        }
        .upload-chart {
          padding: 0px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          canvas {
            width: 100% !important;
          }
          .upload-chart-content {
            width: ${px2vw(110)};
            ul {
              li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 11.5px 0px;
                span {
                  &:first-of-type {
                    width: ${px2vw(16)};
                    height: 16px;
                  }

                  &:last-of-type {
                    font: 500 14px/20.72px ${({ theme }) => theme.noto};
                  }
                }

                &:nth-of-type(1) {
                  span {
                    &:first-of-type {
                      background: #0077b7;
                    }
                  }
                }
                &:nth-of-type(2) {
                  span {
                    &:first-of-type {
                      background: #c4c4c4;
                    }
                  }
                }
                &:nth-of-type(3) {
                  span {
                    &:first-of-type {
                      background: #929292;
                    }
                  }
                }
                p {
                  font: 400 12px/17.76px ${({ theme }) => theme.noto};
                }
              }
            }
          }
        }
      }
      .views {
        width: ${px2vw(601)};
        height: 213px;
        background: #f8f8f8;
        border-radius: 4px;
        border: 0.5px solid #e0e0e0;
        .views-title {
          text-align: center;
          font: 500 14px/20.72px ${({ theme }) => theme.noto};
          color: #707070;
          margin-bottom: 19px;
        }
        .views-chart {
          display: flex;
          align-items: center;
          position: relative;
          padding: 0px 15px;
          
          .chartContent {
            width: ${px2vw(196)};
            height: 138px;
              > p {
              margin: 7px 0px;
              font: 500 12px/17.76px ${({ theme }) => theme.noto};
              > span {
                margin-right: 13px;
              }
            }
          }
          >p{
            color: #E0E0E0; 
            font: 500 18px/26.64px ${({ theme }) => theme.noto};
          }
        }
      }
      .download {
        width: ${px2vw(907)};
        height: 277px;
        background: #f8f8f8;
        margin-top: 11px;
        border-radius: 4px;
        border: 0.5px solid #e0e0e0;

        .download-chart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0px 15px;
          .chartContent {
            width: ${px2vw(210)};
            height: 171px;
            >div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
              > p {
                display: flex;
                align-items: center;
                margin: 7px 0px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                
                > span {
                  margin-left: 25px;
                  margin-right: 13px;
                }
                font: 500 12px/17.76px ${({ theme }) => theme.noto};
                > input[type="radio"] {
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  appearance: none;
                  width: 12px;
                  height: 12px;
                  border: 1px solid #707070;
                  border-radius: 50%;
                  outline: none;
                  cursor: pointer;
                  margin-top: 7px;
                }
                > input[type="radio"]:checked {
                  background-color: #002e85;
                  border: 2px solid white;
                  box-shadow: 0 0 0 1.6px #002e85;
                }
              }
            }
          }
          >.noData{
            color: #E0E0E0;
            font: 500 18px/26.64px ${({ theme }) => theme.noto};
          }
          .client_download {
            width: ${px2vw(220)};
            height: 201px;
            border-left: 1px solid #707070;
            .art_analysis_sub_title {
              text-align: center;
              font: 500 12px/17.76px ${({ theme }) => theme.noto};
              color: #707070;
              margin-bottom: 12px;
            }
            >div{
              display: flex;
              justify-content: space-between;
              align-items: center;
              >div{
                width: ${px2vw(217)};
                height: 162px;
                >p{
                  font: 400 12px/17.76px ${({ theme }) => theme.noto};
                  padding: 3px 0px;
                  border-bottom: 1px solid #E0E0E0;
                  color: #002E85;
                  >span{
                    color: #707070;
                    margin: 0px 7px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    width: ${px2vw(500)};
    margin: 5px auto;
    > p {
      margin-top: 0px;
      padding: 0px 10px;
      font: 500 12px/17.76px ${({ theme }) => theme.noto};
      color: #9d9d9d;
      cursor: pointer;
    }
    > p.active {
      color: ${({ mode }) => (mode == "light" ? "#363636" : "white")};
    }
    > button {
      padding: 0px 5px;
      > img {
        width: 18px;
        height: 18px;
      }
    }
  }
  @media screen  and (max-width : 2000px){
    > div {
      .art_analysis_section {
        .upload,
        .views,
        .download {
          .upload-chart {
            >div{
              &:first-of-type{
                width: ${px2vw(126)};
              }
            }
            canvas {
              width: 100% !important;
            }
          }
        }
      }
    }
  }
`;
