export default function getVideoPreview(video) {
  const canvasEl = document.createElement('canvas');
  // document.body.appendChild(canvasEl);
  console.log(canvasEl);
  const ctx = canvasEl.getContext('2d');
  canvasEl.width = video.videoWidth;
  canvasEl.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  let preview = canvasEl.toDataURL('image/png');

  return preview;
}
