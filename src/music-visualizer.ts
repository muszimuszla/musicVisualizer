document.getElementById("start").addEventListener("click", () => {
  document.getElementById("start").style.display = "none";
  document.getElementById("music-visualizer").style.display = "unset";

  //canvas
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = 0.5 * document.documentElement.clientHeight;
  const ctx = canvas.getContext("2d");

  //audio
  const context = new AudioContext();

  const audio = <HTMLAudioElement>document.getElementById("audio");
  audio.volume = 0.1;

  let src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 4096;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  let durationMinutes = 0,
    durationSeconds = 0,
    currentMinutes = 0,
    currentSeconds = 0;
  let durationMinutesText: string,
    durationSecondsText: string,
    currentMinutesText: string,
    currentSecondsText: string;

  let WIDTH: number, HEIGHT: number, barWidth: number;

  renderFrame();

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    document.getElementById("song").innerHTML = audio.currentSrc
      .split(/(\\|\/)/g)
      .pop()
      .split(".")[0]
      .split("%20")
      .join(" ");

    durationMinutes = Math.floor(+audio.duration.toFixed(0) / 60);
    durationSeconds = +audio.duration.toFixed(0) - durationMinutes * 60;
    if (durationMinutes < 10) {
      durationMinutesText = "0" + durationMinutes;
    } else durationMinutesText = durationMinutes.toString();
    if (durationSeconds < 10) {
      durationSecondsText = "0" + durationSeconds;
    } else durationSecondsText = durationSeconds.toString();

    currentMinutes = Math.floor(audio.currentTime / 60);
    currentSeconds = +audio.currentTime.toFixed(0) - currentMinutes * 60;
    if (currentMinutes < 10) {
      currentMinutesText = "0" + currentMinutes;
    } else currentMinutesText = currentMinutes.toString();
    if (currentSeconds < 10) {
      currentSecondsText = "0" + currentSeconds;
    } else currentSecondsText = currentSeconds.toString();

    if(durationSeconds>=0){
    document.getElementById("time").innerHTML =
      currentMinutesText +
      ":" +
      currentSecondsText +
      "/" +
      durationMinutesText +
      ":" +
      durationSecondsText;
    }
    
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    barWidth = WIDTH / 260 + 0.5;
    let barHeight;
    let x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r, g, b;
    let bars = 260;
    for (let i = 0; i < bars; i++) {
      barHeight = dataArray[i] * 1.2;
      var my_gradient = ctx.createLinearGradient(0, 0, 0, 200);
      my_gradient.addColorStop(0, "rgb(7,0,12)");
      my_gradient.addColorStop(0.25, "rgb(40,224,30)");
      my_gradient.addColorStop(0.5, "rgb(25,187,200)");
      my_gradient.addColorStop(1, "rgb(255,23,231)");
      ctx.fillStyle = my_gradient;
      ctx.globalAlpha = 0.8;
      let toggle = document.getElementById("toggle") as HTMLInputElement;
      if (toggle.checked)
        ctx.fillRect(x, (HEIGHT - barHeight) / 2, barWidth, barHeight);
      else ctx.fillRect(x, 0, barWidth, barHeight);
      x += barWidth - 0.5;
    }
  }

  window.onresize = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 0.5 * document.documentElement.clientHeight;
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    barWidth = WIDTH / 260 + 0.5;
  };
});
