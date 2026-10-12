# Simple JS Player

**Version 1.0.3** · by Hudson Pear (pyrus)

A dependency-free HTML5 video player. It is one JavaScript file and one CSS
file. You configure each player with `data-*` attributes on a normal
`<video>` tag, so there is nothing to learn beyond HTML.

- Custom controls with hover thumbnails, speed menu, picture-in-picture,
  fullscreen and a right-click menu
- Responsive: keeps its aspect ratio and fits phone screens
- Touch: tap to show the controls, double-tap the sides to skip
- Keyboard and screen-reader friendly
- Any number of players on one page

## Contents

- [Quick start](#quick-start)
- [How the data- attributes work](#how-the-data--attributes-work)
- [Options](#options)
  - [Size and layout](#size-and-layout)
  - [Start state and volume](#start-state-and-volume)
  - [Which controls are shown](#which-controls-are-shown)
  - [Behavior](#behavior)
  - [Timeline](#timeline)
  - [Colors](#colors)
  - [Hover previews](#hover-previews)
- [Full example](#full-example)
- [Posters and previews](#posters-and-previews)
- [Keyboard](#keyboard)
- [Touch](#touch)
- [JavaScript](#javascript)
- [Video files](#video-files)
- [Browser notes](#browser-notes)

## Quick start

Copy `sjp.css` and `sjp.js` into your project and link them:

```html
<link rel="stylesheet" href="sjp.css">
<script src="sjp.js" defer></script>

<video class="SJP_Video" src="movie.mp4" poster="movie.jpg" preload="metadata"
  data-title="My movie"
  data-previewSprite="movie-sprite.jpg"></video>
```

Every `<video class="SJP_Video">` on the page becomes a player when the page
loads. Every `data-*` attribute is optional. Without any, you get the default
player.

`index.html` in this repository is a demo of all the options. Its videos are
not in git (see `.gitignore`). Put your own MP4s next to the posters, or change
the `src` attributes.

## How the data- attributes work

- **Put them on the `<video>` tag.** Each player reads its own attributes, so
  two videos on one page can look and behave differently.
- **Attributes are read once, when the player is set up** (on page load, or
  when you call `SJPlayer.init`). Changing an attribute later has no effect
  until the player is destroyed and set up again.
- **Missing or empty means the default.** Only write the attributes you want
  to change.
- **Yes/no values.** `1` and `yes` mean on. `0` and `no` mean off. They are
  interchangeable, so `data-displayTimeline="no"` works.
- **`default`.** Most options also accept `default`, which means "use the
  built-in value". This is useful when you want to reset a value that a
  shared template sets.
- **Fixed choices.** Some options accept only a short list of words (for
  example `data-layout`). A typo, such as `data-layout="minii"`, is ignored
  and logs a warning in the browser console, so check the console when a
  setting seems to do nothing.
- **Sizes and colors** take any valid CSS value: `px`, `%`, `rem`, `#fff`,
  `rgba(0,0,0,.5)`, and so on.

## Options

### Size and layout

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-videoID` | text | none | Sets the `id` of the player's wrapper element. Use it to find or style the player from your own code. |
| `data-title` | text | none | Title shown at the top left. Hidden until play if `data-startHideTitle` is set. |
| `data-layout` | `default` / `d`, `mini` / `m`, `simple` / `s` | `default` | `default`: timeline above the buttons. `mini`: timeline inside the button row. `simple`: like `mini`, without the back, forward, speed and picture-in-picture buttons. |
| `data-width`, `data-height` | CSS size | `560px`, `315px` | Player size. When both are in `px`, the player is responsive: it uses that size when there is room and scales down at the same aspect ratio in narrower containers. Other units are applied as given. |
| `data-maxWidth`, `data-maxHeight` | CSS size | `560px`, `315px` | Upper limits for the responsive size. |
| `data-borderRadius` | CSS size, or `0` / `no` / `none` | `10px` | Corner radius. `0`, `no` and `none` give square corners. |
| `data-font` | CSS `font-family` | system UI font | Font for the title, timer and menus. |
| `data-playsInline` | `1` / `0` | `1` | On iPhone, play inside the page with this player's controls instead of in iOS's own fullscreen player. |

Below 400px wide, the back, forward and picture-in-picture buttons are hidden
so the remaining controls fit.

### Start state and volume

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-startPlayBtn` | `1` / `0` | `1` | Shows a large play button in the middle until the first play. |
| `data-startHideTitle` | `1` / `yes` / `default` to hide; `0` / `no` to show | shown | Hides the title until the first play. |
| `data-startHideControls` | `1` / `yes` / `default` to hide; `0` / `no` to show | shown | Hides the controls until the first play. |
| `data-startTime` | seconds (`90`, `12.5`), or `m:ss` / `h:mm:ss` (`1:30`, `1:02:30`) | `0` | Playback starts at this position instead of the beginning. Applies to the big play button and play. A time past the end starts at the end. An invalid value logs a warning and starts at `0:00`. |
| `data-volumeLevel` | `0` to `100` | `100` | Starting volume. `0` starts muted. |
| `data-rememberVolume` | `1` / `0` | `1` | Remembers the viewer's volume and mute choice across all players and visits, using `localStorage`. A remembered value wins over `data-volumeLevel`. Videos with the `muted` attribute (for example, autoplay videos) stay muted. |

### Which controls are shown

These all default to `1` (shown). Set them to `0` to hide the matching part.

| Attribute | Hides |
|---|---|
| `data-displayControls` | The whole button row. |
| `data-displayTimeline` | The timeline. |
| `data-displayPreview` | The hover thumbnails. They are not downloaded when hidden. |
| `data-displayDuration` | The timer, such as `0:00 / 5:24`. |
| `data-displayVolume` | The mute button and volume slider. |
| `data-backBtn`, `data-forwardBtn` | The skip buttons. These default to `0` (hidden). |
| `data-speedMenu` | The playback speed menu. |
| `data-miniPlayerBtn` | The picture-in-picture button. It is also hidden in browsers without the feature, such as Firefox. |
| `data-fullScreenBtn` | The fullscreen button. |
| `data-tickDisplay` | The marker line that follows the pointer on the timeline. |

### Behavior

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-backSec`, `data-forwardSec` | seconds | `10` | How far the skip buttons, keys and double taps jump. |
| `data-fullScreenDoubleClick` | `1` / `0` | `0` | Double-click (or double-tap the middle) toggles fullscreen. |
| `data-disableLayoutFade` | `1` / `0` | `0` | Never hide the controls automatically. |
| `data-layoutFadeTime` | milliseconds | `2000` | How long the pointer or touch must be idle during playback before the controls fade. The controls stay visible while paused, while a menu is open, and while the pointer is over them. |
| `data-layoutInstantFadeMouseLeave` | `1` / `0` | `0` | Hides the controls as soon as the pointer leaves the player. |
| `data-rightClickMenu` | `sjp`, or `browser` / `default` | `browser` | `sjp` shows the player's own right-click menu. `browser` keeps the browser's menu. |
| `data-disableRightClick` | `1` / `0` | `0` | Turns off the right-click menu completely. |
| `data-volumeStyle` | `vertical` / `v`, `horizontal` / `h` | `vertical` | Direction of the volume slider. |

### Timeline

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-timelineHeight` | CSS size | `5px` | Height of the progress bar. |
| `data-timelineHeightHover` | CSS size, or `same` | `5px` | Height of the bar while hovered. `same` keeps it at `data-timelineHeight`. |
| `data-timelinePadding` | CSS padding | `0` | Space around the timeline. |
| `data-controlsPadding` | CSS padding | `0` | Space around the whole controls block. |
| `data-timelineCursor` | CSS cursor | `pointer` | Mouse cursor shown over the timeline. |
| `data-tickWidth`, `data-tickTopPos` | CSS size | `4px`, `-2px` | Width and vertical offset of the marker line. |
| `data-tickColor` | CSS color, or `same` | `white` | Color of the marker line. `same` uses the timeline color. |

### Colors

Each takes any CSS color. `data-controlsBackgroundColorGradient` takes a CSS
gradient.

| Attribute | Default | Colors |
|---|---|---|
| `data-timelineColor` | `white` | The played part of the timeline. |
| `data-timelineBackgroundColor` | `rgba(100,100,100,.5)` | The unplayed part of the timeline. |
| `data-buttonsColor` | `white` | Button icons. |
| `data-buttonsHoverColor` | `white` | Button icons on hover. Also the keyboard focus ring. |
| `data-titleColor` | `white` | The title. |
| `data-timerColor` | `white` | The timer. |
| `data-menuTextColor` | `white` | Text in the speed and right-click menus. |
| `data-checkColor` | `white` | The check mark in menus. |
| `data-controlsBackgroundColor` | `transparent` | Solid background behind the controls. |
| `data-controlsBackgroundColorGradient` | `linear-gradient(to top, rgba(0,0,0,.50), transparent)` | Gradient behind the controls. |

### Hover previews

Use **either** a sprite (one image, recommended) **or** a folder of single
images. The sprite is faster because the browser makes one request instead of
one per thumbnail.

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-previewSprite` | image URL | none | One image holding every thumbnail, left to right, top to bottom. |
| `data-previewSpriteColumns` | number | `10` | Thumbnails per row in the sprite. |
| `data-previewDir` | folder URL ending in `/` | none | Folder of single images, named `preview1.jpg`, `preview2.jpg`, and so on. |
| `data-previewFileName` | text | `preview` | Name before the number in the image files. |
| `data-previewFileFormat` | file extension | `jpg` | Extension of the image files. |
| `data-previewInterval` | seconds | `4` | Seconds of video each thumbnail represents. Must match how the thumbnails were made. |

## Full example

```html
<video class="SJP_Video"
  src="movie.mp4"
  poster="movie.jpg"
  preload="metadata"

  data-videoID="trailer"
  data-title="Trailer"
  data-layout="default"
  data-width="800px" data-height="450px"
  data-maxWidth="800px" data-maxHeight="450px"
  data-borderRadius="8px"

  data-startPlayBtn="1"
  data-startHideControls="1"
  data-volumeLevel="80"

  data-displayPreview="1"
  data-previewSprite="trailer-sprite.jpg"
  data-previewInterval="4"

  data-backBtn="1" data-forwardBtn="1" data-backSec="5" data-forwardSec="30"
  data-fullScreenDoubleClick="1"
  data-rightClickMenu="sjp"

  data-timelineColor="#e50914"
  data-buttonsHoverColor="#e50914"></video>
```

Only the attributes you list are changed. Everything else keeps its default.

## Posters and previews

The tools below use [ffmpeg](https://ffmpeg.org/download.html). The sprite
step also needs [Node.js](https://nodejs.org/). Run the commands from the
folder that holds the video.

### Poster

The poster is the still image shown before the video plays. Take one frame
from the video:

```sh
ffmpeg -ss 00:00:05 -i movie.mp4 -frames:v 1 -vf scale=1280:-1 -q:v 2 movie.jpg
```

- `-ss 00:00:05` takes the frame at 5 seconds. Pick a time that shows the
  subject, not a black fade-in.
- `scale=1280:-1` sets the width to 1280px and keeps the aspect ratio. Change
  it if you need a different size.
- Then add the attribute to the `<video>` tag:

```html
<video class="SJP_Video" src="movie.mp4" poster="movie.jpg"></video>
```

### Hover previews

Hover previews are small frames from the video. They appear above the
timeline when the pointer moves over it. Each one stands for a fixed span of
video time, set by `data-previewInterval` (default 4 seconds).

**Step 1: extract the frames.** Create an output folder, then run:

```sh
mkdir previewImgs
ffmpeg -i movie.mp4 -vf fps=1/4,scale=120:-1 previewImgs/preview%d.jpg
```

- `fps=1/4` makes one frame every 4 seconds. For another interval, change it
  to match (for example, `fps=1/10` for every 10 seconds).
- `scale=120:-1` sets the width to 120px. Thumbnails are small, so 120px is
  enough.
- The files are named `preview1.jpg`, `preview2.jpg`, and so on. Don't
  rename them, or the tools below won't find them.

**Step 2 (recommended): pack them into one sprite.** A sprite is a single
image holding every thumbnail. The browser downloads one file instead of
hundreds, and thumbnails show instantly after the first hover:

```sh
node tools/make-sprite.js previewImgs movie-sprite.jpg
```

The script prints the attribute to use, for example
`data-previewSprite="movie-sprite.jpg"`. If it prints
`data-previewSpriteColumns`, add that attribute too.

**Step 3: add the attributes to the `<video>` tag:**

```html
<video class="SJP_Video" src="movie.mp4" poster="movie.jpg"
  data-previewSprite="movie-sprite.jpg"
  data-previewInterval="4"></video>
```

Set `data-previewInterval` to the same number you used in `fps=1/...`.

**Alternative: use the folder directly.** Skip the sprite step and point the
player at the folder. This works, but the browser downloads each thumbnail
separately:

```html
<video class="SJP_Video" src="movie.mp4" poster="movie.jpg"
  data-previewDir="previewImgs/"
  data-previewFileName="preview"
  data-previewFileFormat="jpg"
  data-previewInterval="4"></video>
```

Use either a sprite or a folder, not both.

## Keyboard

With the pointer over a player, or focus inside it:

| Key | Action |
|---|---|
| Space, K | Play / pause |
| J, ← | Back |
| L, → | Forward |
| M | Mute |
| F | Fullscreen |
| I | Picture-in-picture |
| Esc | Close an open menu |

With focus inside the player (Tab into it):

| Key | Action |
|---|---|
| ↑, ↓ | Volume ±5%. On the timeline: forward / back |
| Home, End | Start / end of the video |

Tab reaches the buttons and the timeline (a slider for screen readers). The
speed menu works with the arrow keys and Enter. Ctrl, Alt and Cmd
combinations are left to the browser.

## Touch

- Tap: shows hidden controls. With the controls showing, plays or pauses.
- Double-tap the left or right third: back / forward. Keep tapping to skip further.
- Double-tap the middle: fullscreen (with `data-fullScreenDoubleClick="1"`).
- Drag along the timeline to seek.
- On phones the speaker button mutes. Volume is set with the hardware buttons.

## JavaScript

```js
SJPlayer.init(container);   // set up players added after page load
SJPlayer.destroy(video);    // remove a player (pass the <video> or its wrapper)
```

Call `destroy` before you remove a player from the page, so it stops listening
for document events. To apply new attributes to an existing player, call
`destroy` on it, change the attributes, then call `init` again. `init` skips
videos that are already set up.

## Video files

- MP4 (H.264 video, AAC audio) plays everywhere.
- Put the index ("moov atom") at the start of the file so playback can begin
  before the whole file downloads:
  `ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4`
- The server must support HTTP range requests, which all common servers do.
  Without them, seeking does not work.
- `preload="metadata"` loads just enough to show the duration (about 1 MB in
  Chrome) instead of buffering ahead. `preload="none"` loads nothing until
  play, so the duration shows `0:00` until then.

## Browser notes

- Firefox has no picture-in-picture API, so that button is hidden there.
- iPhone does not allow fullscreen for page elements. The fullscreen button
  opens iOS's own video player.
- On touch-only devices the volume slider is hidden. The speaker button
  mutes instead.
