import React, { useState, useEffect } from 'react';

const videoPlayer = (video) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mute, setMute] = useState(true);
  const togglePlay = (boolean) => {
    setPlaying(boolean);
  };
  useEffect(() => {
    if (video) {
      playing ? video.play() : video.pause();
    }
  }, [playing]);

  const handleOnTimeUpdate = () => {
    // console.log(video.currentTime);
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  const handleVideoProgress = (e) => {
    const manualChange = Number(e.target.value);
    video.currentTime = (video.duration / 100) * manualChange;
    setProgress(progress);
  };

  const toggleMute = (boolean) => {
    setMute(boolean);
  };

  const handleStop = () => {
    if (video) {
      video.currentTime = 0;
      video.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (video) {
      video.addEventListener('timeupdate', handleOnTimeUpdate);
    }
  }, [video]);

  return {
    togglePlay,
    progress,
    setProgress,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
    mute,
    playing,
    handleStop,
  };
};

export default videoPlayer;
