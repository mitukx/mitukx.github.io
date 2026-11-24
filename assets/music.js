async function initMusic() {
  const container = document.getElementById("music-list");
  if (!container) return;

  const fallbackItems = [
    {
      "title": "Sunflower (Spider-Man: Into the Spider-Verse)",
      "artist": "Post Malone & Swae Lee",
      "album": "Spider-Man: Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)",
      "duration": "2:38",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/sunflower-spider-man-into-the-spider-verse/1445949265?i=1445949267",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/f0/d6/98f0d67e-f8bf-762d-cac7-1c6b3b6b35dd/mzaf_4543283896248560946.plus.aac.p.m4a"
    },
    {
      "title": "otherside",
      "artist": "Lena Raine & Minecraft",
      "album": "Minecraft: Caves & Cliffs (Original Game Soundtrack)",
      "duration": "3:15",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/22/02/93/22029334-8161-4c8d-18c0-2fc72029ec2a/192641853173_Cover.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/otherside/1590458296?i=1590458562&l=en-US",
      "youtubeId": "kK81m-A3qpU",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/57/90/69/579069b0-a8f2-7d14-8677-001ef0d3e488/mzaf_14293920624129049819.plus.aac.p.m4a"
    },
    {
      "title": "Viva la Vida",
      "artist": "Coldplay",
      "album": "Viva la Vida (Prospekt's March Edition)",
      "duration": "4:01",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/56/bc/3d/56bc3d9c-0a4a-0466-643e-eb9bd748e8bf/190295978037.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/viva-la-vida/1122778377?i=1122778616&l=en-US",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8c/bb/68/8cbb6818-175a-d46c-93de-7145fc66d332/mzaf_5442307369244073775.plus.aac.p.m4a"
    },
    {
      "title": "Aria Math",
      "artist": "C418",
      "album": "Minecraft - Volume Beta",
      "duration": "5:10",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dc/26/fd/dc26fd7b-3f58-e34b-375c-4f7a0b70f741/859711538643.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/aria-math/1867890087?i=1867890258&l=en-US",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/22/59/71/2259717a-2598-466f-e5bb-2dd5aa4aab2b/mzaf_13083803331843097601.plus.aac.p.m4a"
    },
    {
      "title": "RPG",
      "artist": "SEKAI NO OWARI",
      "album": "SEKAI NO OWARI 2010-2019",
      "duration": "4:47",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/70/62/fa/7062fa33-45c3-2ee4-d381-b9f5b89b421c/TFCC-86713WW.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/rpg/1550926052?i=1550926491",
      "youtubeId": "96g1tr5BPDs",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ac/7f/08/ac7f0800-4004-7687-34f5-819c0b970158/mzaf_15419640291292061891.plus.aac.p.m4a"
    },
    {
      "title": "Dragon Night",
      "artist": "SEKAI NO OWARI",
      "album": "Dragon Night - Single",
      "duration": "3:51",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6c/62/3f/6c623fb3-8c57-df63-2493-c213c56dc0e1/Dragon_Night_iT.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/dragon-night/925252932?i=925252943",
      "youtubeId": "LShmJhJl-qA",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e4/46/24/e44624e4-afaf-ec1d-0b81-655838fcfd7e/mzaf_13465214947073707692.plus.aac.p.m4a"
    },
    {
      "title": "前前前世 (movie ver.)",
      "artist": "RADWIMPS",
      "album": "君の名は。",
      "duration": "4:46",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/fa/dc/81/fadc81d8-c4d4-0631-c52c-c9e7e7a74d1f/16UMGIM58500.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96-movie-ver/1518516628?i=1518516786",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6d/2a/0f/6d2a0ff2-eac8-9b00-608c-84277cafc6e0/mzaf_15420316386948041063.plus.aac.p.m4a"
    },
    {
      "title": "打上花火",
      "artist": "DAOKO×米津玄師",
      "album": "打上花火 - Single",
      "duration": "4:49",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a8/cf/1f/a8cf1f9a-d988-7c3d-b618-6ab53d12bc0d/TFCC-89632WW.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB/1263790414?i=1263790415",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/30/f3/40/30f3401c-b70e-b4a2-cf6f-5fd38d77e331/mzaf_2519243056549729566.plus.aac.p.m4a"
    },
    {
      "title": "Blinding Lights",
      "artist": "The Weeknd",
      "album": "After Hours (Deluxe)",
      "duration": "3:20",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/e1/67/03e167d6-ee05-eb32-55e9-c5040f55a8bf/20UMGIM21166.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/blinding-lights/1505683705?i=1505683988",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/44/0d/1d440dbc-9832-08e6-080d-aa1e1bacf40c/mzaf_3600642016947675074.plus.aac.p.m4a"
    },
    {
      "title": "Hype Boy",
      "artist": "NewJeans",
      "album": "NewJeans 1st EP 'New Jeans'",
      "duration": "2:59",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9b/6c/d4/9b6cd44b-1cb4-3b78-4ea8-de4b21b36022/22UMGIM83264.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/hype-boy/1636790747?i=1636790753",
      "youtubeId": "ghrlZIMDzbM",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ff/1e/c9/ff1ec975-4cd8-68c6-6717-23d06d02108a/mzaf_9011447650826563933.plus.aac.p.m4a"
    },
    {
      "title": "ETA",
      "artist": "NewJeans",
      "album": "NewJeans 2nd EP 'Get Up'",
      "duration": "2:31",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2e/c2/98/2ec298e1-83d2-c2df-7f95-b52d1ece0627/23UMGIM76839.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/eta/1698275548?i=1698275849",
      "youtubeId": "XCkpalH6Ppk",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/73/40/b6/7340b616-9308-9c0e-5c7a-c7e493b7dda1/mzaf_5147438579281800662.plus.aac.p.m4a"
    },
    {
      "title": "ロードムービー",
      "artist": "高橋優",
      "album": "ロードムービー - EP",
      "duration": "5:23",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d5/51/b7/d551b765-4384-3935-8dd6-26d4b7f1cb9e/190295835385.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E3%83%AD%E3%83%BC%E3%83%89%E3%83%A0%E3%83%BC%E3%83%93%E3%83%BC/1218863021?i=1218863058",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/09/0a/fe/090afee8-8928-ecc0-49af-3f40e60d655e/mzaf_12109257239546297107.plus.aac.p.m4a"
    },
    {
      "title": "back to friends",
      "artist": "sombr",
      "album": "back to friends - Single",
      "duration": "3:19",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5d/d5/ad/5dd5ad1b-fabf-9218-77f0-3adbfd5328ac/054391237118.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/back-to-friends/1786481196?i=1786481197",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d7/63/7d/d7637dec-cf2d-1455-3398-f1a6340359d0/mzaf_88927986796632454.plus.aac.p.m4a"
    },
    {
      "title": "BIRDS OF A FEATHER",
      "artist": "Billie Eilish",
      "album": "HIT ME HARD AND SOFT",
      "duration": "3:30",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/birds-of-a-feather/1739659134?i=1739659142",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/34/31/d3/3431d34e-847f-5d66-df83-0bce688d997e/mzaf_18106743962423782018.plus.aac.p.m4a"
    },
    {
      "title": "Beauty and a Beat",
      "artist": "Justin Bieber",
      "album": "Believe",
      "duration": "3:48",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bd/89/97/bd89971c-fc5a-47dd-5e90-a433d1b9e11f/12UMGIM31898.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/beauty-and-a-beat-feat-nicki-minaj/1440804754?i=1440805856",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/de/1c/89/de1c8933-76c3-ab04-2823-613095558263/mzaf_8803063399809023167.plus.aac.p.m4a"
    },
    {
      "title": "Sign of the Times",
      "artist": "Harry Styles",
      "album": "Harry Styles",
      "duration": "5:41",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/5e/aa/3d5eaaa3-9a86-c264-5cd5-7fac83f99a59/886446451978.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/sign-of-the-times/1226034336?i=1226034393",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bd/58/37/bd5837c2-3b3b-5f32-c292-fc0af38f6ea6/mzaf_10433939766410649853.plus.aac.p.m4a"
    },
    {
      "title": "Die For You",
      "artist": "The Weeknd",
      "album": "Starboy",
      "duration": "4:20",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/61/f8/e261f8c1-73db-9a7a-c89e-1068f19970e0/16UMGIM67863.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/die-for-you/1440871397?i=1440872304",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/50/50/1a/50501a86-bd74-e90d-8a56-68c9b5e6e7d6/mzaf_4588197682084244913.plus.aac.p.m4a"
    },
    {
      "title": "Save Your Tears",
      "artist": "The Weeknd",
      "album": "After Hours",
      "duration": "3:36",
      "explicit": true,
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/save-your-tears/1499378108?i=1499378613",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/14/4c/93/144c934b-0cf0-6862-7209-a881b7224294/mzaf_11580342643921855366.plus.aac.p.m4a"
    },
    {
      "title": "No. 1 in C major (\"Waterfall\")",
      "artist": "Maurizio Pollini",
      "album": "Chopin - Etudes, Preludes & other works",
      "duration": "1:56",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/0e/09/df/0e09dff9-91f3-c8e6-6603-8ccb369fda75/22UM1IM41835.rgb.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/12%E3%81%AE%E7%B7%B4%E7%BF%92%E6%9B%B2-%E4%BD%9C%E5%93%8110-%E7%AC%AC1%E7%95%AA-%E3%83%8F%E9%95%B7%E8%AA%BF/1658834378?i=1658834769",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a7/db/ee/a7dbee0b-98ab-a7be-fe86-b2f52d33ae87/mzaf_17413325741380057927.plus.aac.p.m4a"
    },
    {
      "title": "No. 4 in C-sharp minor (\"Torrent\")",
      "artist": "Idil Biret",
      "album": "ショパン: エチュード Op. 10, 25",
      "duration": "2:12",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m08/d02/h12/s05.aigrjlyq.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E3%82%B7%E3%83%A7%E3%83%91%E3%83%B3-%E3%82%A8%E3%83%81%E3%83%A5%E3%83%BC%E3%83%89-%E7%AC%AC4%E7%95%AA-%E5%AC%B0%E3%83%8F%E7%9F%AD%E8%AA%BF-op-10-4/19918145?i=19918074",
      "youtubeId": "UWOaNXpyNKw",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/36/cd/35/36cd3599-e05e-028e-479c-f3430f84b920/mzaf_18009511693886627461.plus.aac.p.m4a"
    },
    {
      "title": "Clair de Lune",
      "artist": "Claude Debussy",
      "performer": "Irina Mejoueva",
      "album": "Gokujou Piano Tokumori: Teiban Classic Meikyoku Best 50",
      "duration": "5:23",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/46/ba/da/46bada6b-8f5b-e4ea-db4e-8e6b45d7fa73/mzi.lklewgkk.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E6%9C%88%E3%81%AE%E5%85%89/418114054?i=418114061",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cc/24/a2/cc24a2dc-a52f-cef2-b6de-fa304c15a947/mzaf_1856293544116089784.plus.aac.p.m4a"
    },
    {
      "title": "Arabesque No. 1",
      "artist": "Claude Debussy",
      "performer": "François-Joël Thiollier",
      "album": "Debussy: Clair de Lune",
      "duration": "5:07",
      "artwork": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/28/95/c2/2895c288-d3b5-0b43-822e-1cb3c2f296fa/s05.sgnhchfc.jpg/300x300bb.jpg",
      "url": "https://music.apple.com/jp/album/%E3%83%89%E3%83%93%E3%83%A5%E3%83%83%E3%82%B7%E3%83%BC-%E3%82%A2%E3%83%A9%E3%83%99%E3%82%B9%E3%82%AF%E7%AC%AC1%E7%95%AA/29773727?i=29773544",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/59/45/11/59451168-d608-5257-02d1-52f210f2b1ed/mzaf_3567859487944298794.plus.aac.p.m4a"
    }
  ];

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };
  const previewAudio = new Audio();
  previewAudio.preload = "none";
  previewAudio.volume = 0.7;

  let carouselController = null;
  let items = fallbackItems;
  let currentTrackIndex = null;
  let playbackState = "idle";
  let playbackLocked = false;
  let selectionToken = 0;
  let cleanedUp = false;
  const listeners = [];

  const listen = (target, type, handler, options) => {
    if (!target) return;
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  };

  const canPlay = (item) => {
    try {
      const preview = new URL(item?.previewUrl || "");
      return preview.protocol === "https:" && preview.hostname === "audio-ssl.itunes.apple.com";
    } catch (_) {
      return false;
    }
  };

  const setPlaybackLock = (locked) => {
    playbackLocked = Boolean(locked);
    carouselController?.setPlaybackLock(playbackLocked);
  };

  const setStatus = (message) => {
    const status = container.querySelector("[data-music-status]");
    if (status) status.textContent = message;
  };

  const updateCards = () => {
    container.querySelectorAll("[data-music-card]").forEach((card) => {
      const index = Number(card.dataset.trackIndex);
      const isCurrent = Number.isInteger(index) && index === currentTrackIndex;
      const item = items[index];
      const isPlaying = isCurrent && playbackState === "playing";
      card.classList.toggle("is-current", isCurrent);
      card.classList.toggle("is-playing", isPlaying);
      const trackTitle = item?.title || "track";
      const trackArtist = item?.artist || item?.performer || "";
      const actionLabel = !canPlay(item)
        ? `Preview unavailable for ${trackTitle} by ${trackArtist}; open Apple Music`
        : `${isPlaying ? "Pause" : playbackState === "paused" && isCurrent ? "Resume" : "Play"} 30-second Apple Music preview of ${trackTitle} by ${trackArtist}`;
      card.querySelectorAll("[data-music-select]").forEach((button) => {
        button.setAttribute("aria-label", actionLabel);
        button.setAttribute("aria-pressed", String(isPlaying));
      });
      const playButton = card.querySelector("[data-card-play]");
      if (playButton) {
        playButton.dataset.playing = String(isPlaying);
        playButton.setAttribute("aria-label", actionLabel);
        playButton.querySelector("[data-card-play-label]").textContent = isPlaying ? "Pause" : "Play";
      }
      const state = card.querySelector("[data-card-state]");
      if (state) {
        const stateLabel = isCurrent
          ? playbackState === "playing" ? "PLAYING"
            : playbackState === "loading" ? "LOADING"
              : playbackState === "paused" ? "PAUSED"
                : playbackState === "ended" ? "ENDED"
                  : playbackState === "error" ? "UNAVAILABLE" : "READY"
          : canPlay(item) ? "" : "APPLE MUSIC";
        state.textContent = stateLabel;
        state.hidden = !stateLabel;
      }
      const appleLink = card.querySelector(".music-card-apple");
      if (appleLink && item?.url) {
        appleLink.href = item.url;
        const showBadge = isPlaying && !card.hasAttribute("data-clone");
        const badgeImage = appleLink.querySelector(".music-card-apple-badge-image");
        const textLabel = appleLink.querySelector(".music-card-apple-label");
        const attribution = appleLink.querySelector(".music-card-apple-credit");
        if (badgeImage) badgeImage.hidden = !showBadge;
        if (textLabel) textLabel.hidden = showBadge;
        if (attribution) attribution.hidden = !showBadge;
        appleLink.setAttribute("aria-label", showBadge
          ? `Listen to the full track ${trackTitle} by ${trackArtist} on Apple Music. Preview provided courtesy of iTunes.`
          : `Open ${trackTitle} by ${trackArtist} on Apple Music`);
      }
    });
  };

  const startPreview = (index) => {
    const item = items[index];
    if (!item || !canPlay(item)) {
      setStatus("This preview is unavailable. Open the track on Apple Music.");
      return;
    }
    selectionToken += 1;
    const token = selectionToken;
    previewAudio.pause();
    currentTrackIndex = index;
    playbackState = "loading";
    setPlaybackLock(true);
    updateCards();
    setStatus(`Starting the 30-second preview of ${item.title}.`);
    previewAudio.src = item.previewUrl;
    previewAudio.currentTime = 0;
    const attempt = previewAudio.play();
    if (attempt?.catch) {
      attempt.catch(() => {
        if (cleanedUp || token !== selectionToken || currentTrackIndex !== index) return;
        playbackState = "paused";
        setPlaybackLock(true);
        updateCards();
        setStatus("The preview is ready. Press the record button to start it in your browser.");
      });
    }
  };

  const selectTrack = (index) => {
    const item = items[index];
    if (!item) return;
    if (currentTrackIndex === index && playbackState === "playing") {
      previewAudio.pause();
      playbackState = "paused";
      setPlaybackLock(true);
      updateCards();
      setStatus(`Paused the preview of ${item.title}. Press the record button to resume.`);
      return;
    }
    if (currentTrackIndex === index && playbackState === "paused") {
      playbackState = "loading";
      setPlaybackLock(true);
      updateCards();
      setStatus(`Resuming the preview of ${item.title}.`);
      const token = selectionToken;
      const attempt = previewAudio.play();
      if (attempt?.catch) {
        attempt.catch(() => {
          if (cleanedUp || token !== selectionToken) return;
          playbackState = "paused";
          updateCards();
          setStatus("The preview is ready. Press the record button to start it in your browser.");
        });
      }
      return;
    }
    startPreview(index);
  };

  const cardMarkup = (item, index, isClone = false) => {
    const title = escapeHTML(item.title || "Unknown track");
    const artist = escapeHTML(item.artist || item.performer || "");
    const album = escapeHTML(item.album || "");
    const playable = canPlay(item);
    const cardAction = playable
      ? `Play 30-second Apple Music preview of ${title} by ${artist}`
      : `Open ${title} by ${artist} on Apple Music`;
    const explicit = item.explicit ? '<span class="music-explicit">E</span>' : "";
    const cloneAttrs = isClone ? ' aria-hidden="true" data-clone="true"' : "";
    const cloneTabIndex = isClone ? ' tabindex="-1"' : "";
    const art = item.artwork
      ? `<img class="music-artwork" src="${escapeHTML(item.artwork)}" alt="" loading="lazy" referrerpolicy="no-referrer" />`
      : `<span class="music-record-label-fallback">${index + 1}</span>`;
    const artFrame = `
      <span class="music-art-frame">
        <span class="music-record" aria-hidden="true">${art}<span class="music-record-hole"></span></span>
        <span class="music-card-state" data-card-state aria-hidden="true"${playable ? " hidden" : ""}>${playable ? "" : "APPLE MUSIC"}</span>
        ${playable ? `<button class="music-card-center-play" type="button" data-music-select="${index}" data-card-play aria-label="${cardAction}" aria-pressed="false"${cloneTabIndex}>
          <svg class="music-card-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7z" /></svg>
          <svg class="music-card-pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          <span class="visually-hidden" data-card-play-label>Play</span>
        </button>` : ""}
      </span>
    `;
    const metadata = `
      <span class="music-meta">
        <span class="music-title">${title}${explicit}</span>
        <span class="music-artist">${artist}</span>
        ${album ? `<span class="music-album">${album}</span>` : ""}
      </span>
    `;
    const appleLink = item.url
      ? `<a class="music-card-apple" href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer"${cloneTabIndex}>
          <span class="music-card-apple-label">Apple Music ↗</span>
          <img class="music-card-apple-badge-image" src="assets/listen-on-apple-music.png" alt="Listen on Apple Music" hidden />
          <span class="music-card-apple-credit" hidden>Provided courtesy of iTunes.</span>
        </a>`
      : "";
    return `<div class="music-card${playable ? "" : " music-card-unavailable"}" role="listitem" data-music-card data-track-index="${index}" data-playable="${playable}"${cloneAttrs}>
      ${artFrame}
      <button class="music-card-select music-card-details" type="button" data-music-select="${index}" aria-label="${cardAction}" aria-pressed="false"${cloneTabIndex}>${metadata}</button>
      ${appleLink}
    </div>`;
  };

  const render = (newItems) => {
    const list = Array.isArray(newItems) ? newItems.filter((item) => item && typeof item === "object") : [];
    if (!list.length) return;
    const oldTrack = container.querySelector(".music-track");
    const oldPosition = oldTrack?.scrollLeft || 0;
    carouselController?.destroy();
    carouselController = null;
    items = list;

    const cards = items.map((item, index) => cardMarkup(item, index, false)).join("");
    const clones = items.map((item, index) => cardMarkup(item, index, true)).join("");
    container.className = "music-carousel";
    container.innerHTML = `
      <div class="music-viewport">
        <div class="music-track" role="list" tabindex="0" aria-label="Recently played tracks">${cards}${clones}</div>
      </div>
      <span class="visually-hidden" data-music-status role="status" aria-live="polite">Choose a record to play a preview.</span>
    `;
    const track = container.querySelector(".music-track");
    if (track) track.scrollLeft = oldPosition;
    carouselController = mountCarousel(container, items.length, playbackLocked);
    updateCards();
  };
  const mountCarousel = (root, originalCount, initialPlaybackLock = false) => {
    const track = root.querySelector(".music-track");
    if (!track) return { setPlaybackLock() {}, destroy() {} };

    const SPEED = 1.1;         // px per frame (~66px/s at 60fps)
    const RESUME_DELAY = 1600; // ms of inactivity before auto-scroll resumes

    let loopWidth = 0;
    let pos = track.scrollLeft;
    let rafId = null;
    let resumeTimer = null;
    let autoEnabled = !prefersReducedMotion.matches;
    let paused = true;
    let interacting = false;
    let playbackLocked = initialPlaybackLock;
    let dragging = false;
    let dragMoved = 0;
    let dragStartX = 0;
    let lastPointerX = 0;
    let pressedSelect = null;
    let suppressNextClick = false;
    const removers = [];
    const on = (target, type, handler, options) => {
      target.addEventListener(type, handler, options);
      removers.push(() => target.removeEventListener(type, handler, options));
    };

    const updateFades = () => {
      root.classList.toggle("is-scrollable", track.scrollWidth > track.clientWidth + 4);
    };

    const measure = () => {
      const cards = track.children;
      if (cards.length < originalCount + 1) return;
      const width = cards[originalCount].offsetLeft - cards[0].offsetLeft;
      if (width > 0) loopWidth = width;
      pos = track.scrollLeft;
      updateFades();
    };

    const wrap = () => {
      if (!loopWidth) return;
      if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
      else if (track.scrollLeft < 0) track.scrollLeft += loopWidth;
    };

    const step = () => {
      rafId = requestAnimationFrame(step);
      if (paused || interacting || !autoEnabled || playbackLocked || !loopWidth) {
        pos = track.scrollLeft;
        return;
      }
      pos += SPEED;
      if (pos >= loopWidth) pos -= loopWidth;
      track.scrollLeft = pos;
    };

    const holdAuto = () => {
      interacting = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };

    const releaseAuto = (delay = RESUME_DELAY) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        interacting = false;
        pos = track.scrollLeft;
      }, delay);
    };

    const nudge = (direction) => {
      holdAuto();
      const distance = Math.max(track.clientWidth * 0.85, 180);
      let target = track.scrollLeft + direction * distance;
      if (loopWidth) {
        if (target < 0) { track.scrollLeft += loopWidth; target += loopWidth; }
        else if (target > loopWidth) { track.scrollLeft -= loopWidth; target -= loopWidth; }
      }
      track.scrollTo({ left: target, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
      releaseAuto();
    };

    const revealTrack = (index) => {
      const cards = Array.from(track.querySelectorAll("[data-music-card][data-track-index]"))
        .filter((card) => Number(card.dataset.trackIndex) === index);
      if (!cards.length) return;
      const currentCenter = track.scrollLeft + track.clientWidth / 2;
      const card = cards.reduce((closest, candidate) => {
        const candidateCenter = candidate.offsetLeft + candidate.offsetWidth / 2;
        const closestCenter = closest.offsetLeft + closest.offsetWidth / 2;
        return Math.abs(candidateCenter - currentCenter) < Math.abs(closestCenter - currentCenter)
          ? candidate
          : closest;
      });
      const target = Math.max(0, Math.min(
        track.scrollWidth - track.clientWidth,
        card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      ));
      holdAuto();
      track.scrollTo({ left: target, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
      releaseAuto();
    };

    const setAuto = (on) => {
      autoEnabled = on;
      pos = track.scrollLeft;
    };

    const onScroll = () => {
      if (interacting || paused || !autoEnabled || playbackLocked) wrap();
      updateFades();
    };
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || !loopWidth) return;
      event.preventDefault();
      holdAuto();
      track.scrollLeft += event.deltaY;
      wrap();
      releaseAuto();
    };
    const onPointerDown = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      dragMoved = 0;
      dragStartX = event.clientX;
      lastPointerX = event.clientX;
      pressedSelect = event.target.closest("[data-music-select]");
      holdAuto();
      root.classList.add("is-dragging");
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const deltaX = event.clientX - lastPointerX;
      dragMoved = Math.max(dragMoved, Math.abs(event.clientX - dragStartX));
      lastPointerX = event.clientX;
      if (event.pointerType === "touch") return;
      event.preventDefault();
      track.scrollLeft -= deltaX;
      wrap();
    };
    const endDrag = (event) => {
      if (!dragging) return;
      const selection = pressedSelect;
      const moved = dragMoved;
      dragging = false;
      pressedSelect = null;
      root.classList.remove("is-dragging");
      if (selection && moved <= 10) {
        event?.preventDefault();
        suppressNextClick = true;
        selectTrack(Number(selection.dataset.musicSelect));
        setTimeout(() => { suppressNextClick = false; }, 0);
      }
      releaseAuto();
    };
    const onClickCapture = (event) => {
      if (suppressNextClick || dragMoved > 10) {
        event.preventDefault();
        event.stopPropagation();
      }
      dragMoved = 0;
      suppressNextClick = false;
    };
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); nudge(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); nudge(-1); }
    };
    const onMotionChange = () => setAuto(!prefersReducedMotion.matches);

    on(root, "mouseenter", holdAuto);
    on(root, "mouseleave", () => releaseAuto(400));
    on(root, "focusin", holdAuto);
    on(root, "focusout", () => releaseAuto(600));
    on(track, "scroll", onScroll, { passive: true });
    on(track, "wheel", onWheel, { passive: false });
    on(track, "pointerdown", onPointerDown);
    // Keep pointer-up targeting the actual button so card clicks still bubble.
    // Global move/up handlers keep dragging usable when the pointer leaves the rail.
    on(window, "pointermove", onPointerMove);
    on(window, "pointerup", endDrag);
    on(window, "pointercancel", endDrag);
    on(track, "click", onClickCapture, true);
    on(track, "keydown", onKeyDown);
    prefersReducedMotion.addEventListener?.("change", onMotionChange);

    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          paused = !entry.isIntersecting;
          if (entry.isIntersecting && !loopWidth) measure();
        });
      }, { threshold: 0.01 });
      observer.observe(root);
    } else {
      paused = false;
    }

    let resizeObserver = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(track);
    }
    on(window, "resize", measure);

    const details = root.closest("details");
    const onDetailsToggle = () => {
      if (!details.open) { paused = true; return; }
      paused = false;
      requestAnimationFrame(measure);
    };
    if (details) {
      on(details, "toggle", onDetailsToggle);
      if (details.open) paused = false;
    }

    track.querySelectorAll("img").forEach((image) => {
      if (!image.complete) on(image, "load", measure, { once: true });
    });

    measure();
    rafId = requestAnimationFrame(step);

    return {
      setPlaybackLock(locked) {
        playbackLocked = Boolean(locked);
        pos = track.scrollLeft;
        if (playbackLocked && resumeTimer) {
          clearTimeout(resumeTimer);
          resumeTimer = null;
        }
      },
      revealTrack,
      destroy() {
        cancelAnimationFrame(rafId);
        if (resumeTimer) clearTimeout(resumeTimer);
        observer?.disconnect();
        resizeObserver?.disconnect();
        prefersReducedMotion.removeEventListener?.("change", onMotionChange);
        removers.forEach((remove) => remove());
      },
    };
  };


  const onCardClick = (event) => {
    const select = event.target.closest("[data-music-select]");
    if (!select || !container.contains(select)) return;
    event.preventDefault();
    selectTrack(Number(select.dataset.musicSelect));
  };

  listen(container, "click", onCardClick);
  listen(previewAudio, "playing", () => {
    if (cleanedUp || currentTrackIndex === null) return;
    playbackState = "playing";
    setPlaybackLock(true);
    updateCards();
    const item = items[currentTrackIndex];
    setStatus(`Playing the 30-second Apple Music preview of ${item?.title || "this track"}.`);
  });
  listen(previewAudio, "pause", () => {
    if (cleanedUp || currentTrackIndex === null || previewAudio.ended || playbackState === "loading") return;
    if (playbackState === "playing") {
      playbackState = "paused";
      setPlaybackLock(true);
      updateCards();
      setStatus(`Paused the preview of ${items[currentTrackIndex]?.title || "this track"}.`);
    }
  });
  listen(previewAudio, "ended", () => {
    if (cleanedUp || currentTrackIndex === null) return;
    playbackState = "ended";
    setPlaybackLock(false);
    updateCards();
    setStatus(`The 30-second preview of ${items[currentTrackIndex]?.title || "this track"} has ended.`);
  });
  listen(previewAudio, "error", () => {
    if (cleanedUp || currentTrackIndex === null || previewAudio.src !== items[currentTrackIndex]?.previewUrl) return;
    playbackState = "error";
    setPlaybackLock(false);
    updateCards();
    setStatus(`Apple could not play the preview for ${items[currentTrackIndex]?.title || "this track"}. Open it on Apple Music.`);
  });
  render(fallbackItems);

  const observerRoot = document.querySelector(".page-shell") || container.parentElement;
  const pageObserver = new MutationObserver(() => {
    if (!container.isConnected) window.cleanupMusic?.();
  });
  pageObserver.observe(observerRoot, { childList: true });

  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    selectionToken += 1;
    previewAudio.pause();
    previewAudio.removeAttribute("src");
    previewAudio.load();
    setPlaybackLock(false);
    carouselController?.destroy();
    carouselController = null;
    pageObserver.disconnect();
    listeners.forEach((remove) => remove());
    window.removeEventListener("pagehide", cleanup);
    if (window.cleanupMusic === cleanup) delete window.cleanupMusic;
  };
  window.cleanupMusic = cleanup;
  window.addEventListener("pagehide", cleanup);

  try {
    const response = await fetch("assets/recent-music.json", { cache: "no-store" });
    if (response.ok && !cleanedUp) {
      const jsonItems = await response.json();
      if (Array.isArray(jsonItems) && jsonItems.length > 0) render(jsonItems);
    }
  } catch (_) {
    // Keep the fallback items if the optional JSON file is unavailable.
  }
}

window.cleanupMusic?.();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMusic, { once: true });
} else {
  initMusic();
}
