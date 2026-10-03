(() => {
  window.cleanupMinecraftJukebox?.();
  const jukebox = document.querySelector('.minecraft-jukebox');
  const panel = document.querySelector('[data-jukebox-player]');
  const embed = document.querySelector('[data-jukebox-embed]');
  const message = document.querySelector('[data-minecraft-message]');
  const toggle = document.querySelector('[data-jukebox-toggle]');
  const seek = document.querySelector('[data-jukebox-seek]');
  const time = document.querySelector('[data-jukebox-time]');
  const mute = document.querySelector('[data-jukebox-mute]');
  const volume = document.querySelector('[data-jukebox-volume]');
  if (!jukebox || !panel || !embed || !message || !toggle || !seek || !time || !mute || !volume) return;

  let widget;
  let progressTimer;
  let readyTimer;
  let duration = 0;
  let scrubbing = false;
  let seekTarget = null;
  let seekDeadline = 0;
  let lastVolume = 70;
  const controls = [toggle, seek, mute, volume];

  function loadWidgetApi() {
    if (window.YT?.Player) return Promise.resolve();
    if (!window.jukeboxApiReady) {
      window.jukeboxApiReady = new Promise((resolve, reject) => {
        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => { previousReady?.(); resolve(); };
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onerror = () => { script.remove(); delete window.jukeboxApiReady; reject(new Error('Audio player unavailable')); };
        document.body.appendChild(script);
      });
    }
    return window.jukeboxApiReady;
  }

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function showPosition(position) {
    position = Math.max(0, Math.min(duration, position));
    time.textContent = `${formatTime(position)} / ${duration ? formatTime(duration) : '--:--'}`;
    const progress = duration ? position / duration : 0;
    seek.value = String(Math.round(progress * 1000));
    seek.style.setProperty('--seek-progress', `${progress * 100}%`);
    seek.setAttribute('aria-valuetext', `${formatTime(position)} of ${formatTime(duration)}`);
    panel.dataset.position = String(Math.round(position));
  }

  function showPlayback(state) {
    panel.dataset.playback = state;
    toggle.setAttribute('aria-label', state === 'playing' ? 'Pause Aria Math' : 'Play Aria Math');
  }

  function setVolume(value) {
    value = Math.max(0, Math.min(100, value));
    volume.value = String(value);
    volume.style.setProperty('--volume-progress', `${value}%`);
    mute.setAttribute('aria-pressed', String(value === 0));
    mute.setAttribute('aria-label', value === 0 ? 'Unmute audio' : 'Mute audio');
    if (value > 0) lastVolume = value;
    widget?.setVolume(value);
  }

  function stop() {
    clearInterval(progressTimer);
    clearTimeout(readyTimer);
    if (widget) { widget.destroy(); widget = null; }
    embed.replaceChildren();
    panel.hidden = true;
    showPlayback('stopped');
    scrubbing = false;
    seekTarget = null;
    showPosition(0);
    controls.forEach((control) => { control.disabled = true; });
    jukebox.setAttribute('aria-pressed', 'false');
    jukebox.setAttribute('aria-label', 'Play C418 — Aria Math');
    message.textContent = 'Music stopped.';
  }

  function showError() {
    showPlayback('error');
    controls.forEach((control) => { control.disabled = true; });
    time.textContent = 'Playback unavailable';
    message.textContent = 'Playback is unavailable. Use the Aria Math link to listen on YouTube.';
  }

  jukebox.addEventListener('click', () => {
    if (!panel.hidden) { stop(); return; }
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube.com/embed/1gqEIJoxSHA?enablejsapi=1&autoplay=1&playsinline=1&rel=0&origin=${encodeURIComponent(location.origin)}`;
    frame.title = 'Aria Math — C418 on YouTube';
    frame.tabIndex = -1;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    embed.replaceChildren(frame);
    panel.hidden = false;
    showPlayback('loading');
    showPosition(0);
    jukebox.setAttribute('aria-pressed', 'true');
    jukebox.setAttribute('aria-label', 'Stop C418 — Aria Math');
    message.textContent = 'Loading C418 — Aria Math.';
    loadWidgetApi().then(() => {
      if (!frame.isConnected) return;
      const isCurrent = () => frame.isConnected && !panel.hidden;
      readyTimer = setTimeout(() => { if (isCurrent()) showError(); }, 20000);
      widget = new window.YT.Player(frame, {
        events: {
          onReady: ({ target }) => {
            if (!isCurrent()) return;
            clearTimeout(readyTimer);
            toggle.disabled = mute.disabled = volume.disabled = false;
            setVolume(Number(volume.value));
            const updateProgress = () => {
              if (!isCurrent()) return;
              const length = Math.round(target.getDuration()) * 1000;
              if (length > 0) {
                duration = length;
                panel.dataset.duration = String(duration);
                seek.disabled = false;
              }
              const position = target.getCurrentTime() * 1000;
              if (seekTarget !== null) {
                if (Math.abs(position - seekTarget) < 2500 || Date.now() > seekDeadline) seekTarget = null;
                else return;
              }
              if (!scrubbing) showPosition(position);
            };
            updateProgress();
            progressTimer = setInterval(updateProgress, 250);
            target.playVideo();
          },
          onStateChange: ({ data }) => {
            if (!isCurrent()) return;
            if (data === window.YT.PlayerState.PLAYING) {
              showPlayback('playing');
              message.textContent = 'Playing C418 — Aria Math.';
            } else if (data === window.YT.PlayerState.PAUSED || data === window.YT.PlayerState.CUED) {
              showPlayback('paused');
              message.textContent = 'Music paused.';
            } else if (data === window.YT.PlayerState.ENDED) stop();
          },
          onAutoplayBlocked: () => {
            if (!isCurrent()) return;
            showPlayback('paused');
            message.textContent = 'Select play to start Aria Math.';
          },
          onError: () => {
            if (!isCurrent()) return;
            clearTimeout(readyTimer);
            clearInterval(progressTimer);
            showError();
          },
        },
      });
    }).catch(() => { if (frame.isConnected) showError(); });
  });

  toggle.addEventListener('click', () => {
    if (!widget) return;
    if (panel.dataset.playback === 'playing') widget.pauseVideo();
    else widget.playVideo();
  });
  seek.addEventListener('input', () => {
    scrubbing = true;
    showPosition(duration * Number(seek.value) / 1000);
  });
  seek.addEventListener('change', () => {
    const position = duration * Number(seek.value) / 1000;
    scrubbing = false;
    seekTarget = position;
    seekDeadline = Date.now() + 3000;
    widget?.seekTo(position / 1000, true);
    showPosition(position);
  });
  volume.addEventListener('input', () => setVolume(Number(volume.value)));
  mute.addEventListener('click', () => setVolume(Number(volume.value) === 0 ? lastVolume : 0));
  panel.querySelector('[data-jukebox-stop]').addEventListener('click', () => {
    stop();
    jukebox.focus({ preventScroll: true });
  });

  const observer = new MutationObserver(() => {
    if (!panel.isConnected) window.cleanupMinecraftJukebox?.();
  });
  observer.observe(document.querySelector('main.content').parentElement, { childList: true });
  window.cleanupMinecraftJukebox = () => {
    observer.disconnect();
    stop();
    window.removeEventListener('pagehide', stop);
    delete window.cleanupMinecraftJukebox;
  };
  window.addEventListener('pagehide', stop);
})();
