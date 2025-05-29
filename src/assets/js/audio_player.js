const audio = document.getElementById("audio");
  const playBtn = document.querySelector(".btn-play");
  const progress = document.querySelector(".progress");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeEl = document.querySelector(".current");
  const durationEl = document.querySelector(".duration");

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = "▶";
    } else {
      audio.play();
      playBtn.textContent = "||";
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / progress.offsetWidth;
    audio.currentTime = percent * audio.duration;
  });

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }