import React from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

//ffmpeg -i input.flv -ss 00:00:14.435 -frames:v 1 out.png
const getFFmpeg = (input, setCodec, setLoading) => {
  const ffmpeg = createFFmpeg({ log: true });
  ffmpeg.setLogger(({ type, message }) => {
    // console.log(type + message);
    if ((type + message).includes('h264' || 'h265')) {
      setCodec(1);
    }
  });
  const transcode = async ({ target: { files } }) => {
    setLoading(1);
    setCodec(2);
    const { name } = files[0];
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name);

    console.log('finish');
    setLoading(2);
    setTimeout(() => {
      ffmpeg.exit(); // ffmpeg.exit() is callable only after load() stage.
    }, 10000);
    // await ffmpeg.run('-i', name, 'output.mp4');
  };
  input.current.addEventListener('change', transcode);
};

export default getFFmpeg;
