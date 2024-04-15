const getVidSize = (src, setSize) => {
  let video = document.createElement('video');
  video.src = src;
  video.oncanplay = () => {
    const size = [video.videoWidth, video.videoHeight];
    setSize(size);
  };
  video.onerror = () => {};
};

export default getVidSize;
