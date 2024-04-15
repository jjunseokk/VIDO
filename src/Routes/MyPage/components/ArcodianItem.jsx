import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const ArcodianItem = ({
  selectMenu = 0,
  title = {
    title: '',
    link: '#',
  },
  content = [''],
  onClick = (e) => {},
  whichInfo,
  onInfoSelect,
  n = 1,
}) => {
  const [clicked, setClicked] = useState(false);
  const el = useRef();
  const ul = useRef();
  const handleToggle = () => {
    setClicked((prev) => !prev);
  };
  const setMenu = (idx) => {
    onClick(idx);

    changeColor(idx);
  };
  // const changeColor = (n) => {
  //   if (content) {
  //     content.map(
  //       (value, index) =>
  //         (ul.current.children[index].children[0].style.color = '#9d9d9d')
  //     );
  //     ul.current.children[n].children[0].style.color = '#002e85';
  //   }
  // };
  // useEffect(() => changeColor(selectMenu), [selectMenu]);
  // useEffect(() => {
  //   console.log(whichInfo);
  //   if (whichInfo !== n && content) {
  //     content.map(
  //       (value, index) =>
  //         (ul.current.children[index].children[0].style.color = '#9d9d9d')
  //     );
  //   }
  // }, [whichInfo]);
  const setInfo = (n) => {
    onInfoSelect(n);
    changeColor(0);
  };
  return (
    <li>
      <NavLink to={title.link}>{title.title}</NavLink>
      {content ? (
        <button
          onClick={handleToggle}
          style={
            clicked
              ? { transform: 'rotate(180deg)' }
              : { transform: 'rotate(0deg)' }
          }
        ></button>
      ) : null}
      <div
        ref={el}
        style={
          clicked ? { height: el.current.scrollHeight } : { height: '0px' }
        }
      >
        <ul ref={ul}>
          {content
            ? content.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    // onClick={() => setMenu(index)}
                    style={({ isActive }) => ({
                      color: isActive ? '#002e85' : '#9d9d9d',
                    })}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
    </li>
  );
};

export default ArcodianItem;
