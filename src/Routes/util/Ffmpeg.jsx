import { useState, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function Ffmpeg() {
  //https://github.com/ffmpegwasm/ffmpeg.wasm
  //미리보기 이미지 가져오는 util
  //const ffmpeg = createFFmpeg({log: true});
  const ffmpeg = createFFmpeg({ log: true });
  (async () => {
    await ffmpeg.load();
  })();
  const fm = async ({ target: { files } }) => {
    const { name } = files[0];
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, '-ss', '10', 'output.png');
    const data = ffmpeg.FS('readFile', 'output.png');
    const ii = document.getElementById('ii');
    ii.src = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/png' })
    );
    console.log('finish');
  };

  return (
    <div className="App">
      <div>
        {<label>test</label>}
        {<input type="file" accept="video/*" onChange={fm}></input>}
        {<img id="ii"></img>}
        {<video id="player" controls></video>}
      </div>
    </div>
  );
}

export default Ffmpeg;
