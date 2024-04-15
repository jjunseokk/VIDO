import styled from "styled-components";
import px2vw from "../../util/px2vw";

export const UserDashBoardRevenueAnalysisStyle = styled.div`
  padding: 17px 32px;
  >div{
    >p{
        font: 500 18px/26.64px ${({ theme }) => theme.noto};
        margin-bottom: 15px;
    }
    .revenue_analysis_score{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: ${px2vw(906)};
    }
    .line{
        border: 1px solid #707070;
        margin: 10px 0px;
    }
    .revenue_analysis_section{
        width: ${px2vw(906)};
        height: 501px;
        background: #f8f8f8;
        border-radius: 4px;
        border: .5px solid #e0e0e0;
        margin-bottom: 22px;
        .revenue_analysis_title{
            text-align: center;
            font: 500 14px/20.72px ${({ theme }) => theme.noto};
            color: #707070;
            margin-top: 4px;
            margin-bottom: 20px;
        }
        .revenue_area{
            width: 100%;
            height: 413px;
            display: flex;

            .revenue_area_chart{
                width: ${px2vw(305)};
                height: 413px;
                border-right: 1px solid #707070;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                >p{
                    font: 500 12px/17.76px  ${({ theme }) => theme.noto};
                    color: #707070;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .Doughnut{
                    width: ${px2vw(150)} ;
                    margin: 0 auto;
                    margin-bottom: 10px;
                }
                .revenue_top3{
                    width: 100%;
                    margin: 10px 0px;
                    >p{
                        text-align: center;
                        font: 500 18px/26.64px ${({ theme }) => theme.noto};
                        color: #E0E0E0;
                    }
                    >div{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 10px 0px;
    
                        .number{
                            font: 700 16px/23.68px ${({ theme }) => theme.noto};
                            margin-left: 14px;
                        }
                        img{
                            width: 49px;
                            height: 49px;
                            margin: 0px 6px;
                            border-radius: 4px;
                        }
                        >div{
                            width: ${px2vw(81)};
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            p{
                                font: 500 10px/14.8px ${({ theme }) => theme.noto};
                                color: #707070;
                                &:last-of-type{
                                    font-weight: 400;
                                }
                            }
                        }
                        .chart{
                            width: 79px;
                            height: 14px;
                            position: relative;
                            background: #d9d9d9;
                            margin: 0px 5px;
                        }
                        span{
                            width: 45px;
                            font: 700 12px/17.76px ${({ theme }) => theme.noto};
                        }
                    }   
                }
            }
            .revenue_area_table{
                margin: 0 auto;
                table-layout: fixed;
                width: ${px2vw(573)};
                height: 450px;
                color: #707070;
                border-collapse: collapse;
                position: relative;

                th,td{
                    
                    &:first-of-type{
                        width: ${px2vw(70)};
                    }
                    &:nth-of-type(2){
                        width: ${px2vw(300)};
                        text-align: start;
                    }
                    >div {
                        width: 300px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                tr{ 
                    border-bottom: 1px solid #E0E0E0;
                    padding: 4px 0px;
                    text-align: center;

                    &:last-of-type{
                        border: none;
                        margin-bottom: 10px;
                    }
                }
                thead{
                    text-align: center;
                    border-bottom: 1px solid #E0E0E0;
                    >th{
                        font: 400 10px/14.8px ${({ theme }) => theme.noto};
                        &:nth-of-type(2) {
                            text-align: center;
                        }
                    }
                }
                    
                td{
                    font: 400 12px/17.76px ${({ theme }) => theme.noto};
                    height: 67px;
                }
                   
                .art{
                    display: flex;
                    align-items: center;
                    img{
                        width: 49px;
                        height: 49px;
                        margin-right: 10px;
                        border-radius: 4px;
                        }
                        >div{
                            
                            >p{
                                font: 500 10px/14.8px ${({ theme }) => theme.noto};
                                &:last-of-type{
                                font-weight: 400
                                }
                            }
                        }
                        
                    }
                    .revenue{
                        font: 500 12px/17.76px ${({ theme }) => theme.noto};
                        color: #151515;
                    }
                    >.noData {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #E0E0E0;
                        font-family: $font-kor;
                    }
                }
                .pagination {
                    display: flex;
                    justify-content: center;
                    width: ${px2vw(500)};
                    margin: 1px auto;
                    position: absolute;
                    bottom: 0px;
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
            }
        }
    }
    @media screen and (max-width : 2000px){
    >div{
        .revenue_analysis_section{
            .revenue_area{
                .revenue_area_chart{
                    .Doughnut{
                        width: ${px2vw(171)} ;
                        margin: 0 auto;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
`;
