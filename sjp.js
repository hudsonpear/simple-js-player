(function() {
  'use strict';

  const FONT_STACK = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  // Below this width (px) the back/forward/picture-in-picture buttons are
  // dropped so the controls row still fits (see .SJP_narrow in sjp.css).
  const NARROW_WIDTH = 400;
  // Longest gap (ms) between two taps that still counts as a double tap.
  const DOUBLE_TAP_MS = 300;
  // localStorage key for the remembered volume, shared by every player.
  const VOLUME_KEY = 'SJPlayer.volume';

  const YES_NO = ['1', 'yes', '0', 'no'];
  const DEFAULT_YES_NONE_NO = ['default', '1', 'yes', 'none', 'no', '0'];

  // Fixed-choice attributes, checked for typos at init (free-form ones -
  // colors, CSS values, numbers - aren't checked, there's no fixed list to
  // check them against).
  const CHOICES = [
    ['data-layout', ['default', 'd', 'mini', 'm', 'simple', 's']],
    ['data-volumeStyle', ['vertical', 'v', 'horizontal', 'h']],
    ['data-rightClickMenu', ['sjp', 'browser', 'default']],
    ['data-startPlayBtn', DEFAULT_YES_NONE_NO],
    ['data-startHideTitle', DEFAULT_YES_NONE_NO],
    ['data-startHideControls', DEFAULT_YES_NONE_NO],
    ['data-displayControls', YES_NO],
    ['data-displayTimeline', YES_NO],
    ['data-displayPreview', YES_NO],
    ['data-displayDuration', YES_NO],
    ['data-displayVolume', YES_NO],
    ['data-speedMenu', YES_NO],
    ['data-miniPlayerBtn', YES_NO],
    ['data-fullScreenBtn', YES_NO],
    ['data-forwardBtn', YES_NO],
    ['data-backBtn', YES_NO],
    ['data-tickDisplay', YES_NO],
    ['data-disableRightClick', YES_NO],
    ['data-layoutInstantFadeMouseLeave', YES_NO],
    ['data-disableLayoutFade', YES_NO],
    ['data-fullScreenDoubleClick', YES_NO],
    ['data-playsInline', YES_NO],
    ['data-rememberVolume', YES_NO],
  ];

  // Speed menu entries: [item class suffix (kept for custom CSS), rate, label].
  const SPEEDS = [
    ['zerotwofive', 0.25, '0.25x'],
    ['zerofive', 0.5, '0.5x'],
    ['zerosevenfive', 0.75, '0.75x'],
    ['onex', 1, 'Normal'],
    ['onetwofive', 1.25, '1.25x'],
    ['onefive', 1.5, '1.5x'],
    ['onesevenfive', 1.75, '1.75x'],
    ['twox', 2, '2.0x'],
  ];

  const ICON = {
    playBig: '<svg class="svg-icon" width="35%" height="35%" fill="white" style="vertical-align: middle;overflow: hidden;" viewBox="0 0 1025 1024"><path d="M398.848 253.952l322.048 234.496c13.312 12.288 13.824 32.768 2.048 46.08l-1.536 1.536L399.36 770.56c-13.312 10.24-30.72-3.072-30.72-24.064V277.504c0-20.992 16.896-34.304 30.208-23.552z m113.664-221.696c-264.704 0.512-479.232 215.552-478.72 480.768 0.512 265.216 216.064 479.744 480.768 479.232 264.704-0.512 479.232-215.04 479.232-480.256-0.512-265.216-215.552-480.256-481.28-479.744 0-0.512 0 0 0 0z m0 885.76c-224.256-0.512-405.504-182.784-404.992-406.528s182.784-405.504 406.528-404.992c223.744 0.512 404.992 182.272 404.992 406.016 0.512 223.744-181.76 405.504-406.528 405.504 0.512 0 0.512 0 0 0z"/></svg>',
    playFlash: '<svg class="SJP_playFlash" width="25%" viewBox="0 0 24 24"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z"/></svg>',
    pauseFlash: '<svg class="SJP_pauseFlash" width="25%" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>',
    replay: '<svg width="35%" height="35%" viewBox="0 0 24 24"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,18.5c-3.31,0-6-2.69-6-6h2c0,2.21,1.79,4,4,4 s4-1.79,4-4c0-2.24-1.85-4.09-4.16-3.99l1.57,1.57L12,11.5l-4-4l4-4l1.41,1.41l-1.6,1.6C15.28,6.4,18,9.18,18,12.5 C18,15.81,15.31,18.5,12,18.5z"/></svg>',
    back: '<svg class="SJP_buttonWhite" width="30" height="30" viewBox="0 0 24 24"><path d="M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z"/></svg>',
    forward: '<svg class="SJP_buttonWhite" width="30" height="30" viewBox="0 0 24 24"><path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z"/></svg>',
    volume:
      '<svg class="SJP_volumeHighIcon" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>' +
      '<svg class="SJP_volumeLowIcon" viewBox="0 0 24 24"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"/></svg>' +
      '<svg class="SJP_volumeMutedIcon" viewBox="0 0 24 24"><path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/></svg>',
    check: '<svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>',
    speed: '<svg class="SJP_strokeWhite" width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke-width="1.5" stroke-linecap="round"/><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3"/><path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke-width="1.5"/></svg>',
    pip: '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/></svg>',
    fullScreen:
      '<svg class="SJP_fullScreenOpen" width="30" height="30" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' +
      '<svg class="SJP_fullScreenClose" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
    close: '<svg class="SJP_closeBtnSvg" viewBox="0 -960 960 960"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>',
  };

  const isYes = (v) => v === '1' || v === 'yes';
  const isNo = (v) => v === '0' || v === 'no';

  // '1'/'yes' or an absent/unrecognized attribute -> visible (the
  // historical default); '0'/'no' -> hidden. Matches every
  // data-displayX toggle used below.
  function sjpShow(el, attrValue) {
    el.classList.toggle('SJP_hidden', isNo(attrValue));
  }

  // Warns (once) when a fixed-choice data-* attribute is set to something
  // that doesn't match any of its accepted values - these fail silently
  // otherwise (the code just falls back to the default), which makes
  // typos ("data-layout=\"minii\"") invisible.
  function sjpCheckAttr(videoID, attrName, value, validValues) {
    if (value != null && !validValues.includes(value)) {
      console.warn(
        `SJPlayer [${videoID}]: "${attrName}" has unrecognized value "${value}". ` +
        `Expected one of: ${validValues.join(', ')}. Using the default instead.`
      );
    }
  }

  // data-startTime: seconds ("90", "12.5") or "m:ss" / "h:mm:ss" ("1:30").
  // Returns the time in seconds, 0 when missing/default, or NaN when invalid.
  function sjpParseTime(value) {
    if (value == null || value === '' || value === 'default') return 0;
    const parts = value.trim().split(':');
    if (parts.length > 3 || parts.some((part) => part.trim() === '' || !/^\d+(\.\d+)?$/.test(part.trim()))) return NaN;
    return parts.reduce((total, part) => total * 60 + Number(part), 0);
  }

  // padStart rather than Intl.NumberFormat: locale-aware formatting would
  // render the seconds in e.g. Arabic-Indic digits next to Latin minutes.
  function formatDuration(time) {
    if (!isFinite(time)) return '0:00';
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}` : `${minutes}:${seconds}`;
  }

  // play()/requestFullscreen()/requestPictureInPicture() return promises
  // that reject on benign races (e.g. play() interrupted by pause()). Keep
  // those out of the console as unhandled rejections, but still report
  // real failures.
  function settle(promise) {
    if (promise && typeof promise.catch === 'function') {
      promise.catch((err) => {
        if (!err || err.name !== 'AbortError') console.warn('SJPlayer:', err && err.message || err);
      });
    }
  }

  // The volume the viewer last chose on any player ({ volume, muted }), or
  // null when there's none or storage is blocked (some private modes).
  function loadVolume() {
    try {
      const saved = JSON.parse(localStorage.getItem(VOLUME_KEY));
      if (saved && saved.volume >= 0 && saved.volume <= 1) {
        return { volume: Number(saved.volume), muted: !!saved.muted };
      }
    }
    catch (err) {
      // Unreadable - fall back to the page's own settings.
    }
    return null;
  }

  function saveVolume(video) {
    try {
      localStorage.setItem(VOLUME_KEY, JSON.stringify({ volume: video.volume, muted: video.muted }));
    }
    catch (err) {
      // Storage full or blocked - the volume just isn't remembered.
    }
  }

  function playerMarkup(timelineInline, volumeH, spritePreview) {
    // A sprite is shown as a background (one tile of it at a time), single
    // thumbnail files as an <img>.
    const preview = spritePreview
      ? '<div class="SJP_previewImg SJP_previewSprite"></div>'
      : '<img class="SJP_previewImg" alt="" draggable="false">';

    const timeline = `
      <div class="SJP_timelineContainer" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" aria-valuetext="0:00">
        <div class="SJP_timeline">
          ${preview}
          <span class="SJP_timeText"></span>
          <div class="SJP_thumbIndicator"></div>
        </div>
        <div class="SJP_tick"></div>
      </div>`;

    const speedItems = SPEEDS.map(([name, rate, label]) => `
      <div class="SJP_${name} SJP_menuItem" role="menuitemradio" tabindex="-1" aria-checked="false" data-rate="${rate}">
        <div class="SJP_menuItem_icon">${ICON.check}</div>
        <div class="SJP_menuItem_label">${label}</div>
      </div>`).join('');

    // Whitespace between tags is stripped: the markup then matches what the
    // old createElement()/appendChild() construction produced.
    return `
      <div class="SJP_titleDiv"><span></span></div>
      <button type="button" class="SJP_btnFlash" tabindex="-1" aria-hidden="true">${ICON.playFlash}${ICON.pauseFlash}</button>
      <button type="button" class="SJP_replay" aria-label="Replay">${ICON.replay}</button>
      <button type="button" class="SJP_playBtnM" aria-label="Play">${ICON.playBig}</button>
      <div class="SJP_skip SJP_skipBack" aria-hidden="true"></div>
      <div class="SJP_skip SJP_skipForward" aria-hidden="true"></div>
      <div class="SJP_videoControlsContainer">
        ${timelineInline ? '' : timeline}
        <div class="SJP_controls">
          <button type="button" class="SJP_playPause" aria-label="Play"></button>
          <button type="button" class="SJP_backBtn" aria-label="Rewind">${ICON.back}</button>
          <button type="button" class="SJP_forwardBtn" aria-label="Fast forward">${ICON.forward}</button>
          <div class="SJP_volumeContainer">
            <button type="button" class="SJP_muteBtn" aria-label="Mute">${ICON.volume}</button>
            <div class="${volumeH ? 'SJP_volumeDivH' : 'SJP_volumeDivV'}">
              <input type="range" class="${volumeH ? 'SJP_rangeH' : 'SJP_rangeV'} SJP_volumeSlider SJP_verticalSlider" min="0" max="1" step="any" aria-label="Volume">
            </div>
          </div>
          ${timelineInline ? timeline : ''}
          <div class="SJP_durationContainer">
            <div class="SJP_currentTime">0:00</div>
            <span>/</span>
            <div class="SJP_totalTime">0:00</div>
          </div>
          <div class="SJP_configMenuDiv">
            <div class="SJP_configDiv" role="menu" aria-label="Playback speed">${speedItems}</div>
            <button type="button" class="SJP_configBtn" aria-label="Playback speed" aria-haspopup="menu" aria-expanded="false">${ICON.speed}</button>
          </div>
          <button type="button" class="SJP_miniPlayerBtn" aria-label="Picture-in-picture">${ICON.pip}</button>
          <button type="button" class="SJP_fullScreenBtn" aria-label="Fullscreen">${ICON.fullScreen}</button>
        </div>
      </div>
      <div class="SJP_rightMenu">
        <ul class="SJP_rightMenuUL">
          <li class="SJP_rightMenuPlay">Play/Pause</li>
          <li class="SJP_rightMenuStop">Stop</li>
          <li class="SJP_rightMenuMute">Mute</li>
          <li class="SJP_rightMenuAbout">Simple JS Player v1.0.3</li>
        </ul>
      </div>
      <div class="SJP_about">
        <span>Simple JS Player v1.0.3</span>
        <br>
        <span>by: Hudson Pear (pyrus)</span>
        <button type="button" class="SJP_closeBtn" aria-label="Close">${ICON.close}</button>
      </div>`.replace(/>\s+</g, '><').trim();
  }

  // Every live player. One set of document-level listeners (keyboard,
  // click-outside, fullscreenchange) serves all of them, instead of each
  // player adding its own copies.
  const players = new Set();
  let docListenersBound = false;

  // One observer for every player: flags narrow ones (.SJP_narrow) so the
  // CSS can drop secondary buttons and shrink the preview.
  const resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('SJP_narrow', entry.contentRect.width < NARROW_WIDTH);
      });
    })
    : null;

  function bindDocListeners() {
    if (docListenersBound) return;
    docListenersBound = true;

    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return; // already handled, e.g. by the speed menu
      if (e.key === 'Escape') {
        let closed = false;
        players.forEach((player) => {
          if (player.closeMenus()) closed = true;
        });
        if (closed) e.preventDefault();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return; // leave Ctrl+F, Ctrl+L, ... to the browser
      const active = document.activeElement;
      const tag = active ? active.tagName : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (active && active.isContentEditable)) return;
      // The player holding focus wins, else the hovered one - so a shortcut
      // never fires on several players at once.
      let target = null;
      let focused = false;
      for (const player of players) {
        if (player.container.contains(active)) {
          target = player;
          focused = true;
          break;
        }
        if (!target && player.container.matches(':hover')) target = player;
      }
      if (target) target.onKey(e, tag, focused);
    });

    document.addEventListener('click', (e) => {
      players.forEach((player) => player.onDocClick(e));
    });

    document.addEventListener('fullscreenchange', () => {
      players.forEach((player) => player.onFullScreenChange(document.fullscreenElement === player.container));
    });
  }

  function setupPlayer(video) {

    video.dataset.sjpInitialized = 'true';

    const attr = (name) => video.getAttribute(name);
    // Free-form option: the attribute's value, or `fallback` when it's
    // missing, empty or "default".
    const opt = (name, fallback) => {
      const value = attr(name);
      return value && value !== 'default' ? value : fallback;
    };

    const videoID = attr('data-videoID');
    CHOICES.forEach(([name, validValues]) => sjpCheckAttr(videoID, name, attr(name), validValues));

    // 'mini'/'m' and 'simple'/'s' put the timeline inline inside the
    // controls row (full width). Everything else (incl. unknown values)
    // keeps the timeline as its own row above the controls row.
    const layout = attr('data-layout');
    const timelineInline = ['mini', 'm', 'simple', 's'].includes(layout);
    const volumeStyle = attr('data-volumeStyle');
    const volumeH = volumeStyle === 'horizontal' || volumeStyle === 'h';
    // One image holding every thumbnail (tools/make-sprite.js), instead of
    // one file per thumbnail.
    const previewSprite = opt('data-previewSprite', '');

    /* ---- Build the player around the <video> ------------------------ */

    const container = document.createElement('div');
    container.className = 'SJP_videoContainer';
    if (videoID) container.id = videoID;
    container.setAttribute('role', 'group');
    container.innerHTML = playerMarkup(timelineInline, volumeH, !!previewSprite);

    // Every element is looked up once, inside this container - never by
    // document-wide id, which broke as soon as two players shared (or
    // lacked) a data-videoID.
    const $ = (selector) => container.querySelector(selector);
    const titleDiv = $('.SJP_titleDiv');
    const playFlash = $('.SJP_playFlash');
    const pauseFlash = $('.SJP_pauseFlash');
    const replayBtn = $('.SJP_replay');
    const bigPlayBtn = $('.SJP_playBtnM');
    const skipBackBubble = $('.SJP_skipBack');
    const skipForwardBubble = $('.SJP_skipForward');
    const controlsWrap = $('.SJP_videoControlsContainer');
    const controls = $('.SJP_controls');
    const timelineWrap = $('.SJP_timelineContainer');
    const timeline = $('.SJP_timeline');
    const previewImg = $('.SJP_previewImg');
    const timeText = $('.SJP_timeText');
    const tick = $('.SJP_tick');
    const playPauseBtn = $('.SJP_playPause');
    const backBtn = $('.SJP_backBtn');
    const forwardBtn = $('.SJP_forwardBtn');
    const volumeContainer = $('.SJP_volumeContainer');
    const muteBtn = $('.SJP_muteBtn');
    const volumeSlider = $('.SJP_volumeSlider');
    const durationContainer = $('.SJP_durationContainer');
    const currentTimeElem = $('.SJP_currentTime');
    const totalTimeElem = $('.SJP_totalTime');
    const configMenuDiv = $('.SJP_configMenuDiv');
    const speedMenu = $('.SJP_configDiv');
    const configBtn = $('.SJP_configBtn');
    const miniPlayerBtn = $('.SJP_miniPlayerBtn');
    const fullScreenBtn = $('.SJP_fullScreenBtn');
    const rightMenu = $('.SJP_rightMenu');
    const rightMenuPlay = $('.SJP_rightMenuPlay');
    const rightMenuMute = $('.SJP_rightMenuMute');
    const aboutDiv = $('.SJP_about');

    const isOpen = (el) => el.style.display === 'block';

    const title = attr('data-title');
    titleDiv.firstChild.textContent = title || '';
    // Always in the DOM (just hidden when there's no title), so the
    // styling and fade code never has to null-check it.
    titleDiv.classList.toggle('SJP_hidden', !title);
    container.setAttribute('aria-label', title ? `Video player: ${title}` : 'Video player');

    // Container order: overlays, video, controls, menus.
    video.parentNode.insertBefore(container, video);
    container.insertBefore(video, controlsWrap);
    video.controls = false;
    // Without playsinline, iPhone plays in its own fullscreen player and
    // these controls are never seen.
    if (!isNo(attr('data-playsInline'))) video.playsInline = true;

    /* ---- Options ---------------------------------------------------- */

    sjpShow(controls, attr('data-displayControls'));
    sjpShow(timelineWrap, attr('data-displayTimeline'));
    sjpShow(volumeContainer, attr('data-displayVolume'));
    sjpShow(backBtn, attr('data-backBtn'));
    sjpShow(forwardBtn, attr('data-forwardBtn'));
    sjpShow(configMenuDiv, attr('data-speedMenu'));
    sjpShow(miniPlayerBtn, attr('data-miniPlayerBtn'));
    sjpShow(fullScreenBtn, attr('data-fullScreenBtn'));
    sjpShow(tick, attr('data-tickDisplay'));
    const displayDuration = attr('data-displayDuration');
    Array.from(durationContainer.children).forEach((el) => sjpShow(el, displayDuration));

    // Hide the buttons the browser can't back: Firefox has no PiP API, and
    // only iPhone's video-only fullscreen exists where element fullscreen
    // doesn't (or an iframe isn't allowed it).
    const pipSupported = !!(document.pictureInPictureEnabled && video.requestPictureInPicture && !video.disablePictureInPicture);
    if (!pipSupported) miniPlayerBtn.classList.add('SJP_hidden');
    if (!document.fullscreenEnabled && typeof video.webkitEnterFullscreen !== 'function') {
      fullScreenBtn.classList.add('SJP_hidden');
    }

    if (layout === 'simple' || layout === 's') {
      [backBtn, forwardBtn, configMenuDiv, miniPlayerBtn].forEach((el) => { el.style.display = 'none'; });
    }
    timelineWrap.style.width = timelineInline ? '100%' : 'unset';

    // Size. A width and height in px (the default is 560x315) make the
    // player responsive: that size where there's room, scaled down at the
    // same aspect ratio inside a narrower parent. Other units are used as
    // given.
    const widthAttr = attr('data-width');
    const heightAttr = attr('data-height');
    const width = !widthAttr || widthAttr === 'default' ? '560px' : widthAttr;
    const height = !heightAttr || heightAttr === 'default' ? '315px' : heightAttr;
    const maxWidth = opt('data-maxWidth', '560px');
    const pxValue = /^\d*\.?\d+px$/;
    if (pxValue.test(width) && pxValue.test(height)) {
      const cappedWidth = `min(100%, ${maxWidth})`;
      container.style.width = width;
      container.style.maxWidth = CSS.supports('max-width', cappedWidth) ? cappedWidth : '100%';
      container.style.aspectRatio = `${parseFloat(width)} / ${parseFloat(height)}`;
    }
    else {
      if (widthAttr) container.style.width = width;
      if (heightAttr) container.style.height = height;
      container.style.maxWidth = maxWidth;
    }
    container.style.maxHeight = opt('data-maxHeight', '315px');
    if (resizeObserver) resizeObserver.observe(container);

    const timelineColor = opt('data-timelineColor', 'white');
    const timelineHeight = opt('data-timelineHeight', '5px');
    const timelineHoverHeight = attr('data-timelineHeightHover') === 'same'
      ? timelineHeight
      : opt('data-timelineHeightHover', '5px');
    const tickColor = attr('data-tickColor') === 'same' ? timelineColor : opt('data-tickColor', 'white');
    const borderRadiusAttr = attr('data-borderRadius');
    const borderRadius = ['none', 'no', '0'].includes(borderRadiusAttr) ? '0px'
      : isYes(borderRadiusAttr) ? '10px'
      : opt('data-borderRadius', '10px');
    const timerColor = opt('data-timerColor', 'white');

    // [element, style property (or --custom-property), value]
    [
      [container, 'fontFamily', opt('data-font', FONT_STACK)],
      [container, '--sjp-timeline-color', timelineColor],
      [container, '--sjp-button-color', opt('data-buttonsColor', 'white')],
      [container, '--sjp-button-hover-color', opt('data-buttonsHoverColor', 'white')],
      [container, '--sjp-check-color', opt('data-checkColor', 'white')],
      [container, '--sjp-tick-color', tickColor],
      [container, '--sjp-border-radius', borderRadius],
      [container, '--sjp-controls-gradient', opt('data-controlsBackgroundColorGradient', 'linear-gradient(to top, rgba(0,0,0,.50), transparent)')],
      [titleDiv, 'color', opt('data-titleColor', 'white')],
      [controlsWrap, 'color', timerColor],
      [controlsWrap, 'padding', opt('data-controlsPadding', '0px 0px 0px 0px')],
      [controlsWrap, 'backgroundColor', opt('data-controlsBackgroundColor', 'transparent')],
      [timelineWrap, 'height', timelineHoverHeight],
      [timelineWrap, 'padding', opt('data-timelinePadding', '0px 0px 0px 0px')],
      [timelineWrap, 'cursor', opt('data-timelineCursor', 'pointer')],
      [timeline, 'height', timelineHeight],
      [timeline, 'backgroundColor', opt('data-timelineBackgroundColor', 'rgba(100,100,100,.5)')],
      [timeText, 'color', timerColor],
      [tick, 'height', timelineHoverHeight],
      [tick, 'width', opt('data-tickWidth', '4px')],
      [tick, 'top', opt('data-tickTopPos', '-2px')],
      [speedMenu, 'color', opt('data-menuTextColor', 'white')],
    ].forEach(([el, prop, value]) => {
      if (prop.startsWith('--')) el.style.setProperty(prop, value);
      else el.style[prop] = value;
    });

    const startPlayBtn = attr('data-startPlayBtn');
    if (startPlayBtn === 'none' || isNo(startPlayBtn)) bigPlayBtn.style.display = 'none';

    const startHideTitle = attr('data-startHideTitle');
    if (startHideTitle === 'default' || isYes(startHideTitle)) titleDiv.style.display = 'none';

    const startHideControls = attr('data-startHideControls');
    if (startHideControls === 'default' || isYes(startHideControls)) controlsWrap.style.display = 'none';

    // Undoes startHideTitle/startHideControls once playback is started.
    function reveal() {
      titleDiv.style.display = '';
      controlsWrap.style.display = '';
    }

    /* ---- Play / pause ----------------------------------------------- */

    const fullScreenDoubleClick = isYes(attr('data-fullScreenDoubleClick'));

    let flashTimer = 0;
    function flash(show, hide) {
      hide.classList.remove('SJP_flashing');
      show.classList.add('SJP_flashing');
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => show.classList.remove('SJP_flashing'), 240);
    }

    function playVideo() {
      settle(video.play());
    }

    function togglePlay() {
      if (video.paused) {
        playVideo();
        flash(playFlash, pauseFlash);
      }
      else {
        video.pause();
        flash(pauseFlash, playFlash);
      }
      replayBtn.style.display = 'none';
      bigPlayBtn.style.display = 'none';
      reveal();
    }

    video.addEventListener('click', (e) => {
      if (lastPointerType === 'touch') onVideoTap(e);
      else togglePlay();
    });
    video.addEventListener('dblclick', () => {
      if (fullScreenDoubleClick && lastPointerType !== 'touch') toggleFullScreen();
    });
    playPauseBtn.addEventListener('click', togglePlay);
    bigPlayBtn.addEventListener('click', togglePlay);

    replayBtn.addEventListener('click', () => {
      replayBtn.style.display = 'none';
      playVideo();
    });

    video.addEventListener('play', () => {
      container.classList.remove('SJP_paused');
      playPauseBtn.classList.add('SJP_paused');
      playPauseBtn.setAttribute('aria-label', 'Pause');
      bigPlayBtn.style.display = 'none';
      replayBtn.style.display = 'none';
      reveal();
      scheduleHide(fadeTime);
    });

    video.addEventListener('pause', () => {
      container.classList.add('SJP_paused');
      playPauseBtn.classList.remove('SJP_paused');
      playPauseBtn.setAttribute('aria-label', 'Play');
      bigPlayBtn.style.display = 'none';
      replayBtn.style.display = 'none';
      setUIVisible(true);
      updateSeekAria();
    });

    video.addEventListener('ended', () => {
      replayBtn.style.display = 'block';
      setUIVisible(true);
    });

    /* ---- Touch ------------------------------------------------------- */

    // Taps on the video work like in a phone app: a tap brings hidden
    // controls back (instead of pausing), a tap with the controls showing
    // plays/pauses, and double taps on the left/right third skip back /
    // forward - each extra tap skips again. A double tap in the middle
    // toggles fullscreen when data-fullScreenDoubleClick is on.
    let lastPointerType = 'mouse';
    let tapZone = '';
    let tapAt = 0;
    let tapCount = 0;
    let tapTimer = 0;

    container.addEventListener('pointerdown', (e) => {
      lastPointerType = e.pointerType;
      // Touching the controls is activity too: keep them up.
      if (e.pointerType === 'touch' && e.target !== video) wake();
    });

    function onVideoTap(e) {
      const rect = video.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const zone = x < 1 / 3 ? 'back' : x > 2 / 3 ? 'forward' : 'middle';
      // Where a double tap does nothing, every tap counts on its own.
      const doubleTapAction = zone !== 'middle' || fullScreenDoubleClick;
      const now = performance.now();
      tapCount = doubleTapAction && zone === tapZone && now - tapAt < DOUBLE_TAP_MS ? tapCount + 1 : 1;
      tapZone = zone;
      tapAt = now;
      clearTimeout(tapTimer);

      if (tapCount > 1) {
        if (zone === 'back') skipWithBubble(skipBackBubble, -backSec, tapCount - 1);
        else if (zone === 'forward') skipWithBubble(skipForwardBubble, forwardSec, tapCount - 1);
        else if (tapCount === 2 && fullScreenDoubleClick) toggleFullScreen();
        wake();
        return;
      }
      if (video.paused) {
        togglePlay(); // right away: iOS only allows play() during the tap itself
      }
      else if (!uiVisible) {
        wake();
      }
      else if (!doubleTapAction) {
        togglePlay();
      }
      else {
        // Could be the first half of a double tap - wait before pausing.
        tapTimer = setTimeout(togglePlay, DOUBLE_TAP_MS);
      }
    }

    // Skips and flashes "+10s" / "-10s" (the running total over a series
    // of taps) on that side of the video.
    function skipWithBubble(bubble, seconds, taps) {
      if (!isFinite(seconds)) return;
      skip(seconds);
      bubble.textContent = `${seconds < 0 ? '\u2212' : '+'}${Math.abs(seconds) * taps}s`;
      if (bubble.animate) {
        bubble.animate([{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 800, easing: 'ease-out' });
      }
    }

    /* ---- Auto-hide (layout fade) ------------------------------------ */

    const fadeEnabled = !isYes(attr('data-disableLayoutFade'));
    const fadeTimeAttr = Number(opt('data-layoutFadeTime', 2000));
    const fadeTime = fadeTimeAttr >= 0 ? fadeTimeAttr : 2000;
    const leaveFadeTime = isYes(attr('data-layoutInstantFadeMouseLeave')) ? 0 : fadeTime;

    let uiVisible = true;
    let fadeTimer = 0;
    let fadeTimerAt = 0;
    let hideAt = 0;

    // Shows/hides controls, title and cursor; a no-op when the state
    // doesn't change, so pointer moves don't rewrite styles on every event.
    function setUIVisible(visible) {
      if (visible === uiVisible) return;
      uiVisible = visible;
      controlsWrap.style.opacity = visible ? '1' : '0';
      // Hidden controls can't be hit by accident: a tap there reaches the
      // video (and brings them back) instead.
      controlsWrap.style.pointerEvents = visible ? '' : 'none';
      titleDiv.style.opacity = visible ? '1' : '0';
      // On the player, not document.body: a hidden cursor (or an inline
      // `cursor: auto`) never leaks onto the host page.
      container.style.cursor = visible ? '' : 'none';
      if (!visible) closeSpeedMenu(false);
    }

    function keyboardFocusIn(el) {
      const active = document.activeElement;
      if (!active || !el.contains(active)) return false;
      try {
        return active.matches(':focus-visible');
      }
      catch (err) {
        return true; // no :focus-visible support - assume a keyboard user
      }
    }

    // Something still needs the controls: paused, scrubbing, a menu open,
    // the pointer resting on them or keyboard focus inside them.
    function uiInUse() {
      return video.paused || scrubbing || isOpen(speedMenu) || isOpen(rightMenu) || isOpen(aboutDiv) ||
        controlsWrap.matches(':hover') || keyboardFocusIn(controlsWrap);
    }

    // Hides the UI `delay` ms from now unless it's still in use by then.
    // Repeat calls only move the deadline; the one pending timer re-checks
    // it when it fires, rather than clearing and re-creating a timer per
    // pointer move.
    function scheduleHide(delay) {
      if (!fadeEnabled) return;
      hideAt = performance.now() + delay;
      if (fadeTimer && fadeTimerAt <= hideAt) return;
      clearTimeout(fadeTimer);
      fadeTimerAt = hideAt;
      fadeTimer = setTimeout(fadeCheck, delay);
    }

    function fadeCheck() {
      const wait = hideAt - performance.now();
      if (wait > 0) {
        fadeTimerAt = hideAt;
        fadeTimer = setTimeout(fadeCheck, wait);
        return;
      }
      fadeTimer = 0;
      if (!uiInUse()) setUIVisible(false);
      else if (!video.paused) scheduleHide(fadeTime); // look again later
    }

    function wake() {
      setUIVisible(true);
      scheduleHide(fadeTime);
    }

    if (fadeEnabled) {
      // Pointer events rather than mouse events: phones fake mouse events
      // after every tap, which would undo the tap-to-show logic above.
      const ignoreTouch = (handler) => (e) => {
        if (e.pointerType !== 'touch') handler();
      };
      container.addEventListener('pointerenter', ignoreTouch(wake));
      container.addEventListener('pointermove', ignoreTouch(wake));
      container.addEventListener('pointerleave', ignoreTouch(() => scheduleHide(leaveFadeTime)));
      // Tabbing into the player brings the controls back.
      container.addEventListener('focusin', wake);
    }

    /* ---- Timeline: hover preview, scrubbing, progress, buffer ------- */

    const previewDir = opt('data-previewDir', '');
    const previewName = opt('data-previewFileName', 'preview');
    const previewFormat = opt('data-previewFileFormat', 'jpg');
    // Seconds between thumbnails (4 = ffmpeg -vf fps=1/4).
    const previewIntervalAttr = Number(opt('data-previewInterval', 4));
    const previewInterval = previewIntervalAttr > 0 ? previewIntervalAttr : 4;
    const spriteColumns = Math.max(1, parseInt(opt('data-previewSpriteColumns', '10'), 10) || 10);

    // Hidden previews aren't requested at all (they used to be downloaded
    // on every hover and then never shown).
    const showPreview = !!(previewSprite || previewDir) && !isNo(attr('data-displayPreview'));
    previewImg.classList.toggle('SJP_hidden', !showPreview);
    container.classList.toggle('SJP_hasPreview', showPreview);

    if (previewSprite) {
      if (showPreview) {
        // Fetched once, the first time the pointer comes over the player.
        container.addEventListener('pointerenter', () => {
          const image = new Image();
          image.onload = () => {
            previewImg.style.backgroundImage = `url("${previewSprite.replace(/["\\]/g, '\\$&')}")`;
          };
          image.onerror = () => { previewImg.style.visibility = 'hidden'; };
          image.src = previewSprite;
        }, { once: true });
      }
    }
    else {
      // A missing thumbnail hides the preview instead of showing a broken image.
      previewImg.addEventListener('error', () => { previewImg.style.visibility = 'hidden'; });
      previewImg.addEventListener('load', () => { previewImg.style.visibility = ''; });
    }

    // Sprite tiles run left to right, top to bottom, spriteColumns per row.
    // Percentages keep one tile exactly filling the box at any size.
    function showSpriteTile(index, count) {
      const rows = Math.ceil(count / spriteColumns);
      const col = (index - 1) % spriteColumns;
      const row = Math.floor((index - 1) / spriteColumns);
      previewImg.style.backgroundSize = `${spriteColumns * 100}% ${rows * 100}%`;
      previewImg.style.backgroundPosition =
        `${spriteColumns > 1 ? col / (spriteColumns - 1) * 100 : 0}% ${rows > 1 ? row / (rows - 1) * 100 : 0}%`;
    }

    // The preview box takes the video's shape, so 4:3 thumbnails aren't
    // stretched to 16:9.
    function updateAspect() {
      if (video.videoWidth && video.videoHeight) {
        container.style.setProperty('--sjp-preview-ar', (video.videoWidth / video.videoHeight).toFixed(4));
      }
    }

    let scrubbing = false;
    let wasPaused = false;
    let scrubPercent = 0;
    let previewIndex = 0;
    let tickShown = false;
    let lastHoverText = '';
    let lastCurrentText = '0:00';

    function onTimelineMove(e) {
      // All layout reads happen before any style writes: no forced reflow.
      // The position is measured against the bar itself (not its padded
      // container), so hover, preview and seek line up with what's drawn.
      const bar = timeline.getBoundingClientRect();
      const wrapLeft = timelineWrap.getBoundingClientRect().left;
      const x = Math.min(Math.max(e.clientX, bar.left), bar.right);
      const percent = bar.width ? (x - bar.left) / bar.width : 0;

      tick.style.left = `${x - wrapLeft}px`;
      if (!tickShown) {
        tickShown = true;
        tick.style.display = 'block';
      }
      if (scrubbing) {
        scrubPercent = percent;
        timelineWrap.style.setProperty('--progress-position', percent);
      }

      const duration = video.duration;
      if (!isFinite(duration)) return; // metadata not loaded yet
      timelineWrap.style.setProperty('--preview-position', percent);
      const time = percent * duration;
      const text = formatDuration(time);
      if (text !== lastHoverText) {
        lastHoverText = text;
        timeText.textContent = text;
      }
      if (showPreview) {
        // Thumbnail N (1-based) shows [(N-1)*interval, N*interval);
        // ffmpeg's fps filter writes round(duration / interval) of them.
        const count = Math.max(1, Math.round(duration / previewInterval));
        const index = Math.min(Math.floor(time / previewInterval) + 1, count);
        if (index !== previewIndex) {
          previewIndex = index;
          if (previewSprite) showSpriteTile(index, count);
          else previewImg.src = `${previewDir}${previewName}${index}.${previewFormat}`;
        }
      }
    }

    function endScrub(e) {
      if (!scrubbing) return;
      if (e.type === 'pointerup') onTimelineMove(e);
      scrubbing = false;
      container.classList.remove('scrubbing');
      if (isFinite(video.duration)) video.currentTime = scrubPercent * video.duration;
      if (!wasPaused) playVideo();
    }

    // Pointer events + pointer capture: mouse, touch and pen can all scrub,
    // and moves/releases outside the bar still arrive here - no permanent
    // document-level mousemove/mouseup listeners needed.
    timelineWrap.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return; // primary button only (right-click used to seek + play)
      scrubbing = true;
      wasPaused = video.paused;
      try {
        timelineWrap.setPointerCapture(e.pointerId);
      }
      catch (err) {
        // Synthetic event without an active pointer - nothing to capture.
      }
      container.classList.add('scrubbing');
      bigPlayBtn.style.display = 'none';
      replayBtn.style.display = 'none';
      video.pause();
      onTimelineMove(e);
    });
    timelineWrap.addEventListener('pointermove', onTimelineMove);
    timelineWrap.addEventListener('pointerup', endScrub);
    timelineWrap.addEventListener('pointercancel', endScrub);
    timelineWrap.addEventListener('pointerleave', () => {
      tickShown = false;
      tick.style.display = 'none';
    });

    // Screen readers: the timeline is a slider over the video's seconds.
    function updateSeekAria() {
      const duration = isFinite(video.duration) ? video.duration : 0;
      timelineWrap.setAttribute('aria-valuemax', String(Math.round(duration)));
      timelineWrap.setAttribute('aria-valuenow', String(Math.round(Math.min(video.currentTime, duration))));
      timelineWrap.setAttribute('aria-valuetext', `${formatDuration(video.currentTime)} of ${formatDuration(duration)}`);
    }
    timelineWrap.addEventListener('focus', updateSeekAria);

    video.addEventListener('timeupdate', () => {
      const text = formatDuration(video.currentTime);
      if (text !== lastCurrentText) {
        lastCurrentText = text;
        currentTimeElem.textContent = text;
        // Not while the slider has focus: a screen reader would announce
        // the new value every second during playback.
        if (document.activeElement !== timelineWrap) updateSeekAria();
      }
      // While scrubbing the bar follows the pointer, not the paused video.
      if (!scrubbing && video.duration) {
        timelineWrap.style.setProperty('--progress-position', video.currentTime / video.duration);
      }
    });

    // Buffered (loading) bar - how far the browser has downloaded around
    // the playhead, shown under the progress bar like YouTube's light-grey
    // buffer indicator.
    function updateBuffered() {
      const duration = video.duration;
      const buffered = video.buffered;
      if (!buffered.length || !isFinite(duration) || duration <= 0) return;
      let end = buffered.end(buffered.length - 1);
      for (let i = 0; i < buffered.length; i++) {
        if (buffered.start(i) <= video.currentTime && video.currentTime <= buffered.end(i)) {
          end = buffered.end(i);
          break;
        }
      }
      timelineWrap.style.setProperty('--buffer-position', Math.min(1, end / duration));
    }

    function onDurationChange() {
      totalTimeElem.textContent = formatDuration(video.duration);
      updateBuffered();
      updateSeekAria();
    }

    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('resize', updateAspect);
    video.addEventListener('progress', updateBuffered);
    video.addEventListener('seeked', () => {
      updateBuffered();
      updateSeekAria();
    });
    // Cached media can have its metadata before this code runs, in which
    // case durationchange/resize have already fired.
    if (video.readyState >= 1) {
      onDurationChange();
      updateAspect();
    }

    /* ---- Back / forward ---------------------------------------------- */

    const backSec = Number(opt('data-backSec', 10));
    const forwardSec = Number(opt('data-forwardSec', 10));

    function skip(seconds) {
      if (isFinite(seconds)) video.currentTime += seconds;
    }
    const goBack = () => skip(-backSec);
    const goForward = () => skip(forwardSec);

    backBtn.addEventListener('click', goBack);
    forwardBtn.addEventListener('click', goForward);

    /* ---- Volume ------------------------------------------------------ */

    const rememberVolume = !isNo(attr('data-rememberVolume'));

    // Only changes the viewer makes are remembered, not the page's defaults.
    function volumeChangedByUser() {
      if (rememberVolume) saveVolume(video);
    }

    function toggleMute() {
      if (video.muted) {
        video.muted = false;
        if (!video.volume) video.volume = 1;
      }
      else {
        video.muted = true;
      }
      volumeChangedByUser();
    }

    function changeVolume(delta) {
      const volume = Math.min(1, Math.max(0, Math.round((video.volume + delta) * 100) / 100));
      video.volume = volume;
      video.muted = volume === 0;
      volumeChangedByUser();
    }

    function updateVolumeUI() {
      const silent = video.muted || video.volume === 0;
      const percent = silent ? 0 : video.volume * 100;
      volumeSlider.value = silent ? 0 : video.volume;
      volumeSlider.style.background = `linear-gradient(to right, rgb(255,255,255) ${percent}%, rgba(167, 167, 167, 0.599) ${percent}%)`;
      container.dataset.volumeLevel = silent ? 'muted' : video.volume >= 0.5 ? 'high' : 'low';
      muteBtn.setAttribute('aria-label', silent ? 'Unmute' : 'Mute');
    }

    // A volume the viewer picked before (on any player) beats
    // data-volumeLevel - except on videos the page mutes on purpose, e.g.
    // for autoplay.
    const savedVolume = rememberVolume && !video.muted ? loadVolume() : null;
    const volumeLevel = attr('data-volumeLevel');
    if (savedVolume) {
      video.volume = savedVolume.volume;
      video.muted = savedVolume.muted;
    }
    else if (video.muted) {
      video.volume = 0;
    }
    else if (volumeLevel === '0') {
      video.muted = true;
    }
    else if (volumeLevel !== null && volumeLevel >= 0 && volumeLevel <= 100) {
      video.volume = volumeLevel / 100;
    }
    else {
      video.volume = 1;
    }
    updateVolumeUI();

    /* ---- Start position --------------------------------------------- */

    // Playback starts here (on play, or when the viewer hits the big play
    // button). Needs the duration, so it waits for loadedmetadata.
    const startTime = sjpParseTime(attr('data-startTime'));
    if (Number.isNaN(startTime)) {
      console.warn(`SJPlayer [${videoID}]: "data-startTime" should be seconds or m:ss / h:mm:ss. Starting at 0:00.`);
    }
    else if (startTime > 0) {
      const seekToStart = () => {
        const duration = video.duration;
        video.currentTime = Number.isFinite(duration) ? Math.min(startTime, duration) : startTime;
      };
      if (video.readyState >= 1) seekToStart();
      else video.addEventListener('loadedmetadata', seekToStart, { once: true });
    }

    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', () => {
      video.volume = volumeSlider.value;
      video.muted = Number(volumeSlider.value) === 0;
      volumeChangedByUser();
    });
    video.addEventListener('volumechange', updateVolumeUI);

    /* ---- Fullscreen & picture-in-picture ----------------------------- */

    function toggleFullScreen() {
      if (document.fullscreenElement) {
        settle(document.exitFullscreen());
      }
      else if (container.requestFullscreen) {
        settle(container.requestFullscreen());
      }
      else if (typeof video.webkitEnterFullscreen === 'function') {
        // iPhone: no element fullscreen, only the native video player's.
        try {
          video.webkitEnterFullscreen();
        }
        catch (err) {
          console.warn('SJPlayer:', err.message);
        }
      }
    }

    function onFullScreenChange(isFullScreen) {
      container.classList.toggle('SJP_fullScreen', isFullScreen);
      fullScreenBtn.setAttribute('aria-label', isFullScreen ? 'Exit fullscreen' : 'Fullscreen');
    }

    function toggleMiniPlayer() {
      if (!pipSupported) return;
      if (document.pictureInPictureElement === video) settle(document.exitPictureInPicture());
      else settle(video.requestPictureInPicture());
    }

    fullScreenBtn.addEventListener('click', toggleFullScreen);
    miniPlayerBtn.addEventListener('click', toggleMiniPlayer);

    video.addEventListener('enterpictureinpicture', () => {
      container.classList.add('SJP_miniPlayer');
      miniPlayerBtn.setAttribute('aria-label', 'Exit picture-in-picture');
    });
    video.addEventListener('leavepictureinpicture', () => {
      container.classList.remove('SJP_miniPlayer');
      miniPlayerBtn.setAttribute('aria-label', 'Picture-in-picture');
    });

    /* ---- Speed menu --------------------------------------------------- */

    const speedItems = Array.from(speedMenu.querySelectorAll('.SJP_menuItem'));

    // Ticks whichever entry matches the actual rate, however it was set.
    function syncSpeedChecks() {
      speedItems.forEach((item) => {
        const checked = Number(item.dataset.rate) === video.playbackRate;
        item.querySelector('.SJP_svg').classList.toggle('SJP_hidden', !checked);
        item.setAttribute('aria-checked', String(checked));
      });
    }

    function openSpeedMenu(focusChecked) {
      speedMenu.style.display = 'block';
      configBtn.setAttribute('aria-expanded', 'true');
      if (focusChecked) {
        (speedItems.find((item) => item.getAttribute('aria-checked') === 'true') || speedItems[0]).focus();
      }
    }

    // Returns whether the menu was open.
    function closeSpeedMenu(returnFocus) {
      if (!isOpen(speedMenu)) return false;
      speedMenu.style.display = 'none';
      configBtn.setAttribute('aria-expanded', 'false');
      if (returnFocus) configBtn.focus();
      return true;
    }

    configBtn.addEventListener('click', (e) => {
      if (isOpen(speedMenu)) closeSpeedMenu(false);
      // detail is 0 for a keyboard "click": move focus into the menu then.
      else openSpeedMenu(e.detail === 0);
    });
    speedMenu.addEventListener('click', (e) => {
      const item = e.target.closest('.SJP_menuItem');
      if (item) video.playbackRate = Number(item.dataset.rate);
    });
    speedMenu.addEventListener('keydown', (e) => {
      const index = speedItems.indexOf(document.activeElement);
      switch (e.key) {
        case 'ArrowDown':
          speedItems[(index + 1) % speedItems.length].focus();
          break;
        case 'ArrowUp':
          speedItems[(index - 1 + speedItems.length) % speedItems.length].focus();
          break;
        case 'Home':
          speedItems[0].focus();
          break;
        case 'End':
          speedItems[speedItems.length - 1].focus();
          break;
        case 'Enter':
        case ' ':
          if (index >= 0) video.playbackRate = Number(speedItems[index].dataset.rate);
          closeSpeedMenu(true);
          break;
        case 'Tab':
          closeSpeedMenu(false);
          return; // let Tab move focus as usual
        default:
          return;
      }
      e.preventDefault(); // also keeps the player's own shortcuts out of it
    });
    video.addEventListener('ratechange', syncSpeedChecks);
    syncSpeedChecks();

    /* ---- Right-click menu & about box -------------------------------- */

    const disableRightClick = isYes(attr('data-disableRightClick'));
    const rightClickMenuStyle = attr('data-rightClickMenu');

    const rightMenuActions = {
      SJP_rightMenuPlay: togglePlay,
      SJP_rightMenuStop: () => {
        video.pause();
        video.currentTime = 0;
      },
      SJP_rightMenuMute: toggleMute,
      SJP_rightMenuAbout: () => { aboutDiv.style.display = 'block'; },
    };
    rightMenu.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => {
        rightMenuActions[li.className]();
        rightMenu.style.display = 'none';
      });
    });

    container.addEventListener('contextmenu', (e) => {
      rightMenuPlay.textContent = video.paused ? 'Play' : 'Pause';
      rightMenuMute.textContent = video.muted ? 'Unmute' : 'Mute';
      if (disableRightClick) {
        e.preventDefault();
        return;
      }
      if (rightClickMenuStyle === 'sjp') {
        e.preventDefault();
        rightMenu.style.display = 'block';
        rightMenu.style.left = `${e.clientX}px`;
        rightMenu.style.top = `${e.clientY}px`;
      }
    });

    $('.SJP_closeBtn').addEventListener('click', () => { aboutDiv.style.display = 'none'; });

    /* ---- Document-level hooks (called by the shared listeners) ------- */

    // `focused`: this player holds keyboard focus (rather than just being
    // hovered).
    function onKey(e, tag, focused) {
      const key = (e.key || '').toLowerCase();
      switch (key) {
        case ' ':
          if (tag === 'BUTTON') return; // the focused button handles Space itself
          // falls through
        case 'k':
          togglePlay();
          break;
        case 'f':
          toggleFullScreen();
          break;
        case 'i':
          toggleMiniPlayer();
          break;
        case 'm':
          toggleMute();
          break;
        case 'arrowleft':
        case 'j':
          goBack();
          break;
        case 'arrowright':
        case 'l':
          goForward();
          break;
        case 'arrowup':
        case 'arrowdown':
          // Only with focus in the player: merely hovering it mustn't take
          // the arrow keys away from scrolling the page.
          if (!focused) return;
          if (document.activeElement === timelineWrap) {
            if (key === 'arrowup') goForward();
            else goBack();
          }
          else {
            changeVolume(key === 'arrowup' ? 0.05 : -0.05);
          }
          break;
        case 'home':
        case 'end':
          if (!focused) return;
          if (key === 'home') video.currentTime = 0;
          else if (isFinite(video.duration)) video.currentTime = video.duration;
          break;
        default:
          return;
      }
      e.preventDefault(); // e.g. Space would also scroll the page
    }

    function onDocClick(e) {
      if (isOpen(rightMenu) && !rightMenu.contains(e.target)) rightMenu.style.display = 'none';
      if (isOpen(speedMenu) && !configBtn.contains(e.target)) closeSpeedMenu(false);
    }

    // Escape: closes whichever menu or box is open. Returns whether one was.
    function closeMenus() {
      let closed = closeSpeedMenu(speedMenu.contains(document.activeElement));
      [rightMenu, aboutDiv].forEach((el) => {
        if (isOpen(el)) {
          el.style.display = 'none';
          closed = true;
        }
      });
      return closed;
    }

    function destroy() {
      players.delete(player);
      if (resizeObserver) resizeObserver.unobserve(container);
      clearTimeout(fadeTimer);
      clearTimeout(flashTimer);
      clearTimeout(tapTimer);
      container.remove();
    }

    const player = { container, onKey, onDocClick, closeMenus, onFullScreenChange };
    players.add(player);
    container._sjpDestroy = destroy;
  }

  function SJP_init(root) {
    bindDocListeners();
    (root || document).querySelectorAll('video.SJP_Video:not([data-sjp-initialized])').forEach((video) => {
      // One broken player (e.g. a detached <video>) mustn't stop the rest.
      try {
        setupPlayer(video);
      }
      catch (err) {
        console.error('SJPlayer: failed to initialize', video, err);
      }
    });
  }

  // Tears down a player created by SJP_init: unregisters it from the
  // shared document-level listeners, cancels its timers and removes its
  // DOM. Accepts either the '.SJP_videoContainer' wrapper or the original
  // '<video class="SJP_Video">' element (which SJP_init moves inside that
  // wrapper, so it's still a valid handle afterwards).
  function SJP_destroy(target) {
    if (!target) return;
    const container = target.classList && target.classList.contains('SJP_videoContainer')
      ? target
      : (target.closest ? target.closest('.SJP_videoContainer') : null);
    if (container && typeof container._sjpDestroy === 'function') {
      container._sjpDestroy();
    }
  }

  // window.SJPlayer.init(root) (re)scans for '.SJP_Video' elements added
  // after the page loaded (e.g. injected by an SPA/AJAX).
  // window.SJPlayer.destroy(videoOrContainer) tears one down again - call
  // it before removing a player so it stops receiving document events.
  window.SJPlayer = { init: SJP_init, destroy: SJP_destroy };

  // Also works when this script is loaded after DOMContentLoaded (async or
  // injected), where waiting for that event would never initialize.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SJP_init(document));
  }
  else {
    SJP_init(document);
  }

})();
