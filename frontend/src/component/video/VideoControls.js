export const VideoControls = ({
  handlePlay,
  handleVolume,
  playing,
  volume,
}) => {
  return (
    <>
      <div className="video__controls-play" onClick={handlePlay}>
        {!playing ? "Play" : "Pause"}
      </div>
      <div className="video__controls">
        <input
          type="range"
          value={volume}
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolume}
        />
      </div>
    </>
  );
};
