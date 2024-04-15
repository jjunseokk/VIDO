import React from 'react';
import Marquee from 'react-fast-marquee';

const Company = () => {
  return (
    <Marquee gradient={false} speed={50}>
      <img className="comp" src="/img/companies.png" />
    </Marquee>
  );
};

export default Company;
