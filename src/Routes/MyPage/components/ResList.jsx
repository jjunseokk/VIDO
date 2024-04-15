import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import SelectDropdown from '../../Components/SelectDropdown';
import { getResList, getArtRes } from '../../util/userInfoGet';
import { AnimatePresence, motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import styled from 'styled-components';

const Res = styled.p`
  position: absolute;
  right: 90px;
  top: 0;
  font: 400 12px/2 ${({ theme }) => theme.noto};
  color: ${(props) => (props.color ? props.theme.mainColor : '#707070')};
  > span {
    margin-left: 4px;
    font: 700 12px/2 ${({ theme }) => theme.noto};
  }
`;

const ResList = ({ setSelected, selected, id }) => {
  const { data, status } = useQuery('resList', getResList);
  const saved = useQuery('savedRes', () => getArtRes(id));
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState(null);
  const onSelect = (value) => {
    setOpen(false);
    setSelected(value);
  };
  useEffect(() => {
    if (data) {
      if (Array.isArray(saved.data)) {
        const savedId = saved.data.map((val) => val.client.resolutionId);
        let newArr = data.filter((el) => !savedId.includes(el.resolutionId));
        setRes(newArr);
        setSelected(newArr[0]);
      } else {
        setRes(data);
        setSelected(data[0]);
      }
    }
  }, [data, saved.data]);

  // useEffect(() => {
  //   saved.data?
  // }, [saved]);
  return (
    <SelectDropdown width={'248px'} className="dropdown">
      <p onClick={() => setOpen((prev) => !prev)}>
        {selected
          ? selected.resolution.horizontal +
            ' x ' +
            selected.resolution.vertical
          : '선택'}
        {/* {selected ? (
          <Res className="right" color>
            *해상도
            <span>
              {selected.resolution.horizontal} x {selected.resolution.vertical}
            </span>
          </Res>
        ) : null} */}
      </p>
      <AnimatePresence>
        {open ? (
          <motion.ul
            variants={FramerMotionAnimate[3]}
            initial="initial"
            animate="animate"
            transition="transition"
            exit="exit"
          >
            {Array.isArray(res)
              ? res.map((value, idx) => (
                  <li onClick={() => onSelect(value)} key={idx}>
                    {value.resolution.horizontal} : {value.resolution.vertical}
                    {/* <Res className="right">
                      *해상도
                      <span>
                        {value.resolution.horizontal} x{' '}
                        {value.resolution.vertical}
                      </span>
                    </Res> */}
                  </li>
                ))
              : null}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </SelectDropdown>
  );
};

export default ResList;
