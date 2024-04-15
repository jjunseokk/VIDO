function Video(src) {
  var v = document.createElement('video');
  if (src != '') {
    v.src = src;
    console.log(src);
  }
  return v;
}

const createVid = (url) =>
  new Promise((resolve, reject) => {
    const video = new Video(url);
    video.addEventListener('loadedmetadata', () => resolve(video));
    video.addEventListener('error', (error) => reject(error));

    window.URL.revokeObjectURL(video.src);
  }).then((res) => res);

export default async function getCroppedVid(vidsrc) {
  console.log(vidsrc);
  let getVideo = await createVid(vidsrc).catch((e) => console.log(e));
  let video = getVideo;
  var canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoheight;
  canvasCTX = canvas.getContext('2d');
  canvasCTX.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  return [video.duration, video.videoWidth, video.videoHeight, video];
}

export const genrateDownload = async (vidsrc, time) => {
  console.log(vidsrc);
  const vidInfo = await getCroppedVid(vidsrc).catch((e) => console.log(e));
  console.log(vidInfo);
  return vidInfo;
};
