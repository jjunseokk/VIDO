import React from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

//ffmpeg -i input.flv -ss 00:00:14.435 -frames:v 1 out.png
const getFFmpegFrame = (input, setCodec, setLoading) => {
  const ffmpeg = createFFmpeg({ log: true });
  ffmpeg.setLogger(({ type, message }) => {
    if (
      (type + message).includes('h264') ||
      (type + message).includes('hevc')
    ) {
      setCodec(2);
      console.log('right codec');
      setLoading(2);
    }
  });

  const fm = async ({ target: { files } }) => {
    setLoading(1);
    (async () => {
      await ffmpeg.load();
      const { name } = files[0];

      ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
      await ffmpeg
        .run(
          '-i',
          name,
          '-ss',
          '9',
          '-s',
          '600x400',
          '-frames:v',
          '1',
          'output.png'
        )
        .then((res) => {
          console.log(res);
          const data = ffmpeg.FS('readFile', 'output.png');
          const ii = document.getElementById('ii');
          ii.src = URL.createObjectURL(
            new Blob([data.buffer], { type: 'image/png' })
          );
          console.log('finish');
        })
        .catch((err) => {
          console.log(err);
          setLoading('err');
        });
      ffmpeg.exit();
    })();
  };
  input.current.addEventListener('change', fm);
};

export default getFFmpegFrame;
