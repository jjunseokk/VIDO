import styled from 'styled-components';
import px2vw from '../../util/px2vw';

export const UserDashboardSummaryStyle = styled.div`
    padding: 17px 32px;
    >div{
        >p{
            font: 500 18px/26.64px ${({ theme }) => theme.noto};
            margin-bottom: 15px;
        }
        .art_analysis_area{
            display: flex;
            justify-content: space-around;
            margin-bottom: 36px;
            padding-bottom: 48px;
            border-bottom: 1px solid #707070;

            &:last-of-type{
                margin-bottom: 0px;
                padding-bottom: 0px;
                border-bottom: none;
            }
            .art_analysis_PieChart {
                margin: 3px 0px;
                display: flex;

                >div{
                    /* width: 193px; */
                    width: ${px2vw(193)};
                    height: 23px;
                    background: #707070;
                    text-align: center;
                    border-radius: 4px;
                    margin: 0px 12.5px;
                    &:last-of-type{
                        margin-right: 0px;
                    }
                    .title{
                        color: #FFFFFF;
                        font: 500 14px/20.72px ${({ theme }) => theme.noto};
                        margin-bottom: 5px;
                        >span{
                            font: 400 8px/11.84px ${({ theme }) => theme.noto};
                        }
                    }
                    .chart{
                        /* width: 193px; */
                        width: ${px2vw(193)};
                        height: 193px;
                        border-radius: 4px;
                        background: #F8F8F8;
                        padding: 14px;
                    }
                }
               
            }
            .art_analysis_BarChart{
                margin: 3px 0px;
                display: flex;
                >div{
                    /* width: 193px; */
                    width: ${px2vw(193)};
                    height: 23px;
                    background: #707070;
                    text-align: center;
                    border-radius: 4px;
                    margin: 0px 12.5px;

                    .title{
                        color: #FFFFFF;
                        font: 500 14px/20.72px ${({ theme }) => theme.noto};
                        margin-bottom: 5px;
                        >span{
                            font: 400 8px/11.84px ${({ theme }) => theme.noto};
                        }
                    }
                    .chart{
                        /* width: 193px; */
                        width: ${px2vw(193)};
                        height: 193px;
                        border-radius: 4px;
                        background: #F8F8F8;
                    }
                }
                
            }
        }
    }
    
`;


export const UserDashboardSummaryBox = styled.div`
    /* width: ${({ width }) => width}px; */
    width: ${({ width }) => (px2vw(width))};
    height: ${({ height }) => height}px;
    padding: 0px ${({ padding }) => padding}px;
    border-radius: 4px;
    background : ${({ bg }) => bg};

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3.5px 0px;
    >p{
        font: 500 14px/20.72px ${({ theme }) => theme.noto};
        color: #F8F8F8;
        >span{
            font: 400 8px/11.84px ${({ theme }) => theme.noto};
        }
        &:nth-of-type(2){
            display: flex;
            align-items: center;
            font: 500 ${({ length }) => (length == true ? 14 : 18)}px/${({ length }) => (length == true ? 20.72 : 26.64)}px ${({ theme }) => theme.noto};
            >img{
                margin-left: 3px;
            }
        }
        &:nth-of-type(3){
            font: 500 10px/14.8px ${({ theme }) => theme.noto};
        }
        &:nth-of-type(4){
            width: 15%;
            font: 500 10px/14.8px ${({ theme }) => theme.noto};
            color: ${({ color }) => (color == 'down' ? '#C52C26' : color == 'same' ? '#fff' : '#159828')};
        }
    }
    > div{
    text-align: right;
        > p{
        font: 700 24px / 35.52px ${({ theme }) => theme.noto};
        color: #FFFFFF;
        &:nth-child(2){
            font: 500 8px / 11.84px ${({ theme }) => theme.noto};
            > span{
                color: ${({ color }) => (color == 'down' ? '#C52C26' : color == 'same' ? '#fff' : '#159828')};
            }
        }
       
    }
}
`