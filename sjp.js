/*!
Simple JavaScript Video Player v1.0.1
Made by: Hudson Pear (pyrus)
2024
*/

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video.SJP_Video');

    videos.forEach((video) => {

      const videoID = video.getAttribute('data-videoID');

      const video_container = document.createElement('div');
      video_container.id = videoID;
      video_container.className = 'SJP_videoContainer';

      if (video.muted) {
        video_container.setAttribute('data-volume-level', "muted");
      }
      else {
        video_container.setAttribute('data-volume-level', "high");
      }

      const layout = video.getAttribute('data-layout');
      const borderRadius = video.getAttribute('data-borderRadius');
      const layoutFadeTime = video.getAttribute('data-layoutFadeTime');
      const volumeLevel = video.getAttribute('data-volumeLevel');
      const volumeStyle = video.getAttribute('data-volumeStyle');
      const video_width = video.getAttribute('data-width');
      const video_height = video.getAttribute('data-height');
      const video_maxWidth = video.getAttribute('data-maxWidth');
      const video_maxHeight = video.getAttribute('data-maxHeight');
      const displayControls = video.getAttribute('data-displayControls');
      const displayTimeline = video.getAttribute('data-displayTimeline');
      const displayPreview = video.getAttribute('data-displayPreview');
      const displayDuration = video.getAttribute('data-displayDuration');
      const displayVolume = video.getAttribute('data-displayVolume');
      const speedMenu = video.getAttribute('data-speedMenu');
      const displayminiPlayerBtn = video.getAttribute('data-miniPlayerBtn');
      const displayfullScreenBtn = video.getAttribute('data-fullScreenBtn');
      const disableRightClick = video.getAttribute('data-disableRightClick');
      const displayforwardBtn = video.getAttribute('data-forwardBtn');
      const forwardSec = video.getAttribute('data-forwardSec');
      const displaybackBtn = video.getAttribute('data-backBtn');
      const backSec = video.getAttribute('data-backSec');
      const font = video.getAttribute('data-font');
      const timelineColor = video.getAttribute('data-timelineColor');
      const timelineBackgroundColor = video.getAttribute('data-timelineBackgroundColor');
      const buttonsColor = video.getAttribute('data-buttonsColor');
      const buttonsHoverColor = video.getAttribute('data-buttonsHoverColor');
      const title = video.getAttribute('data-title');

      const controlsBackgroundColor = video.getAttribute('data-controlsBackgroundColor');
      const controlsBackgroundColorGradient = video.getAttribute('data-controlsBackgroundColorGradient');

      const controlsPadding = video.getAttribute('data-controlsPadding');
      
      const titleColor = video.getAttribute('data-titleColor');
      const timerColor = video.getAttribute('data-timerColor');
      const menuTextColor = video.getAttribute('data-menuTextColor');
      const checkColor = video.getAttribute('data-checkColor');

      const startPlayBtn = video.getAttribute('data-startPlayBtn');

      const startHideTitle = video.getAttribute('data-startHideTitle');
      const startHideControls = video.getAttribute('data-startHideControls');

      const timelineHeight = video.getAttribute('data-timelineHeight');
      const timelineHeightHover = video.getAttribute('data-timelineHeightHover');
      const timelinePadding = video.getAttribute('data-timelinePadding');
      const timelineCursor = video.getAttribute('data-timelineCursor');

      const rightClickMenuStyle = video.getAttribute('data-rightClickMenu');

      const tickDisplay = video.getAttribute('data-tickDisplay');
      const tickColor = video.getAttribute('data-tickColor');
      const tickWidth= video.getAttribute('data-tickWidth');
      const tickTopPos = video.getAttribute('data-tickTopPos');

      const fullScreenDoubleClick = video.getAttribute('data-fullScreenDoubleClick');

      const instantFadeMouseLeave = video.getAttribute('data-layoutInstantFadeMouseLeave');
      const disableLayoutFade = video.getAttribute('data-disableLayoutFade');

      //layoutFadeTime

      var layoutFadeTimeT
      var layoutFadeTimeT2

      if (layoutFadeTime == "default") {
        var layoutFadeTimeT = 2000;
      }
      else if (layoutFadeTime && layoutFadeTime != "default") {
        var layoutFadeTimeT = layoutFadeTime;
      }
      else {
        var layoutFadeTimeT = 2000;
      }

      if (instantFadeMouseLeave == "1" || instantFadeMouseLeave == "yes") {
        var layoutFadeTimeT2 = 0;
      }
      else if (instantFadeMouseLeave == "0" || instantFadeMouseLeave == "no") {
        var layoutFadeTimeT2 = layoutFadeTime;
      }
      else {
        var layoutFadeTimeT2 = layoutFadeTime;
      }

      const titleDiv = document.createElement('div');
      titleDiv.className = 'SJP_titleDiv';
      const titleSpan = document.createElement('span');
      titleSpan.innerText = title;
      titleDiv.appendChild(titleSpan);
      
      if (title != null || title != undefined) {
        video_container.appendChild(titleDiv);
      }

      const playBtnM = document.createElement('button');
      playBtnM.className = 'SJP_playBtnM';
      playBtnM.innerHTML = `
        <svg class="svg-icon" width="35%" height="35%" fill="white" style="vertical-align: middle;overflow: hidden;" viewBox="0 0 1025 1024">
          <path d="M398.848 253.952l322.048 234.496c13.312 12.288 13.824 32.768 2.048 46.08l-1.536 1.536L399.36 770.56c-13.312 10.24-30.72-3.072-30.72-24.064V277.504c0-20.992 16.896-34.304 30.208-23.552z m113.664-221.696c-264.704 0.512-479.232 215.552-478.72 480.768 0.512 265.216 216.064 479.744 480.768 479.232 264.704-0.512 479.232-215.04 479.232-480.256-0.512-265.216-215.552-480.256-481.28-479.744 0-0.512 0 0 0 0z m0 885.76c-224.256-0.512-405.504-182.784-404.992-406.528s182.784-405.504 406.528-404.992c223.744 0.512 404.992 182.272 404.992 406.016 0.512 223.744-181.76 405.504-406.528 405.504 0.512 0 0.512 0 0 0z" />
        </svg>`;

      const flashBtn = document.createElement('button');
      flashBtn.className = 'SJP_btnFlash';
      flashBtn.tabIndex = '-1';
      flashBtn.innerHTML = `          
          <svg class="SJP_playFlash" width="25%" tabindex="-1" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"><g><rect fill="none"/></g><g>
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z"/></g>
          </svg>
          <svg class="SJP_pauseFlash" width="25%" tabindex="-1" viewBox="0 0 24 24" >
            <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>`;
      const replayBtn = document.createElement('button');
      replayBtn.className = 'SJP_replay';
      replayBtn.tabIndex = '-1';
      replayBtn.innerHTML = `
          <svg width="35%" height="35%" enable-background="new 0 0 24 24"  viewBox="0 0 24 24" >
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,18.5c-3.31,0-6-2.69-6-6h2c0,2.21,1.79,4,4,4 s4-1.79,4-4c0-2.24-1.85-4.09-4.16-3.99l1.57,1.57L12,11.5l-4-4l4-4l1.41,1.41l-1.6,1.6C15.28,6.4,18,9.18,18,12.5 C18,15.81,15.31,18.5,12,18.5z"/>
          </svg>`;

      video_container.appendChild(flashBtn);
      video_container.appendChild(replayBtn);
      video_container.appendChild(playBtnM);

      //Insert the container before the video and then move the video inside it
      video.parentNode.insertBefore(video_container, video);
      video_container.appendChild(video);
      
      //The Video Container
      const theVideoContainer = document.getElementById(videoID);

      //Hide default controls
      video.controls = false;
  
      //Create the controls container
      const videoControls = document.createElement('div');

      videoControls.className = 'SJP_videoControlsContainer';

      const timelineContainer = document.createElement('div');
      timelineContainer.className = 'SJP_timelineContainer';
      timelineContainer.innerHTML = `
        <div class="SJP_timeline">
          <img class="SJP_previewImg">
          <span class="SJP_timeText"></span>
          <div class="SJP_thumbIndicator"></div>
        </div>`;
      
      const SJP_tick = document.createElement('div');
      SJP_tick.className = 'SJP_tick';

      const controls = document.createElement('div');
      controls.className = 'SJP_controls';

      const playPauseBtn = document.createElement('button');
      playPauseBtn.className = 'SJP_playPause';
      /*
       playPauseBtn.innerHTML = `
        <svg class="SJP_playIcon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
        <svg class="SJP_pauseIcon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>
      `; 
      */

      const backBtn = document.createElement('button');
      backBtn.className = 'SJP_backBtn';
      backBtn.innerHTML = `
        <svg class="SJP_buttonWhite" width="30" height="30" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
          <path d="M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z"/>
        </svg>`;
      const forwardBtn = document.createElement('button');
      forwardBtn.className = 'SJP_forwardBtn';
      forwardBtn.innerHTML = `
        <svg class="SJP_buttonWhite" width="30" height="30" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none"/>
          <path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z"/>
        </svg>`;
      
      const volumeContainer = document.createElement('div');
      volumeContainer.className = 'SJP_volumeContainer';

      const muteBtn = document.createElement('button');
      muteBtn.className = 'SJP_muteBtn';
      muteBtn.innerHTML = `
        <svg class="SJP_volumeHighIcon" viewBox="0 0 24 24">
          <path class="" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
        </svg>
        <svg class="SJP_volumeLowIcon" viewBox="0 0 24 24">
          <path class="" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
        </svg>
        <svg class="SJP_volumeMutedIcon" viewBox="0 0 24 24">
          <path class="" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
        </svg>
      `;

      const volumeDiv = document.createElement('div');
      if (volumeStyle == "vertical" || volumeStyle == "v") {
        volumeDiv.className = 'SJP_volumeDivV';
      }
      else if (volumeStyle == "horizontal" || volumeStyle == "h") {
        volumeDiv.className = 'SJP_volumeDivH';
      }
      else {
        volumeDiv.className = 'SJP_volumeDivV';
      }

      const volumeRange = document.createElement('input');
      if (volumeStyle == "vertical" || volumeStyle == "v") {
        volumeRange.className = 'SJP_rangeV SJP_volumeSlider SJP_verticalSlider';
      }
      else if (volumeStyle == "horizontal" || volumeStyle == "h") {
        volumeRange.className = 'SJP_rangeH SJP_volumeSlider SJP_verticalSlider';
      }
      else {
        volumeRange.className = 'SJP_rangeV SJP_volumeSlider SJP_verticalSlider';
      }

      volumeRange.type = 'range';
      volumeRange.min = '0';
      volumeRange.max = '1';
      volumeRange.step = 'any';

      if (video.muted) {
        volumeRange.value = "0";
        video.volume = "0";
      }
      else if (volumeLevel === null) {
        volumeRange.value = "1";
        video.volume = "1";
      }
      else if (volumeLevel === '0') {
        volumeRange.value = "0";
        video.muted = true;
      }
      else if (volumeLevel >= 0 && volumeLevel <= 100) {
        var theVol = volumeLevel / 100;
        volumeRange.value = theVol;
        video.volume = theVol
      }
      else {
        volumeRange.value = "1";
        video.volume = "1";
      }

      const durationContainer = document.createElement('div');
      durationContainer.className = 'SJP_durationContainer';

      const currentTime = document.createElement('div');
      currentTime.className = 'SJP_currentTime';
      currentTime.innerText = '0:00'

      const durationMiddle = document.createElement('span');
      durationMiddle.innerText = '/';
      const totalTime = document.createElement('div');
      totalTime.className = 'SJP_totalTime';
      totalTime.innerText = '0:00'

      const configMenuDiv = document.createElement('div');
      configMenuDiv.className = 'SJP_configMenuDiv';

      const SJP_configDiv = document.createElement('div');
      SJP_configDiv.className = 'SJP_configDiv';
      SJP_configDiv.innerHTML = `
        <div class="SJP_zerotwofive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16"  viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">0.25x</div>
        </div>

        <div class="SJP_zerofive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">0.5x</div>
        </div>

        <div class="SJP_zerosevenfive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">0.75x</div>
        </div>

        <div class="SJP_onex SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg " width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">Normal</div>
        </div>

        <div class="SJP_onetwofive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">1.25x</div>
        </div>

        <div class="SJP_onefive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">1.5x</div>
        </div>

        <div class="SJP_onesevenfive SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">1.75x</div>
        </div>

        <div class="SJP_twox SJP_menuItem">
          <div class="SJP_menuItem_icon">
            <svg class="SJP_svg SJP_hidden" width="16" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
          </div>
          <div class="SJP_menuItem_label">2.0x</div>
        </div>`;

      const configBtn = document.createElement('button');
      configBtn.className = 'SJP_configBtn';
      configBtn.innerHTML = `
        <svg class="SJP_strokeWhite" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3"/>
          <path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke-width="1.5"/>
        </svg>`;

      const miniPlayerBtn = document.createElement('button');
      miniPlayerBtn.className = 'SJP_miniPlayerBtn';
      miniPlayerBtn.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24">
            <path class="" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
        </svg>`;

      const fullScreenBtn = document.createElement('button');
      fullScreenBtn.className = 'SJP_fullScreenBtn';
      fullScreenBtn.innerHTML = `
        <svg class="SJP_fullScreenOpen" width="30" height="30" viewBox="0 0 24 24">
          <path class="" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
        <svg class="SJP_fullScreenClose" viewBox="0 0 24 24">
          <path class="" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>`;

      /* ---------------------------------------------------------- */

      const rightClickMenuDiv = document.createElement('div');
      rightClickMenuDiv.className = 'SJP_rightMenu';
      rightClickMenuDiv.innerHTML = `
        <ul class="SJP_rightMenuUL">
            <li class="SJP_rightMenuPlay">
                Play/Pause
            </li>
            <li class="SJP_rightMenuStop">
                Stop
            </li>
            <li class="SJP_rightMenuMute">
                Mute
            </li>
            <li class="SJP_rightMenuAbout">
              Simple JS Player v1.0
            </li>
        </ul>`;

        /* ------ABOUT--------------------------------------------- */

        const aboutDiv = document.createElement('div');
        aboutDiv.className = 'SJP_about';
        aboutDiv.innerHTML = `
          <span>Simple JS Player v1.0</span>
          <br>
          <span>by: Hudson Pear (pyrus)</span>`;

      /* LAYOUT: DEFAULT */
      if (layout == 'default' || layout == 'd') {
        controls.appendChild(playPauseBtn);

        //---------------------------------------

        controls.appendChild(backBtn);

        if (displaybackBtn == '1' || displaybackBtn == 'yes') {
          backBtn.classList.remove("SJP_hidden")
        }
        else if (displaybackBtn == '0' || displaybackBtn == 'no') {
          backBtn.classList.add("SJP_hidden")
        }
        else {
          backBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(forwardBtn);

        if (displayforwardBtn == '1' || displayforwardBtn == 'yes') {
          forwardBtn.classList.remove("SJP_hidden")
        }
        else if (displayforwardBtn == '0' || displayforwardBtn == 'no') {
          forwardBtn.classList.add("SJP_hidden")
        }
        else {
          forwardBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------
        
        controls.appendChild(volumeContainer);

        if (displayVolume == '1' || displayVolume == 'yes') {
          volumeContainer.classList.remove("SJP_hidden")
        }
        else if (displayVolume == '0' || displayVolume == 'no') {
          volumeContainer.classList.add("SJP_hidden")
        }
        else {
          volumeContainer.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(durationContainer);

        //---------------------------------------

        controls.appendChild(configMenuDiv);
        if (speedMenu == '1' || speedMenu == 'yes') {
          configMenuDiv.classList.remove("SJP_hidden")
        }
        else if (speedMenu == '0' || speedMenu == 'no') {
          configMenuDiv.classList.add("SJP_hidden")
        }
        else {
          configMenuDiv.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(miniPlayerBtn);

        if (displayminiPlayerBtn == '1' || displayminiPlayerBtn == 'yes') {
          miniPlayerBtn.classList.remove("SJP_hidden")
        }
        else if (displayminiPlayerBtn == '0' || displayminiPlayerBtn == 'no') {
          miniPlayerBtn.classList.add("SJP_hidden")
        }
        else {
          miniPlayerBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(fullScreenBtn);

        if (displayfullScreenBtn == '1' || displayfullScreenBtn == 'yes') {
          fullScreenBtn.classList.remove("SJP_hidden")
        }
        else if (displayfullScreenBtn == '0' || displayfullScreenBtn == 'no') {
          fullScreenBtn.classList.add("SJP_hidden")
        }
        else {
          fullScreenBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        volumeContainer.appendChild(muteBtn);
        volumeDiv.appendChild(volumeRange);
        volumeContainer.appendChild(volumeDiv);

        //-----------------------------------------

        durationContainer.appendChild(currentTime);
        durationContainer.appendChild(durationMiddle);
        durationContainer.appendChild(totalTime);
        
        if (displayDuration == '1' || displayDuration == 'yes') {
          currentTime.classList.remove("SJP_hidden")
          durationMiddle.classList.remove("SJP_hidden")
          totalTime.classList.remove("SJP_hidden")
        }
        else if (displayDuration == '0' || displayDuration == 'no') {
          currentTime.classList.add("SJP_hidden")
          durationMiddle.classList.add("SJP_hidden")
          totalTime.classList.add("SJP_hidden")
        }
        else {
          currentTime.classList.remove("SJP_hidden")       
          durationMiddle.classList.remove("SJP_hidden")       
          totalTime.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------

        configMenuDiv.appendChild(SJP_configDiv);
        configMenuDiv.appendChild(configBtn);
         
        //-----------------------------------------------------
        
        videoControls.appendChild(timelineContainer);

        if (displayTimeline == '1' || displayTimeline == 'yes') {
          timelineContainer.classList.remove("SJP_hidden")
        }
        else if (displayTimeline == '0' || displayTimeline == 'no') {
          timelineContainer.classList.add("SJP_hidden")
        }
        else {
          timelineContainer.classList.remove("SJP_hidden")       
        }

        timelineContainer.appendChild(SJP_tick);

        //-----------------------------------------------------

        videoControls.appendChild(controls);

        if (displayControls == '1' || displayControls == 'yes') {
          controls.classList.remove("SJP_hidden")
        }
        else if (displayControls == '0' || displayControls == 'no') {
          controls.classList.add("SJP_hidden")
        }
        else {
          controls.classList.remove("SJP_hidden")
        }

        //-----------------------------------------------------

        video_container.appendChild(videoControls);
        
        //-----------------------------------------------------

        //const previewImg = document.querySelector(".SJP_previewImg")
        const previewImg = theVideoContainer.querySelector(".SJP_previewImg")

        if (displayPreview == '1' || displayPreview == 'yes') {
          previewImg.classList.remove("SJP_hidden")
        }
        else if (displayPreview == '0' || displayPreview == 'no') {
          previewImg.classList.add("SJP_hidden")
        }
        else {
          previewImg.classList.remove("SJP_hidden")
        }

        video_container.appendChild(rightClickMenuDiv);
        video_container.appendChild(aboutDiv);
        
        theVideoContainer.querySelector('.SJP_timelineContainer').style.width = 'unset';

      } //LAYOUT DEFAULT

      /* LAYOUT: MINI */
      else if (layout == 'mini' || layout == 'm') {
        controls.appendChild(playPauseBtn);
        
        //---------------------------------------
        controls.appendChild(backBtn);

        if (displaybackBtn == '1' || displaybackBtn == 'yes') {
          backBtn.classList.remove("SJP_hidden")
        }
        else if (displaybackBtn == '0' || displaybackBtn == 'no') {
          backBtn.classList.add("SJP_hidden")
        }
        else {
          backBtn.classList.remove("SJP_hidden")       
        }
        //---------------------------------------

        controls.appendChild(forwardBtn);

        if (displayforwardBtn == '1' || displayforwardBtn == 'yes') {
          forwardBtn.classList.remove("SJP_hidden")
        }
        else if (displayforwardBtn == '0' || displayforwardBtn == 'no') {
          forwardBtn.classList.add("SJP_hidden")
        }
        else {
          forwardBtn.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------------------

        controls.appendChild(volumeContainer);

        if (displayVolume == '1' || displayVolume == 'yes') {
          volumeContainer.classList.remove("SJP_hidden")
        }
        else if (displayVolume == '0' || displayVolume == 'no') {
          volumeContainer.classList.add("SJP_hidden")
        }
        else {
          volumeContainer.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------------------

        controls.appendChild(timelineContainer);

        if (displayTimeline == '1' || displayTimeline == 'yes') {
          timelineContainer.classList.remove("SJP_hidden")
        }
        else if (displayTimeline == '0' || displayTimeline == 'no') {
          timelineContainer.classList.add("SJP_hidden")
        }
        else {
          timelineContainer.classList.remove("SJP_hidden")       
        }

        timelineContainer.appendChild(SJP_tick);

        controls.appendChild(durationContainer);

        //---------------------------------------

        controls.appendChild(configMenuDiv);
        if (speedMenu == '1' || speedMenu == 'yes') {
          configMenuDiv.classList.remove("SJP_hidden")
        }
        else if (speedMenu == '0' || speedMenu == 'no') {
          configMenuDiv.classList.add("SJP_hidden")
        }
        else {
          configMenuDiv.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(miniPlayerBtn);

        if (displayminiPlayerBtn == '1' || displayminiPlayerBtn == 'yes') {
          miniPlayerBtn.classList.remove("SJP_hidden")
        }
        else if (displayminiPlayerBtn == '0' || displayminiPlayerBtn == 'no') {
          miniPlayerBtn.classList.add("SJP_hidden")
        }
        else {
          miniPlayerBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(fullScreenBtn);

        if (displayfullScreenBtn == '1' || displayfullScreenBtn == 'yes') {
          fullScreenBtn.classList.remove("SJP_hidden")
        }
        else if (displayfullScreenBtn == '0' || displayfullScreenBtn == 'no') {
          fullScreenBtn.classList.add("SJP_hidden")
        }
        else {
          fullScreenBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        volumeContainer.appendChild(muteBtn);
        volumeDiv.appendChild(volumeRange);
        volumeContainer.appendChild(volumeDiv);

        //-----------------------------------------

        durationContainer.appendChild(currentTime);
        durationContainer.appendChild(durationMiddle);
        durationContainer.appendChild(totalTime);
        
        if (displayDuration == '1' || displayDuration == 'yes') {
          currentTime.classList.remove("SJP_hidden")
          durationMiddle.classList.remove("SJP_hidden")
          totalTime.classList.remove("SJP_hidden")
        }
        else if (displayDuration == '0' || displayDuration == 'no') {
          currentTime.classList.add("SJP_hidden")
          durationMiddle.classList.add("SJP_hidden")
          totalTime.classList.add("SJP_hidden")
        }
        else {
          currentTime.classList.remove("SJP_hidden")       
          durationMiddle.classList.remove("SJP_hidden")       
          totalTime.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------

        configMenuDiv.appendChild(SJP_configDiv);
        configMenuDiv.appendChild(configBtn);

        //-----------------------------------------------------

        videoControls.appendChild(controls);

        if (displayControls == '1' || displayControls == 'yes') {
          controls.classList.remove("SJP_hidden")
        }
        else if (displayControls == '0' || displayControls == 'no') {
          controls.classList.add("SJP_hidden")
        }
        else {
          controls.classList.remove("SJP_hidden")
        }

        //-----------------------------------------------------

        video_container.appendChild(videoControls);
        
        //-----------------------------------------------------

        //const previewImg = document.querySelector(".SJP_previewImg")
        const previewImg = theVideoContainer.querySelector(".SJP_previewImg")

        if (displayPreview == '1' || displayPreview == 'yes') {
          previewImg.classList.remove("SJP_hidden")
        }
        else if (displayPreview == '0' || displayPreview == 'no') {
          previewImg.classList.add("SJP_hidden")
        }
        else {
          previewImg.classList.remove("SJP_hidden")
        }

        video_container.appendChild(rightClickMenuDiv);
        video_container.appendChild(aboutDiv);
 
        theVideoContainer.querySelector('.SJP_timelineContainer').style.width = '100%';

      } //LAYOUT MINI

      /* LAYOUT: SIMPLE */
      else if (layout == 'simple' || layout == 's') {
        controls.appendChild(playPauseBtn);
        
        //---------------------------------------

        controls.appendChild(backBtn);

        if (displaybackBtn == '1' || displaybackBtn == 'yes') {
          backBtn.classList.remove("SJP_hidden")
        }
        else if (displaybackBtn == '0' || displaybackBtn == 'no') {
          backBtn.classList.add("SJP_hidden")
        }
        else {
          backBtn.classList.remove("SJP_hidden")       
        }

        backBtn.style.display = "none";

        //---------------------------------------

        controls.appendChild(forwardBtn);

        if (displayforwardBtn == '1' || displayforwardBtn == 'yes') {
          forwardBtn.classList.remove("SJP_hidden")
        }
        else if (displayforwardBtn == '0' || displayforwardBtn == 'no') {
          forwardBtn.classList.add("SJP_hidden")
        }
        else {
          forwardBtn.classList.remove("SJP_hidden")       
        }

        forwardBtn.style.display = "none";

        //-----------------------------------------------------

        controls.appendChild(volumeContainer);

        if (displayVolume == '1' || displayVolume == 'yes') {
          volumeContainer.classList.remove("SJP_hidden")
        }
        else if (displayVolume == '0' || displayVolume == 'no') {
          volumeContainer.classList.add("SJP_hidden")
        }
        else {
          volumeContainer.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------------------

        controls.appendChild(timelineContainer);

        if (displayTimeline == '1' || displayTimeline == 'yes') {
          timelineContainer.classList.remove("SJP_hidden")
        }
        else if (displayTimeline == '0' || displayTimeline == 'no') {
          timelineContainer.classList.add("SJP_hidden")
        }
        else {
          timelineContainer.classList.remove("SJP_hidden")       
        }

        timelineContainer.appendChild(SJP_tick);

        controls.appendChild(durationContainer);

        //---------------------------------------

        controls.appendChild(configMenuDiv);
        if (speedMenu == '1' || speedMenu == 'yes') {
          configMenuDiv.classList.remove("SJP_hidden")
        }
        else if (speedMenu == '0' || speedMenu == 'no') {
          configMenuDiv.classList.add("SJP_hidden")
        }
        else {
          configMenuDiv.classList.remove("SJP_hidden")       
        }

        configMenuDiv.style.display = "none";

        //---------------------------------------

        controls.appendChild(miniPlayerBtn);

        if (displayminiPlayerBtn == '1' || displayminiPlayerBtn == 'yes') {
          miniPlayerBtn.classList.remove("SJP_hidden")
        }
        else if (displayminiPlayerBtn == '0' || displayminiPlayerBtn == 'no') {
          miniPlayerBtn.classList.add("SJP_hidden")
        }
        else {
          miniPlayerBtn.classList.remove("SJP_hidden")       
        }

        miniPlayerBtn.style.display = "none";

        //---------------------------------------

        controls.appendChild(fullScreenBtn);

        if (displayfullScreenBtn == '1' || displayfullScreenBtn == 'yes') {
          fullScreenBtn.classList.remove("SJP_hidden")
        }
        else if (displayfullScreenBtn == '0' || displayfullScreenBtn == 'no') {
          fullScreenBtn.classList.add("SJP_hidden")
        }
        else {
          fullScreenBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        volumeContainer.appendChild(muteBtn);
        volumeDiv.appendChild(volumeRange);
        volumeContainer.appendChild(volumeDiv);

        //-----------------------------------------

        durationContainer.appendChild(currentTime);
        durationContainer.appendChild(durationMiddle);
        durationContainer.appendChild(totalTime);
        
        if (displayDuration == '1' || displayDuration == 'yes') {
          currentTime.classList.remove("SJP_hidden")
          durationMiddle.classList.remove("SJP_hidden")
          totalTime.classList.remove("SJP_hidden")
        }
        else if (displayDuration == '0' || displayDuration == 'no') {
          currentTime.classList.add("SJP_hidden")
          durationMiddle.classList.add("SJP_hidden")
          totalTime.classList.add("SJP_hidden")
        }
        else {
          currentTime.classList.remove("SJP_hidden")       
          durationMiddle.classList.remove("SJP_hidden")       
          totalTime.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------

        configMenuDiv.appendChild(SJP_configDiv);
        configMenuDiv.appendChild(configBtn);

        //-----------------------------------------------------

        videoControls.appendChild(controls);

        if (displayControls == '1' || displayControls == 'yes') {
          controls.classList.remove("SJP_hidden")
        }
        else if (displayControls == '0' || displayControls == 'no') {
          controls.classList.add("SJP_hidden")
        }
        else {
          controls.classList.remove("SJP_hidden")
        }

        //-----------------------------------------------------

        video_container.appendChild(videoControls);
        
        //-----------------------------------------------------

        //const previewImg = document.querySelector(".SJP_previewImg")
        const previewImg = theVideoContainer.querySelector(".SJP_previewImg")

        if (displayPreview == '1' || displayPreview == 'yes') {
          previewImg.classList.remove("SJP_hidden")
        }
        else if (displayPreview == '0' || displayPreview == 'no') {
          previewImg.classList.add("SJP_hidden")
        }
        else {
          previewImg.classList.remove("SJP_hidden")
        }

        video_container.appendChild(rightClickMenuDiv);
        video_container.appendChild(aboutDiv);

        theVideoContainer.querySelector('.SJP_timelineContainer').style.width = '100%';

      } //LAYOUT SIMPLE

      /* LAYOUT: ELSE/DEFAULT */
      else {
       controls.appendChild(playPauseBtn);

        //---------------------------------------

        controls.appendChild(backBtn);

        if (displaybackBtn == '1' || displaybackBtn == 'yes') {
          backBtn.classList.remove("SJP_hidden")
        }
        else if (displaybackBtn == '0' || displaybackBtn == 'no') {
          backBtn.classList.add("SJP_hidden")
        }
        else {
          backBtn.classList.remove("SJP_hidden")       
        }
        //---------------------------------------

        controls.appendChild(forwardBtn);

        if (displayforwardBtn == '1' || displayforwardBtn == 'yes') {
          forwardBtn.classList.remove("SJP_hidden")
        }
        else if (displayforwardBtn == '0' || displayforwardBtn == 'no') {
          forwardBtn.classList.add("SJP_hidden")
        }
        else {
          forwardBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------
        
        controls.appendChild(volumeContainer);

        if (displayVolume == '1' || displayVolume == 'yes') {
          volumeContainer.classList.remove("SJP_hidden")
        }
        else if (displayVolume == '0' || displayVolume == 'no') {
          volumeContainer.classList.add("SJP_hidden")
        }
        else {
          volumeContainer.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(durationContainer);

        //---------------------------------------

        controls.appendChild(configMenuDiv);
        if (speedMenu == '1' || speedMenu == 'yes') {
          configMenuDiv.classList.remove("SJP_hidden")
        }
        else if (speedMenu == '0' || speedMenu == 'no') {
          configMenuDiv.classList.add("SJP_hidden")
        }
        else {
          configMenuDiv.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(miniPlayerBtn);

        if (displayminiPlayerBtn == '1' || displayminiPlayerBtn == 'yes') {
          miniPlayerBtn.classList.remove("SJP_hidden")
        }
        else if (displayminiPlayerBtn == '0' || displayminiPlayerBtn == 'no') {
          miniPlayerBtn.classList.add("SJP_hidden")
        }
        else {
          miniPlayerBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        controls.appendChild(fullScreenBtn);

        if (displayfullScreenBtn == '1' || displayfullScreenBtn == 'yes') {
          fullScreenBtn.classList.remove("SJP_hidden")
        }
        else if (displayfullScreenBtn == '0' || displayfullScreenBtn == 'no') {
          fullScreenBtn.classList.add("SJP_hidden")
        }
        else {
          fullScreenBtn.classList.remove("SJP_hidden")       
        }

        //---------------------------------------

        volumeContainer.appendChild(muteBtn);
        volumeDiv.appendChild(volumeRange);
        volumeContainer.appendChild(volumeDiv);

        //-----------------------------------------

        durationContainer.appendChild(currentTime);
        durationContainer.appendChild(durationMiddle);
        durationContainer.appendChild(totalTime);
        
        if (displayDuration == '1' || displayDuration == 'yes') {
          currentTime.classList.remove("SJP_hidden")
          durationMiddle.classList.remove("SJP_hidden")
          totalTime.classList.remove("SJP_hidden")
        }
        else if (displayDuration == '0' || displayDuration == 'no') {
          currentTime.classList.add("SJP_hidden")
          durationMiddle.classList.add("SJP_hidden")
          totalTime.classList.add("SJP_hidden")
        }
        else {
          currentTime.classList.remove("SJP_hidden")       
          durationMiddle.classList.remove("SJP_hidden")       
          totalTime.classList.remove("SJP_hidden")       
        }

        //-----------------------------------------

        configMenuDiv.appendChild(SJP_configDiv);
        configMenuDiv.appendChild(configBtn);
         
        //-----------------------------------------------------
        
        videoControls.appendChild(timelineContainer);

        if (displayTimeline == '1' || displayTimeline == 'yes') {
          timelineContainer.classList.remove("SJP_hidden")
        }
        else if (displayTimeline == '0' || displayTimeline == 'no') {
          timelineContainer.classList.add("SJP_hidden")
        }
        else {
          timelineContainer.classList.remove("SJP_hidden")       
        }

        timelineContainer.appendChild(SJP_tick);

        //-----------------------------------------------------

        videoControls.appendChild(controls);

        if (displayControls == '1' || displayControls == 'yes') {
          controls.classList.remove("SJP_hidden")
        }
        else if (displayControls == '0' || displayControls == 'no') {
          controls.classList.add("SJP_hidden")
        }
        else {
          controls.classList.remove("SJP_hidden")
        }

        //-----------------------------------------------------

        video_container.appendChild(videoControls);
        
        //-----------------------------------------------------

        //const previewImg = document.querySelector(".SJP_previewImg")
        const previewImg = theVideoContainer.querySelector(".SJP_previewImg")

        if (displayPreview == '1' || displayPreview == 'yes') {
          previewImg.classList.remove("SJP_hidden")
        }
        else if (displayPreview == '0' || displayPreview == 'no') {
          previewImg.classList.add("SJP_hidden")
        }
        else {
          previewImg.classList.remove("SJP_hidden")
        }

        video_container.appendChild(rightClickMenuDiv);
        video_container.appendChild(aboutDiv);

        theVideoContainer.querySelector('.SJP_timelineContainer').style.width = 'unset';

      }//LAYOUT ELSE/DEFAULT

      //RIGHTCLICK MENU

      const theRightClickMenu = theVideoContainer.querySelector(".SJP_rightMenu")
      const SJP_rightMenuPlay = theVideoContainer.querySelector(".SJP_rightMenuPlay")
      const SJP_rightMenuStop = theVideoContainer.querySelector(".SJP_rightMenuStop")
      const SJP_rightMenuMute = theVideoContainer.querySelector(".SJP_rightMenuMute")
      const SJP_rightMenuAbout = theVideoContainer.querySelector(".SJP_rightMenuAbout")

      SJP_rightMenuPlay.addEventListener('click', function(event) {
        togglePlay();
        theRightClickMenu.style.display = 'none'
      });
      SJP_rightMenuStop.addEventListener('click', function(event) {
        video.pause();
        video.currentTime = 0;
        theRightClickMenu.style.display = 'none'
      });
      SJP_rightMenuMute.addEventListener('click', function(event) {
        toggleMute();
        theRightClickMenu.style.display = 'none'
      });
      SJP_rightMenuAbout.addEventListener('click', function(event) {

        theRightClickMenu.style.display = 'none'
      });

      video_container.addEventListener('contextmenu', function(event) {
        SJP_rightMenuPlay.innerText = video.paused ? 'Play' : 'Pause';
        SJP_rightMenuMute.innerText = video.muted ? 'Unmute' : 'Mute';

        if (disableRightClick == '1' || disableRightClick == 'yes') {
          event.preventDefault();
          return;
        }
        else if (disableRightClick == '0' || disableRightClick == 'no') { 
          if (rightClickMenuStyle == "sjp") {
            event.preventDefault();
            theRightClickMenu.style.display = 'block'
            theRightClickMenu.style.left = event.clientX-10 + 'px';
            theRightClickMenu.style.top = event.clientY-10 + 'px';
          }
          else if (rightClickMenuStyle == "browser") { }
          else if (rightClickMenuStyle == "default") { }
          else {  }
        }
        else {
          if (rightClickMenuStyle == "sjp") {
            event.preventDefault();
            theRightClickMenu.style.display = 'block'
            theRightClickMenu.style.left = event.clientX-10 + 'px';
            theRightClickMenu.style.top = event.clientY-10 + 'px';
          }
          else if (rightClickMenuStyle == "browser") { }
          else if (rightClickMenuStyle == "default") { }
          else {  }
        }
      });

      document.addEventListener('click', function(event) {
        if (!theRightClickMenu.contains(event.target)) {
          theRightClickMenu.style.display = 'none';
        }
      });

      // Back & Forward

      const backBtn1 = theVideoContainer.querySelector(".SJP_backBtn")
      const forwardBtn1 = theVideoContainer.querySelector(".SJP_forwardBtn")

      backBtn1.addEventListener('click', goBack) 
      forwardBtn1.addEventListener('click', goForward) 

      function goBack() {
        if (backSec == "" || backSec == null || backSec == undefined) {
          skip(-10);
          return;
        }
        if (!isNaN(backSec)) {
          skip(-backSec);
        }
      }
      
      function goForward() {
        if (forwardSec == "" || forwardSec == null || forwardSec == undefined) {
          skip(+10);
          return;
        }
        if (!isNaN(forwardSec)) {
          skip(+forwardSec);
        } 
      }
      
      function skip(seconds) {
        if (!isNaN(seconds) && isFinite(seconds)) {
          video.currentTime += seconds;
        }
      }

      const videoContainer = theVideoContainer;
      
      //WIDTH
      if (video_width == "default") {
        videoContainer.style.width = "560px";
      }
      else if (video_width && video_width != "default") {
        videoContainer.style.width = video_width;
      }
      else {
        
      }
      //HEIGHT
      if (video_height == "default") {
        videoContainer.style.height = "315px";
      }
      else if (video_height && video_height != "default") {
        videoContainer.style.height = video_height;
      }
      else {
        
      }

      //-------MAX------------------

      //MAX WIDTH
      if (video_maxWidth == "default") {
        videoContainer.style.maxWidth = "560px";
      }
      else if (video_maxWidth && video_maxWidth != "default") {
        videoContainer.style.maxWidth = video_maxWidth;
      }
      else {
        videoContainer.style.maxWidth = "560px";
      }
      //MAX HEIGHT
      if (video_maxHeight == "default") {
        videoContainer.style.maxHeight = "315px";
      }
      else if (video_maxHeight && video_maxHeight != "default") {
        videoContainer.style.maxHeight = video_maxHeight;
      }
      else {
        videoContainer.style.maxHeight = "315px";
      }

      //------------------------------------------

      if (font == "default") {
        videoContainer.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      }
      else if (font && font != "default") {
        videoContainer.style.fontFamily = font;
      }
      else {
        videoContainer.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      }

      //TIMELINE AFTER COLOR-----------------------------------------

      if (timelineColor == "default") {
        var timelineAfterColor = `
          #${videoID} .SJP_timeline::after {
            background-color: white;
          }
          #${videoID} .SJP_timeline .SJP_thumbIndicator {
            background-color: white;
          }
        `;
      }
      else if (timelineColor && timelineColor != "default") {
        var timelineAfterColor = `
          #${videoID} .SJP_timeline::after {
            background-color: ${timelineColor};
          }
          #${videoID} .SJP_timeline .SJP_thumbIndicator {
            background-color: ${timelineColor};
          }
        `;
      }
      else {
        var timelineAfterColor = `
          #${videoID} .SJP_timeline::after {
            background-color: white;
          }
          #${videoID} .SJP_timeline .SJP_thumbIndicator {
            background-color: white;
          }
        `;
      }
      let timelineAfterColorstyle = document.createElement('style');
      timelineAfterColorstyle.innerHTML = timelineAfterColor;
      document.head.appendChild(timelineAfterColorstyle);

      //TIMELINE BACKGROUND COLOR

      if (timelineBackgroundColor == "default") {
        theVideoContainer.querySelector('.SJP_timeline').style.backgroundColor = 'rgba(100,100,100,.5)';
      }
      else if (timelineBackgroundColor && timelineBackgroundColor != "default") {
        theVideoContainer.querySelector('.SJP_timeline').style.backgroundColor = timelineBackgroundColor;
      }
      else {
        theVideoContainer.querySelector('.SJP_timeline').style.backgroundColor = 'rgba(100,100,100,.5)';
      }

      //buttonsColor

      if (buttonsColor == "default") {
        var buttonColors = `
          #${videoID} .SJP_buttonWhite {
            fill: white;
          }
          #${videoID} .SJP_strokeWhite {
            stroke: white;
          }
          #${videoID} .SJP_playPause {
            border-color: transparent transparent transparent white !important;
          }
          #${videoID} .SJP_muteBtn {
            fill: white !important;
          }
          #${videoID} .SJP_miniPlayerBtn {
            fill: white !important;
          }
          #${videoID} .SJP_fullScreenBtn {
            fill: white !important;
          }
        `;
      }
      else if (buttonsColor && buttonsColor != "default") {
        var buttonColors = `
          #${videoID} .SJP_buttonWhite {
            fill: ${buttonsColor};
          }
          #${videoID} .SJP_strokeWhite {
            stroke: ${buttonsColor};
          }
          #${videoID} .SJP_playPause {
            border-color: transparent transparent transparent ${buttonsColor} !important;
          }
          #${videoID} .SJP_muteBtn {
            fill: ${buttonsColor} !important;
          }
          #${videoID} .SJP_miniPlayerBtn {
            fill: ${buttonsColor} !important;
          }
          #${videoID} .SJP_fullScreenBtn {
            fill: ${buttonsColor} !important;
          }
        `;
      }
      else {
        var buttonColors = `
          #${videoID} .SJP_buttonWhite {
            fill: white;
          }
          #${videoID} .SJP_strokeWhite {
            stroke: white;
          }
          #${videoID} .SJP_playPause {
            border-color: transparent transparent transparent white !important;
          }
          #${videoID} .SJP_muteBtn {
            fill: white !important;
          }
          #${videoID} .SJP_miniPlayerBtn {
            fill: white !important;
          }
          #${videoID} .SJP_fullScreenBtn {
            fill: white !important;
          }
        `;
      }
      let theButtonsColors = document.createElement('style');
      theButtonsColors.innerHTML = buttonColors;
      document.head.appendChild(theButtonsColors);

      //buttonsHoverColor

      if (buttonsHoverColor == "default") {
        var buttonHoverColors = `
          #${videoID} .SJP_buttonWhite:hover {
            fill: white;
          }
          #${videoID} .SJP_strokeWhite:hover {
            stroke: white;
          }
          #${videoID} .SJP_playPause:hover {
            border-color: transparent transparent transparent white !important;
          }
          #${videoID} .SJP_muteBtn:hover {
            fill: white !important;
          }
          #${videoID} .SJP_miniPlayerBtn:hover {
              fill: white !important;
          }
          #${videoID} .SJP_fullScreenBtn:hover {
              fill: white !important;
          }
          #${videoID} .SJP_volumeHighIcon:hover,
          #${videoID} .SJP_volumeLowIcon:hover,
          #${videoID} .SJP_volumeMutedIcon:hover {
              fill: white !important;
          }
        `;
      }
      else if (buttonsHoverColor && buttonsHoverColor != "default") {
        var buttonHoverColors = `
          #${videoID} .SJP_buttonWhite:hover {
            fill: ${buttonsHoverColor};
          }
          #${videoID} .SJP_strokeWhite:hover {
            stroke: ${buttonsHoverColor};
          }
          #${videoID} .SJP_playPause:hover {
            border-color: transparent transparent transparent ${buttonsHoverColor} !important;
          }
          #${videoID} .SJP_muteBtn:hover {
            fill: ${buttonsHoverColor} !important;
          }
          #${videoID} .SJP_miniPlayerBtn:hover {
              fill: ${buttonsHoverColor} !important;
          }
          #${videoID} .SJP_fullScreenBtn:hover {
              fill: ${buttonsHoverColor} !important;
          }
          #${videoID} .SJP_volumeHighIcon:hover,
          #${videoID} .SJP_volumeLowIcon:hover,
          #${videoID} .SJP_volumeMutedIcon:hover {
              fill: ${buttonsHoverColor} !important;
          }
        `;
      }
      else {
        var buttonHoverColors = `
          #${videoID} .SJP_buttonWhite:hover {
            fill: white;
          }
          #${videoID} .SJP_strokeWhite:hover {
            stroke: white;
          }
          #${videoID} .SJP_playPause:hover {
            border-color: transparent transparent transparent white !important;
          }
          #${videoID} .SJP_muteBtn:hover {
            fill: white !important;
          }
          #${videoID} .SJP_miniPlayerBtn:hover {
              fill: white !important;
          }
          #${videoID} .SJP_fullScreenBtn:hover {
              fill: white !important;
          }
          #${videoID} .SJP_volumeHighIcon:hover,
          #${videoID} .SJP_volumeLowIcon:hover,
          #${videoID} .SJP_volumeMutedIcon:hover {
              fill: white !important;
          }
        `;
      }
      let theButtonsHoverColors = document.createElement('style');
      theButtonsHoverColors.innerHTML = buttonHoverColors;
      document.head.appendChild(theButtonsHoverColors);

      //titleColor

      if (titleColor == "default") {
        theVideoContainer.querySelector('.SJP_titleDiv').style.color = 'white';
      }
      else if (titleColor && titleColor != "default") {
        theVideoContainer.querySelector('.SJP_titleDiv').style.color = titleColor;
      }
      else {
        theVideoContainer.querySelector('.SJP_titleDiv').style.color = 'white';
      }

      //timerColor

      if (timerColor == "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.color = 'white';
        theVideoContainer.querySelector('.SJP_timeText').style.color = 'white';
      }
      else if (timerColor && timerColor != "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.color = timerColor;
        theVideoContainer.querySelector('.SJP_timeText').style.color = timerColor;
      }
      else {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.color = 'white';
        theVideoContainer.querySelector('.SJP_timeText').style.color = 'white';
      }

      //menuTextColor

      if (menuTextColor == "default") {
        theVideoContainer.querySelector('.SJP_configDiv').style.color = 'white';
      }
      else if (menuTextColor && menuTextColor != "default") {
        theVideoContainer.querySelector('.SJP_configDiv').style.color = menuTextColor;
      }
      else {
        theVideoContainer.querySelector('.SJP_configDiv').style.color = 'white';
      }

      //checkColor

      if (checkColor == "default") {
        var theCheckColor = `
          #${videoID} .SJP_menuItem_icon svg {
            fill: white;
          }
        `;
      }
      else if (checkColor && checkColor != "default") {
        var theCheckColor = `
          #${videoID} .SJP_menuItem_icon svg {
            fill: ${checkColor};
          }
        `;
      }
      else {
        var theCheckColor = `
          #${videoID} .SJP_menuItem_icon svg {
            fill: white;
          }
        `;
      }
      let checkColor1 = document.createElement('style');
      checkColor1.innerHTML = theCheckColor;
      document.head.appendChild(checkColor1);

      //borderRadius

      if (borderRadius == "default" || borderRadius == "1" || borderRadius == "yes") {
        theVideoContainer.querySelector('.SJP_Video').style.borderRadius = '10px';
        theVideoContainer.style.borderRadius = '10px';
        theVideoContainer.querySelector('.SJP_rightMenu').style.borderRadius = '10px';
        var theBorderRadius = `
          #${videoID} .SJP_videoControlsContainer::before {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          #${videoID} .SJP_rightMenuUL li:hover {
            border-radius: 10px;
          }
          #${videoID} .SJP_menuItem_label {
              border-bottom-right-radius: 10px !important;
              border-top-right-radius: 10px !important;
          }
          #${videoID} .SJP_menuItem_icon {
              border-bottom-left-radius: 10px !important;
              border-top-left-radius: 10px !important;
          }
        `;
        theVideoContainer.querySelector('.SJP_configDiv').style.borderRadius = '10px';
      }
      else if (borderRadius == "none" || borderRadius == "no" || borderRadius == "0") {
        theVideoContainer.querySelector('.SJP_Video').style.borderRadius = '0px';
        theVideoContainer.style.borderRadius = '0px';
        theVideoContainer.querySelector('.SJP_rightMenu').style.borderRadius = '0px';
        var theBorderRadius = `
          #${videoID} .SJP_videoControlsContainer {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
          }
          #${videoID} .SJP_videoControlsContainer::before {
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
          }
          #${videoID} .SJP_rightMenuUL li:hover {
            border-radius: 0px;
          }
          #${videoID} .SJP_menuItem_label {
            border-bottom-right-radius: 0px !important;
            border-top-right-radius: 0px !important;
          }
          #${videoID} .SJP_menuItem_icon {
            border-bottom-left-radius: 0px !important;
            border-top-left-radius: 0px !important;
          }
        `;
        theVideoContainer.querySelector('.SJP_configDiv').style.borderRadius = '0px';
      }
      else if (borderRadius && borderRadius != "default") {
        theVideoContainer.querySelector('.SJP_Video').style.borderRadius = borderRadius;
        theVideoContainer.style.borderRadius = borderRadius;
        theVideoContainer.querySelector('.SJP_rightMenu').style.borderRadius = borderRadius;
        var theBorderRadius = `
          #${videoID} .SJP_videoControlsContainer {
            border-bottom-left-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
          }
          #${videoID} .SJP_videoControlsContainer::before {
            border-bottom-left-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
          }
          #${videoID} .SJP_rightMenuUL li:hover {
            border-radius: ${borderRadius};
          }
          #${videoID} .SJP_menuItem_label {
            border-bottom-right-radius: ${borderRadius} !important;
            border-top-right-radius: ${borderRadius} !important;
          }
          #${videoID} .SJP_menuItem_icon {
            border-bottom-left-radius: ${borderRadius} !important;
            border-top-left-radius: ${borderRadius} !important;
          }
        `;
        theVideoContainer.querySelector('.SJP_configDiv').style.borderRadius = borderRadius;
      }
      else {
        theVideoContainer.querySelector('.SJP_Video').style.borderRadius = '10px';
        theVideoContainer.style.borderRadius = '10px';
        theVideoContainer.querySelector('.SJP_rightMenu').style.borderRadius = '10px';
        var theBorderRadius = `
          #${videoID} .SJP_videoControlsContainer {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          #${videoID} .SJP_videoControlsContainer::before {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          #${videoID} .SJP_rightMenuUL li:hover {
            border-radius: 10px;
          }
          #${videoID} .SJP_menuItem_label {
            border-bottom-right-radius: 10px !important;
            border-top-right-radius: 10px !important;
          }
          #${videoID} .SJP_menuItem_icon {
            border-bottom-left-radius: 10px !important;
            border-top-left-radius: 10px !important;
          }
        `;
        theVideoContainer.querySelector('.SJP_configDiv').style.borderRadius = '10px';
      }
      let theBorderRadius1 = document.createElement('style');
      theBorderRadius1.innerHTML = theBorderRadius;
      document.head.appendChild(theBorderRadius1);

      const SJP_playbtnM1 = theVideoContainer.querySelector('.SJP_playBtnM');

      //timelineHeight

      if (timelineHeight == "default") {
        theVideoContainer.querySelector('.SJP_timeline').style.height = '5px';
      }
      else if (timelineHeight && timelineHeight != "default") {
        theVideoContainer.querySelector('.SJP_timeline').style.height = timelineHeight;
      }
      else {
        theVideoContainer.querySelector('.SJP_timeline').style.height = '5px';
      }

      //timelineHeightHover

      if (timelineHeightHover == "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.height = '5px';
        theVideoContainer.querySelector('.SJP_tick').style.height = '5px';
      }
      else if (timelineHeightHover == "same") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.height = timelineHeight;
        theVideoContainer.querySelector('.SJP_tick').style.height = timelineHeight;
      }
      else if (timelineHeightHover && timelineHeightHover != "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.height = timelineHeightHover;
        theVideoContainer.querySelector('.SJP_tick').style.height = timelineHeightHover;
      }
      else {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.height = '5px';
        theVideoContainer.querySelector('.SJP_tick').style.height = '5px';
      }

      //tickDisplay

      if (tickDisplay == '1' || tickDisplay == 'yes') {
        theVideoContainer.querySelector('.SJP_tick').classList.remove("SJP_hidden")
      }
      else if (tickDisplay == '0' || tickDisplay == 'no') {
        theVideoContainer.querySelector('.SJP_tick').classList.add("SJP_hidden")
      }
      else {
        theVideoContainer.querySelector('.SJP_tick').classList.remove("SJP_hidden")       
      }

      //tickColor

      if (tickColor == "default") {
        var tickColor1 = `
            #${videoID} .SJP_tick {
            background-color: white;
          }
        `;
      }
      else if (tickColor == "same") {
        var theTickC = timelineColor
        if (timelineColor == 'default') {
          var theTickC = 'white'
        }
        var tickColor1 = `
            #${videoID} .SJP_tick {
            background-color: ${theTickC};
          }
        `;

      }
      else if (tickColor && tickColor != "default") {
        var tickColor1 = `
            #${videoID} .SJP_tick {
            background-color: ${tickColor};
          }
        `;
      }
      else {
        var tickColor1 = `
            #${videoID} .SJP_tick {
            background-color: white;
          }
        `;
      }
      let tickColor2 = document.createElement('style');
      tickColor2.innerHTML = tickColor1;
      document.head.appendChild(tickColor2);

      //tickWidth

      if (tickWidth == "default") {
        theVideoContainer.querySelector('.SJP_tick').style.width = '4px';
      }
      else if (tickWidth && tickWidth != "default") {
        theVideoContainer.querySelector('.SJP_tick').style.width = tickWidth;
      }
      else {
        theVideoContainer.querySelector('.SJP_tick').style.width = '4px';
      }

      //tickTopPos
      if (tickTopPos == "default") {
        theVideoContainer.querySelector('.SJP_tick').style.top = '-2px';
      }
      else if (tickTopPos && tickTopPos != "default") {
        theVideoContainer.querySelector('.SJP_tick').style.top = tickTopPos;
      }
      else {
        theVideoContainer.querySelector('.SJP_tick').style.top = '-2px';
      }

      //fullScreenDoubleClick

      //timelinePadding

      if (timelinePadding == "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.padding = '0px 0px 0px 0px';
      }
      else if (timelinePadding && timelinePadding != "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.padding = timelinePadding;
      }
      else {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.padding = '0px 0px 0px 0px';
      }

      //controlsPadding

      if (controlsPadding == "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.padding = '0px 0px 0px 0px';
      }
      else if (controlsPadding && controlsPadding != "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.padding = controlsPadding;
      }
      else {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.padding = '0px 0px 0px 0px';
      }

      //timelineCursor

      if (timelineCursor == "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.cursor = 'pointer';
      }
      else if (timelineCursor && timelineCursor != "default") {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.cursor = timelineCursor;
      }
      else {
        theVideoContainer.querySelector('.SJP_timelineContainer').style.cursor = 'pointer';
      }

      //controlsBackgroundColor

      if (controlsBackgroundColor == "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.backgroundColor = 'transparent';
      }
      else if (controlsBackgroundColor && controlsBackgroundColor != "default") {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.backgroundColor = controlsBackgroundColor;
      }
      else {
        theVideoContainer.querySelector('.SJP_videoControlsContainer').style.backgroundColor = 'transparent';
      }

      //controlsBackgroundColorGradient

      if (controlsBackgroundColorGradient == "default") {
        var theBackgrdGradient = `
          #${videoID} .SJP_videoControlsContainer::before {
            background: linear-gradient(to top, rgba(0,0,0,.50), transparent);
          }
        `;
      }
      else if (controlsBackgroundColorGradient && controlsBackgroundColorGradient != "default") {
        var theBackgrdGradient = `
          #${videoID} .SJP_videoControlsContainer::before {
            background: ${controlsBackgroundColorGradient};
          }
        `;
      }
      else {
        var theBackgrdGradient = `
          #${videoID} .SJP_videoControlsContainer::before {
            background: transparent;
          }
        `;      
      }
      let theBackgrdGradient1 = document.createElement('style');
      theBackgrdGradient1.innerHTML = theBackgrdGradient;
      document.head.appendChild(theBackgrdGradient1);

      //-------------------------------------------------------------

      const SJP_range = theVideoContainer.querySelector(".SJP_rangeV,.SJP_rangeH")

      const SJP_playPause = theVideoContainer.querySelector(".SJP_playPause");
  
      const fullScreenBtn1 = theVideoContainer.querySelector(".SJP_fullScreenBtn")
      const miniPlayerBtn1 = theVideoContainer.querySelector(".SJP_miniPlayerBtn")
    
      const muteBtn1 = theVideoContainer.querySelector(".SJP_muteBtn")
      const volumeSlider = theVideoContainer.querySelector(".SJP_volumeSlider")
    
      const currentTimeElem = theVideoContainer.querySelector(".SJP_currentTime")
      const totalTimeElem = theVideoContainer.querySelector(".SJP_totalTime")
    
      const previewImg = theVideoContainer.querySelector(".SJP_previewImg")
      const timeText = theVideoContainer.querySelector(".SJP_timeText")
      const timeLineContainer = theVideoContainer.querySelector(".SJP_timelineContainer")
    
      const playFlashBtn = theVideoContainer.querySelector(".SJP_playFlash")
      const pauseFlashBtn = theVideoContainer.querySelector(".SJP_pauseFlash")
      
      const SJP_controls = theVideoContainer.querySelector(".SJP_videoControlsContainer"); 

      var Ctimer;
    
      document.addEventListener("keydown", e => {
          const tagName = document.activeElement.tagName.toLowerCase()
          if (tagName === "input") return
          switch (e.key.toLowerCase()) {
              case " ":
                  if (tagName === "button") return
              case "k":
                  togglePlay()
                  break
              case "f":
                  toggleFullScreenMode()
                  break
              case "t":
                  toggleTheaterMode()
                  break
              case "i":
                  toggleMiniPlayerMode()
                  break
              case "m":
                  toggleMute()
                  break
              case "arrowleft":
              case "j":
                  goBack()
                  break
              case "arrowright":
              case "l":
                  goForward()
                  break
          }
      })
    
      //CONFIG MENU

      const SJP_configBtn = theVideoContainer.querySelector(".SJP_configBtn");
      const SJP_speedmenu = theVideoContainer.querySelector(".SJP_configDiv");

      SJP_configBtn.addEventListener('click', function(event) {
          if (SJP_speedmenu.style.display == 'block') {
            SJP_speedmenu.style.display = 'none';
          }
          else {
            SJP_speedmenu.style.display = 'block'; 
          }
      });
    
      //click outside
      document.addEventListener('click', function(event) {
          if (!(SJP_configBtn.contains(event.target) )) {
            SJP_speedmenu.style.display = 'none';
          }
      });
      
      // Timeline
    
      timeLineContainer.addEventListener("mousemove", handleTimelineUpdate)
      timeLineContainer.addEventListener("mousedown", toggleScrubbing)
      
      const SJP_tick1 = theVideoContainer.querySelector('.SJP_tick');

      timeLineContainer.addEventListener('mousemove', (e) => {
        const rect = timeLineContainer.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        if (offsetX < 0) {
          offsetX = 0;
        } 
        else if (offsetX > rect.width - SJP_tick1.offsetWidth / 3) {
          offsetX = rect.width - SJP_tick1.offsetWidth / 3;
        }
        offsetX -= SJP_tick1.offsetWidth / 2;
        SJP_tick1.style.left = `${offsetX}px`;
        SJP_tick1.style.display = 'block';
      });

      timeLineContainer.addEventListener('mouseleave', () => {
        SJP_tick1.style.display = 'none';
      });

      const SJP_replay = theVideoContainer.querySelector(".SJP_replay");

      document.addEventListener("mouseup", e => {
          if(isScrubbing) {
            toggleScrubbing(e)
            SJP_playbtnM1.style.display = 'none';
            SJP_replay.style.display = 'none';
          }
      })
      document.addEventListener("mousemove", e => {
          if(isScrubbing) {
             handleTimelineUpdate(e)
            SJP_playbtnM1.style.display = 'none';
            SJP_replay.style.display = 'none';
          }
        })
    
      let isScrubbing = false
      let wasPaused
      function toggleScrubbing(e) {
          const rect = timeLineContainer.getBoundingClientRect()
          const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
          isScrubbing = (e.buttons & 1) == 1
          videoContainer.classList.toggle("scrubbing", isScrubbing)
          if (isScrubbing) {
              wasPaused = video.paused
              video.pause()
          } else { 
              video.currentTime = percent * video.duration
              if (!wasPaused) { 
                video.play(); 
                SJP_replay.style.display = 'none'; 
              }
          }
          handleTimelineUpdate(e)
      }
    
      const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
          minimumIntegerDigits: 2
      })

      function formatDuration(time) {
          const seconds = Math.floor(time % 60)
          const minutes = Math.floor(time / 60) % 60
          const hours = Math.floor(time / 3600)
          if (hours == 0) {
              return `${minutes}:${leadingZeroFormatter.format(seconds)}`
          } else {
              return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    
          }
      }
    
      let eachSeconds = 4; // every 4 sec
      var previewDIR
      var previewFILENAME
      var previewFILEFORMAT

      const previewDir = video.getAttribute('data-previewDir');
      if (previewDir) { var previewDIR = previewDir; }
      else { previewImg.classList.add("SJP_hidden") }

      const previewFileName = video.getAttribute('data-previewFileName');
      if (previewFileName) { var previewFILENAME = previewFileName; }
      else { var previewFILENAME = "preview"; }

      const previewFileFormat = video.getAttribute('data-previewFileFormat');
      if (previewFileFormat) { var previewFILEFORMAT = previewFileFormat; }
      else { var previewFILEFORMAT = "jpg"; }

      function handleTimelineUpdate(e) {
          const rect = timeLineContainer.getBoundingClientRect()
          const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
          const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / eachSeconds))
          
          const previewImgSrc = `${previewDIR}${previewFILENAME}${previewImgNumber}.${previewFILEFORMAT}`
  
          timeText.innerHTML = formatDuration(percent * video.duration);
    
          previewImg.src = previewImgSrc
          timeLineContainer.style.setProperty("--preview-position", percent)
          if (isScrubbing) {
              e.preventDefault()
              timeLineContainer.style.setProperty("--progress-position", percent)
          }
      }
    
      // Time
    
      video.addEventListener("loadeddata", () => {
          totalTimeElem.textContent = formatDuration(video.duration);
      })
    
      video.addEventListener("timeupdate", () => {
          currentTimeElem.textContent = formatDuration(video.currentTime)
          const percent = video.currentTime / video.duration
          timeLineContainer.style.setProperty("--progress-position", percent)
      })
    
      // Volume 
    
      muteBtn1.addEventListener("click", toggleMute)

      function toggleMute() {
        var videos = theVideoContainer.querySelectorAll('video.SJP_Video');
          videos.forEach(function(video) {
            if (video.muted) {
              video.muted = false;
              if (video.volume) {
                video.volume = video.volume;
              }
              else {
                video.volume = "1";
              }
            } 
            else {
              video.muted = true;
            }
          });
      }

      volumeSlider.addEventListener("input", e => {
          video.volume = e.target.value
          video.muted = e.target.value == 0
      })

      video.addEventListener("volumechange", () => {
          volumeSlider.value = video.volume
          var volm = video.volume * 100;
          var volumeLevel
          if (video.muted || video.volume === 0){
              volumeSlider.value = 0
              volumeLevel = "muted"
               SJP_range.style.background = `linear-gradient(to right, rgb(255,255,255) 0%, rgba(167, 167, 167, 0.599) 0%)`;
          } 
          else if (video.volume >= 0.5) { 
              volumeLevel = "high" 
              SJP_range.style.background = `linear-gradient(to right, rgb(255,255,255) ${volm}%, rgba(167, 167, 167, 0.599) ${volm}%)`;
          } 
          else { 
              volumeLevel = "low" 
              SJP_range.style.background = `linear-gradient(to right, rgb(255,255,255) ${volm}%, rgba(167, 167, 167, 0.599) ${volm}%)`;
          }
          videoContainer.dataset.volumeLevel = volumeLevel
      })
    
      var volm = video.volume * 100;
      SJP_range.style.background = `linear-gradient(to right, rgb(255,255,255) ${volm}%, rgba(167, 167, 167, 0.599) ${volm}%)`;

      // View Modes
    
      fullScreenBtn1.addEventListener("click", toggleFullScreenMode)
      miniPlayerBtn1.addEventListener("click", toggleMiniPlayerMode)
    
      // Full-Screen Mode
      function toggleFullScreenMode() {
          if(document.fullscreenElement == null) {
              videoContainer.requestFullscreen()
          } 
          else {
              document.exitFullscreen()
          }
      }
      document.addEventListener("fullscreenchange", () => {
          videoContainer.classList.toggle("SJP_fullScreen", 
          document.fullscreenElement)
      })
    
      // SJP_miniPlayer Mode
      function toggleMiniPlayerMode() {
          if(videoContainer.classList.contains("SJP_miniPlayer")) {
              document.exitPictureInPicture()
          } 
          else {
              video.requestPictureInPicture()
          } 
      }
    
      video.addEventListener("enterpictureinpicture", () => {
          videoContainer.classList.add("SJP_miniPlayer")
      })
      video.addEventListener("leavepictureinpicture", () => {
          videoContainer.classList.remove("SJP_miniPlayer")
      })
    
      // Play/Pause

      video.addEventListener("click", togglePlay)
      video.addEventListener("dblclick", toggleFullScreen)

      function toggleFullScreen() {
        if (fullScreenDoubleClick == "1" || fullScreenDoubleClick == "yes") {
          if(document.fullscreenElement == null) {
            videoContainer.requestFullscreen()
          } 
          else {
            document.exitFullscreen()
          }
        }
      }

      SJP_playPause.addEventListener('click', togglePlay) 
      SJP_playbtnM1.addEventListener('click', togglePlay) 

      function togglePlay() {
          if (video.paused) {
              video.play()
              aniplay()
              SJP_replay.style.display = 'none';
              SJP_playbtnM1.style.display = 'none';
          } else {
              video.pause()
              anipause()
              SJP_replay.style.display = 'none';
              SJP_playbtnM1.style.display = 'none';
          }
          theTitleDiv.style.opacity = 1;  
          theTitleDiv.style.display = 'block'; 
          SJP_videoControlsContainer.style.display = '';
      }

      video.addEventListener("play", () =>{
        videoContainer.classList.remove("SJP_paused")
        SJP_playPause.classList.add("SJP_paused");
        SJP_playbtnM1.style.display = 'none';
        SJP_replay.style.display = 'none';
      })
  
      video.addEventListener("pause", () =>{
          videoContainer.classList.add("SJP_paused")
          SJP_playPause.classList.remove("SJP_paused");
          SJP_playbtnM1.style.display = 'none';
          SJP_replay.style.display = 'none';
      })
  
      function aniplay() {
          playFlashBtn.classList.add("SJP_flashing")
          pauseFlashBtn.classList.remove("SJP_flashing")
          setTimeout(function(){ playFlashBtn.classList.remove("SJP_flashing") }, 240);
      }
      function anipause() {
          pauseFlashBtn.classList.add("SJP_flashing")
          playFlashBtn.classList.remove("SJP_flashing")
          setTimeout(function(){ pauseFlashBtn.classList.remove("SJP_flashing") }, 240);
      }
    
      //startPlayBtn

      if (startPlayBtn == "default" || startPlayBtn == "1" || startPlayBtn == "yes") {
        videos.forEach(video => {
          video.addEventListener('loadeddata', onVideoLoaded);
        });
        function onVideoLoaded(event) {
          SJP_playbtnM1.style.display = 'block';
        }
        video.addEventListener("loaded", function() {
          SJP_playbtnM1.style.display = 'block';
        });
      }
      else if (startPlayBtn == "none" || startPlayBtn == "no" || startPlayBtn == "0") {
        SJP_playbtnM1.style.display = 'none';
      }
      else {
        videos.forEach(video => {
          video.addEventListener('loadeddata', onVideoLoaded);
        });
        function onVideoLoaded(event) {
          SJP_playbtnM1.style.display = 'block';
        }
        video.addEventListener("loaded", function() {
          SJP_playbtnM1.style.display = 'block';
        });
      }
      
      video.addEventListener("ended", function() {
        SJP_replay.style.display = 'block';
        titlediv.style.opacity = 1;
        SJP_controls.style.opacity = 1; 
        document.body.style.cursor = 'auto';
      });
    
      SJP_replay.addEventListener('click', function(event) {
        SJP_replay.style.display = 'none';
        video.play()
      });

      const titlediv = theVideoContainer.querySelector(".SJP_titleDiv")

      videoContainer.addEventListener('mouseenter', function() {
        if (disableLayoutFade != "1" && disableLayoutFade != "yes") {
          clearTimeout(Ctimer);
          SJP_controls.style.opacity = 1; 
          titlediv.style.opacity = 1;
          document.body.style.cursor = 'auto';
          Ctimer = setTimeout(function() {
              if (video.paused) { 
                SJP_controls.style.opacity = 1; 
                titlediv.style.opacity = 1;
                document.body.style.cursor = 'auto'; 
              } 
              else { 
                SJP_controls.style.opacity = 0; 
                titlediv.style.opacity = 0;
                document.body.style.cursor = 'none'; 
                SJP_speedmenu.style.display = 'none'; 
              }
          }, layoutFadeTimeT); 
        }
      });
    
      videoContainer.addEventListener('mousemove', function() {
        if (disableLayoutFade != "1" && disableLayoutFade != "yes") {
          clearTimeout(Ctimer);
          SJP_controls.style.opacity = 1;
          titlediv.style.opacity = 1;
          document.body.style.cursor = 'auto';
          Ctimer = setTimeout(function() {
              if (video.paused) { 
                SJP_controls.style.opacity = 1; 
                titlediv.style.opacity = 1;
                document.body.style.cursor = 'auto'; 
              } 
              else { 
                SJP_controls.style.opacity = 0;
                titlediv.style.opacity = 0; 
                document.body.style.cursor = 'none'; 
                SJP_speedmenu.style.display = 'none'; 
              }
          }, layoutFadeTimeT); 
        }
      });
    
      videoContainer.addEventListener('mouseleave', function() {
        if (disableLayoutFade != "1" && disableLayoutFade != "yes") {
          clearTimeout(Ctimer);
          document.body.style.cursor = 'auto';
          Ctimer = setTimeout(function() {
              if (video.paused) { 
                SJP_controls.style.opacity = 1; 
                titlediv.style.opacity = 1;
                document.body.style.cursor = 'auto';
              } 
              else { 
                SJP_controls.style.opacity = 0; 
                titlediv.style.opacity = 0;
                SJP_speedmenu.style.display = 'none';
              }
          }, layoutFadeTimeT2); 
        }
      });

      //startHideTitle

      const theTitleDiv = theVideoContainer.querySelector(".SJP_titleDiv");

      if (startHideTitle == "default" || startHideTitle == "1" || startHideTitle == "yes") {
        theTitleDiv.style.opacity = 0;  
        theTitleDiv.style.display = 'none'; 
      }
      else if (startHideTitle == "none" || startHideTitle == "no" || startHideTitle == "0") {
        theTitleDiv.style.opacity = 1;  
        theTitleDiv.style.display = 'block';   
      }
      else {
        theTitleDiv.style.opacity = 1;  
        theTitleDiv.style.display = 'block';   
      }

      //startHideControls

      const SJP_videoControlsContainer = theVideoContainer.querySelector(".SJP_videoControlsContainer");

      if (startHideControls == "default" || startHideControls == "1" || startHideControls == "yes") {
        SJP_videoControlsContainer.style.display = 'none';
      }
      else if (startHideControls == "none" || startHideControls == "no" || startHideControls == "0") {
        SJP_videoControlsContainer.style.display = '';
      }
      else {
        SJP_videoControlsContainer.style.display = '';
      }

      const SJP_zerotwofive = theVideoContainer.querySelector(".SJP_zerotwofive")
      const SJP_zerofive = theVideoContainer.querySelector(".SJP_zerofive")
      const SJP_zerosevenfive = theVideoContainer.querySelector(".SJP_zerosevenfive")
      const SJP_onex = theVideoContainer.querySelector(".SJP_onex")
      const SJP_onetwofive = theVideoContainer.querySelector(".SJP_onetwofive")
      const SJP_onefive = theVideoContainer.querySelector(".SJP_onefive")
      const SJP_onesevenfive = theVideoContainer.querySelector(".SJP_onesevenfive")
      const SJP_twox = theVideoContainer.querySelector(".SJP_twox")

      SJP_zerotwofive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_zerotwofive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 0.25
      });
      SJP_zerofive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_zerofive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 0.5
      });
      SJP_zerosevenfive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_zerosevenfive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 0.75
      });
      SJP_onex.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_onex").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 1.0
      });
      SJP_onetwofive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_onetwofive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 1.25
      });
      SJP_onefive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_onefive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 1.5
      });
      SJP_onesevenfive.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_onesevenfive").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 1.75
      });
      SJP_twox.addEventListener('click', function(event) {
        hideAllChecks();
        const sjpsvg = theVideoContainer.querySelector(".SJP_twox").querySelector('.SJP_svg');
        sjpsvg.classList.remove('SJP_hidden');
        video.playbackRate = 2.0
      });

      function hideAllChecks() {
        theVideoContainer.querySelector(".SJP_zerotwofive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_zerofive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_zerosevenfive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_onex").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_onetwofive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_onefive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_onesevenfive").querySelector('.SJP_svg').classList.add('SJP_hidden');
        theVideoContainer.querySelector(".SJP_twox").querySelector('.SJP_svg').classList.add('SJP_hidden');
      }

    }); // ForEach Video

});
