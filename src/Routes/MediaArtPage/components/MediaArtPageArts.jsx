import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMediaArts } from '../../util/axiosGet';

const MediaArtPageArts = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('id');
  const { data, status } = useQuery(['mediaArts', page, id], getMediaArts);
  return <div>MediaArtPageArts</div>;
};

export default MediaArtPageArts;
