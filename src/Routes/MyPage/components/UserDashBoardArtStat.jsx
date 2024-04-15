import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import styles from './UserDashBoardArtStat.module.scss';
import { UserDashboardArtStatStyle } from './UserDashboardArtStatStyle';
import { useTranslation } from "react-i18next";
import SummaryItemBox from './SummaryItemBox';
import BarHorizontalChart from './BarHorizontalChart';
import RenderPagination from '../../Components/RenderPagination';

import prevBtn_off from '../../../../img/prev_off_light.svg';
import prevBtn_on from '../../../../img/prev_on_light.svg';
import nextBtn_off from '../../../../img/next_off_light.svg';
import nextBtn_on from '../../../../img/next_on_light.svg';
import AxiosConfig from '../../../AxiosConfig';

const UserDashBoardArtStat = ({ data, mode, term, start, end }) => {
  const { t } = useTranslation();
  const [artCount, setArtCount] = useState([
    data?.upload?.detail.approved,
    data?.upload?.detail.waiting,
    data?.upload?.detail.rejected,
  ]);



  const [getViewPage, setGetViewPage] = useState(Number(1));
  const [getDownPage, setGetDownPage] = useState(Number(1));
  const [viewData, setViewData] = useState();
  const [mediaDownData, setMediaDownData] = useState();
  const [downCheck, setDownCheck] = useState();
  const [clientDown, setClientDown] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  const getViews = () => {
    AxiosConfig.get(
      `/user/dashboard/views?start=${start}&end=${end}&p=${getViewPage}`
    ).then((res) => {
      setViewData(res.data.result)
    })
  };

  const getDown = () => {
    AxiosConfig.get(
      `/user/dashboard/download?start=${start}&end=${end}&p=${getDownPage}`
    ).then((res) => {
      setMediaDownData(res.data.result)
    })
  }

  const getDownClient = () => {
    AxiosConfig.get(
      `/user/dashboard/${downCheck}/download/client?start=${start}&end=${end}`
    ).then((res) => {
      if (res.data.statusCode == 200) {
        setClientDown(res.data.result)
      }
    })
  }


  const viewCount = viewData?.data.map((item) => item.count);

  const downCount = mediaDownData?.data?.map((item) => item.count);

  // 다운로드한 클라이언트
  const itemsPerPage = 7;
  const totalPages = Math.ceil(clientDown?.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const checkShowDownload = (check) => {
    const checkboxes = document.getElementsByName('down')
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== check) {
        checkboxes[i].checked = false
      }
    }
    setDownCheck(check.value)
  }

  useEffect(() => {
    getViews();
  }, [getViewPage])

  useEffect(() => {
    getDown()
  }, [getDownPage])
  useEffect(() => {
    getDownClient();
    setCurrentPage(1);
  }, [downCheck]);

  return (
    <UserDashboardArtStatStyle mode={mode}>

      <div>
        <p>{t("mypage.dashboard.art_analysis.title")}</p>
        <div className='art_analysis_area'>
          <SummaryItemBox
            bg={"#0077B7"}
            title={t("mypage.dashboard.summary.art_analysis.upload")}
            data={data?.upload}
            type={"analysis"}
            term={term}
          />
          <SummaryItemBox
            bg={"#0054A6"}
            title={t("mypage.dashboard.summary.art_analysis.views")}
            data={data?.views}
            type={"analysis"}
            term={term}
          />
          <SummaryItemBox
            bg={"#002E85"}
            title={t("mypage.dashboard.summary.art_analysis.download")}
            data={data?.download}
            type={"analysis"}
            term={term}
          />
        </div>
        <div className="line"></div>
        <div className='art_analysis_section'>
          <div className='upload'>
            <p className='art_analysis_title'>{t("mypage.dashboard.art_analysis.upload_or_approve")}</p>
            <div className='upload-chart'>
              <PieChart
                label={[
                  `${t("mypage.dashboard.art_analysis.count.approved")}`,
                  `${t("mypage.dashboard.art_analysis.count.ing")}`,
                  `${t("mypage.dashboard.art_analysis.count.reject")}`
                ]}
                score={artCount[0] + artCount[1] + artCount[2]}
                color={'#0077B7'}
                rawData={artCount}
              />

              <div className='upload-chart-content'>
                <ul>
                  <li>
                    <span></span>
                    <p>{t("mypage.dashboard.art_analysis.count.approved")}</p>
                    <span>{artCount[0]}</span>
                  </li>
                  <li>
                    <span></span>
                    <p>{t("mypage.dashboard.art_analysis.count.ing")}</p>
                    <span>{artCount[1]}</span>
                  </li>
                  <li>
                    <span></span>
                    <p>{t("mypage.dashboard.art_analysis.count.reject")}</p>
                    <span>{artCount[2]}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='views'>
            <p className='art_analysis_title'>{t("mypage.dashboard.art_analysis.views")}</p>
            <div className='views-chart'>
              <div className='chartContent'>
                {viewData?.data.map((value, idx) => {
                  return (
                    <p><span>{idx + 1}</span> {value.mediaArt.title}</p>
                  )
                })}
              </div>
              {viewCount == "" ? <p>{t("mypage.dashboard.no_data")}</p> : (
                <BarHorizontalChart
                  label={["", "", "", "", ""]}
                  score={data?.views.user}
                  color={'#0054A6'}
                  rawData={viewCount}
                  mode={mode}
                  height={138}
                />
              )}
            </div>
            {viewData?.totalPage == 0 ? null : (
              <RenderPagination mode={mode} totalPage={viewData?.totalPage} setPage={setGetViewPage} page={Number(getViewPage)} />
            )}
          </div>
        </div>
        <div className='art_analysis_section'>
          <div className='download'>
            <p className='art_analysis_title'>{t("mypage.dashboard.art_analysis.download")}</p>
            <div className='download-chart'>

              <div className='chartContent'>
                {mediaDownData?.data.map((value, idx) => {
                  const maxLength = 10;

                  const truncatedTitle = value.mediaArt.title.length > maxLength
                    ? `${value.mediaArt.title.substring(0, maxLength)}...`
                    : value.mediaArt.title;

                  return (
                    <div>
                      <input type='radio' name="down" value={value.mediaArt.id} onChange={(e) => checkShowDownload(e.target)} />
                      <p><span>{idx + 1}</span> {truncatedTitle}</p>
                    </div>
                  )
                })}
              </div>
              {downCount == "" ? <p className='noData'>{t("mypage.dashboard.no_data")}</p> :
                (
                  <BarHorizontalChart
                    label={["", "", "", "", ""]}
                    score={data?.download.user}
                    color={'#0054A6'}
                    rawData={downCount}
                    mode={mode}
                    height={171}
                  />
                )}

              <div className='client_download'>
                <p className='art_analysis_sub_title'>{t("mypage.dashboard.art_analysis.download")}</p>
                <div>
                  {clientDown == undefined ? null : (
                    <>
                      <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        <img src={currentPage === 1 ? prevBtn_off : prevBtn_on} alt="" />
                      </button>
                      <div>
                        {Array.isArray(clientDown)
                          ? clientDown.slice(startIndex, endIndex).map((value, idx) => (
                            <p key={idx}>
                              <span>{startIndex + idx + 1}</span> {value}
                            </p>
                          ))
                          : null}
                      </div>
                      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <img src={currentPage === totalPages ? nextBtn_off : nextBtn_on} alt="" />
                      </button>
                    </>
                  )}

                </div>
              </div>
            </div>
            {mediaDownData?.totalPage == 0 ? null :
              <RenderPagination mode={mode} totalPage={mediaDownData?.totalPage} setPage={setGetDownPage} page={Number(getDownPage)} />
            }
          </div>
        </div>
      </div>

    </UserDashboardArtStatStyle>
  );
};

export default UserDashBoardArtStat;






{/* <div>
        <div className="artCount">
          <PieChart rawData={artCount} />

          <div>
            <ul>
              <li>
                <span></span>
                <p>{t("mypage.dashboard.art_analysis.count.approved")}</p>
                <span>{artCount[0]}</span>
              </li>
              <li>
                <span></span>
                <p>{t("mypage.dashboard.art_analysis.count.ing")}</p>
                <span>{artCount[1]}</span>
              </li>
              <li>
                <span></span>
                <p>{t("mypage.dashboard.art_analysis.count.reject")}</p>
                <span>{artCount[2]}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="recentUpload">
          {recentPageArr ? (
            <>
              <h1>{t("mypage.dashboard.art_analysis.recent")}</h1>
              <DashBoardTable data={recentPageArr[recentPage - 1]} />
              <ul>
                <li>
                  <span>
                    {recentPage}/{recentWholePage}
                  </span>
                </li>
                <li onClick={() => setRecentPage(1)}>
                  <img src="/img/doubleArrowLeft.svg" />
                </li>
                <li
                  onClick={() =>
                    recentPage > 1 ? setRecentPage((prev) => prev - 1) : null
                  }
                >
                  <img src="/img/ArrowLeft.svg" />
                </li>
                <li
                  onClick={() =>
                    recentPage < recentWholePage
                      ? setRecentPage((prev) => prev + 1)
                      : null
                  }
                >
                  <img src="/img/ArrowRight.svg" />
                </li>
                <li onClick={() => setRecentPage(recentWholePage)}>
                  <img src="/img/doubleArrowRight.svg" />
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </div>
      {!loading ? (
        <div>
          <div className="playCount">
            <h1>
              {t("mypage.dashboard.art_analysis.play_count")}<span>{t("mypage.dashboard.art_analysis.play_count_unit")}</span>
            </h1>
            <h2>{wholePlayCount.toLocaleString()}</h2>
            <div>
              <ul>
                <li
                  onClick={() => setPlayCountOpt(true)}
                  style={playCountOpt ? { color: '#002e85' } : null}
                >
                  {t("mypage.dashboard.art_analysis.location")}
                </li>
                <li
                  onClick={() => setPlayCountOpt(false)}
                  style={!playCountOpt ? { color: '#002e85' } : null}
                >
                  {t("mypage.dashboard.art_analysis.art")}
                </li>
              </ul>
              {playCount ? (
                playCountOpt ? (
                  <div>
                    <VerticalBar
                      label={playCount[0].map((value) => value.companyName)}
                      dataset={playCount[0].map((value) => value.count)}
                    />
                  </div>
                ) : null
              ) : null}
              {playCount ? (
                !playCountOpt ? (
                  <div>
                    <VerticalBar
                      label={playCount[1].map((value) => value.title)}
                      dataset={playCount[1].map((value) => value.count)}
                    />
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
          <div className="playTime">
            <h1>
              {t("mypage.dashboard.art_analysis.play_time")}<span>{t("mypage.dashboard.art_analysis.play_time_unit")}</span>
            </h1>
            <h2>{wholePlayTime.toLocaleString()}</h2>
            <div>
              <ul>
                <li
                  onClick={() => setPlayTimeOpt(true)}
                  style={playTimeOpt ? { color: '#002e85' } : null}
                >
                  {t("mypage.dashboard.art_analysis.location")}
                </li>
                <li
                  onClick={() => setPlayTimeOpt(false)}
                  style={!playTimeOpt ? { color: '#002e85' } : null}
                >
                  {t("mypage.dashboard.art_analysis.art")}
                </li>
              </ul>
              {playTime[0] ? (
                playTimeOpt ? (
                  <div>
                    <VerticalBar
                      label={playTime[0].map((value) => value.title)}
                      dataset={playTime[0].map(
                        (value) => Math.round((value.playTime * 10) / 60) / 10
                      )}
                    />
                  </div>
                ) : null
              ) : null}
              {playTime ? (
                !playTimeOpt ? (
                  <div>
                    <VerticalBar
                      label={playTime[1].map((value) => value.title)}
                      dataset={playTime[1].map(
                        (value) => Math.round((value.playTime * 10) / 60) / 10
                      )}
                    />
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      ) : null} */}