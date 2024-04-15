import React, { useState, useEffect } from 'react';

const videoPlayer = (video) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    progress: 0,
    speed: 1,
    isMuted: false,
  });
  const [playing, setPlaying] = useState(true);
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
    playerState,
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
