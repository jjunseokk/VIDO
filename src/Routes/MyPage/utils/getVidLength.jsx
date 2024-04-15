const getVidLength = (src, setLength) => {
  let video = document.createElement('video');
  video.src = src;
  video.oncanplay = () => {
    setLength(video.duration);
  };
  video.onerror = () => {};
};

export default getVidLength;
