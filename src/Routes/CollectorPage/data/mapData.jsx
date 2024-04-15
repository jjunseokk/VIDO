const mapData = [
  {
    name: 'COEX Auditorium',
    res: '5210x1536 px',
    size: '20000mm x 6000mm',
    ratio: '2605:768',
    address: '서울특별시 강남구 삼성동 159',
    thumb: 'COEX-auditorium.webp',
  },
  {
    name: 'COEX studio 159',
    res: '4800x1485 px',
    size: '3700mm x 12000mm',
    ratio: '320:99',
    address: '서울특별시 강남구 영동대로 513 2층',
    thumb: 'COEX-studio-159.webp',
  },
  {
    name: '대전 스카이로드',
    res: '3763x453 px / 2120x453 px / 1866x255 px (Hub)',
    ratio: '3763:453 / 2120:453 / 622:85 (Hub)',
    address: '대전광역시 중구 은행선화동 중앙로164번길',
    thumb: 'daejeon-skyload.webp',
  },
  {
    name: 'muse',
    //keyword: 'Red, Black, Funky, Sexy',
    res: '1152x1536',
    ratio: '3:4',
    address: '서울 강남구 신사동 648-23',
    thumb: 'muse.webp',
  },

  {
    name: 'BC카드 본사',
    keyword: 'Red, White, Active, Simple, Easy',
    res: '5400 x 1200 px',
    ratio: '9:2',
    address: '서울 중구 을지로 170, BC카드 본사 2층',
    thumb: 'bc-card.webp',
  },
  {
    name: '코엑스 Xpace Big Bridge',
    // keyword: 'Red, White, Active, Simple, Easy',
    res: '1600 x 2800px',
    ratio: '9:16',
    address: '서울특별시 강남구 영동대로 513',
    thumb: '15.webp',
  },
  {
    name: '도산대로 SGF청담타워',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '12000mm x 17280mm',
    ratio: '25:36',
    address: '서울특별시 강남구 도산대로 327 SGF청담타워',
    thumb: 'SGF.webp',
  },
  {
    name: '코엑스 Xpace Bridge',
    // keyword: 'Red, White, Active, Simple, Easy',
    res: '1680 x 720px',
    ratio: '21:9',
    address: '서울특별시 강남구 영동대로 513',
    thumb: '16.webp',
  },
  {
    name: '학동사거리 S&S타워',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '12800mm x 16960mm',
    ratio: '40:53',
    address: '서울특별시 강남구 도산대로 409 S&S타워',
    thumb: 'S&S.webp',
  },
  {
    name: '코엑스 Xpace Edge Column',
    // keyword: 'Red, White, Active, Simple, Easy',
    res: '2480 x 2160px',
    ratio: '31:27',
    address: '서울특별시 강남구 영동대로 513',
    thumb: '17.webp',
  },
  {
    name: '강남을지병원사거리 신웅타워',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '12000mm x 16960mm',
    ratio: '75:106',
    address: '서울특별시 강남구 도산대로 157 신웅타워',
    thumb: 'shinwoong.webp',
  },
  {
    name: '코엑스 Xpace Floor',
    // keyword: 'Red, White, Active, Simple, Easy',
    res: '3840 x 2160px',
    ratio: '16:9',
    address: '서울특별시 강남구 영동대로 513',
    thumb: '18.webp',
  },
  {
    name: 'Avecque 청담',
    keyword: 'Black, (Dark)Green, Elegant ,Atmospheric, Sensuous',
    res: '3840x960 px',
    ratio: '193:48',
    address: '서울 강남구 선릉로 823 1층',
    thumb: 'aveque.webp',
  },
  {
    name: '삼성역 슈페리어타워',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '12480mm x 16960mm',
    ratio: '39:53',
    address: '서울특별시 강남구 테헤란로 528 슈페리어타워',
    thumb: 'superior.webp',
  },
  {
    name: '삼성동 랜드마크타워',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '12160mm x 17920mm',
    ratio: '19:28',
    address: '서울특별시 강남구 강남대로 308 랜드마크타워',
    thumb: 'landmark.webp',
  },
  {
    name: '잠실 대우유토피아빌딩',
    // keyword: 'Red, Black, Funky, Sexy',
    // res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    size: '8320mm x 10080mm',
    ratio: '52 : 63',
    address: '서울특별시 송파구 올림픽로 336 대우유토피아',
    thumb: 'utopia.webp',
  },

  {
    name: '노플렉스 송도',
    keyword: 'Tropical, Art, Vibrant, Colorful',
    res: '5760x768 px',
    ratio: '45:6',
    address: '인천 연수구 송도과학로16번길 33-4 트리플 스트리트 D동 202호',
    thumb: 'noflex-bg.webp',
  },

  {
    name: 'EXXIT',
    keyword: 'Red, Black, Funky, Sexy',
    res: '4000x750 px (캔버스 1) / 2800x750 px (캔버스 2)',
    ratio: '16:3 (캔버스 1) / 56:15 (캔버스 2)',
    address: '서울 강남구 가로수길 78 지하 1층',
    thumb: 'exxit-bg.webp',
  },
];

export default mapData;
