import React from 'react';
import RegisterBtn from './RegisterBtn';
import styles from './deletemember.module.scss';
import { useOutletContext } from 'react-router-dom';
import AxiosConfig from '../../../AxiosConfig';
import { useNavigate } from 'react-router-dom';
import SquareBtn from '../../Components/SquareBtn';
import { motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

const DeleteMember = ({ setPopup }) => {
  const navigate = useNavigate();
  const handleMemberDelete = async () => {
    await AxiosConfig.delete('user/info').then((res) => {
      console.log(res.data);
      navigate('/');
      window.location.reload();
    });
  };
  return (
    <div className={styles.deleteMember}>
      <motion.div
        variants={FramerMotionAnimate[2]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
      >
        <p>
          탈퇴후 개인정보를 포함한 모든정보는 보관되지
          <br />
          않습니다.
          <br />
          <br />
          정말로 탈퇴하시겠습니까?
        </p>
        <div>
          <SquareBtn
            width="138px"
            context={'아니오'}
            onClick={() => setPopup(false)}
          />
          <SquareBtn
            width="138px"
            context={'예'}
            onClick={handleMemberDelete}
            color="#707070"
            bgColor="#f0f0f0"
            hoverColor="#F8F8F8"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteMember;
