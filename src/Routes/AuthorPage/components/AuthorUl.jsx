import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../ContextProvider';
import AuthorSingle from './AuthorSingle';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

// 아티스트 리스트 목록
const AuthorUl = ({
  data,
  onClick = () => {},
  size = 'small',
  mode,
}) => {
  const navigate = useNavigate();
  const authorSinglePage = (id) => navigate(`/author/detail/${id}`);

  const { serverAddress } = useContext(UserContext);

  return (
    <ul>
      {Array.isArray(data)
        ? data.map((value) => (
            <motion.li
              variants={FramerMotionAnimate[0]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
              key={value.id}
            >
              <AuthorSingle
                size={size}
                mode={mode}
                onClick={() => authorSinglePage(value.id)}
                profImg={
                  value.profileImgPath
                    ? serverAddress + value.profileImgPath
                    : '/img/author-img.png'
                }
                authorName={value.authorName}
              />
            </motion.li>
          ))
        : null}
    </ul>
  );
};

export default AuthorUl;
