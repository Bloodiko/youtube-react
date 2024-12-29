console.log("Injecting reaction video script");

// get videoTiming json
let videoTiming = undefined;
fetch(
  "chrome-extension://eagingaiopkgjjpdlmmnjjddjcplghnh/videoTiming.json"
).then(async (response) => (videoTiming = await response.json()));

let mainVideo = undefined;

let failedAttempts = 0;

function main() {
  const videoPlayer = Array.from(document.querySelectorAll("video"));
  const mainVideo = videoPlayer.at(-1);

  if (!mainVideo) {
    if (failedAttempts > 5) {
      console.log("Main video not found after 5 attempts");
      return;
    }
    console.log("Main video not found");
    setTimeout(main, 1000);
    failedAttempts++;
    return;
  }

  // reaction video id
  const reactionVideoId = "p6JahREa6dg"; // hardcode for now
  const mainVideoId = "PvGkt1WEQ9Q"; // hardcode for now

  // create iframe with the video id

  // Attention, the video definitely must be sanitized before being injected into the DOM!
  const reactionIframeVideo = `
  <iframe id="reactionFrame" width="560" height="315" style="z-index: 100; position: absolute;" src="https://www.youtube.com/embed/%VIDEOID%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
`.replace("%VIDEOID%", reactionVideoId);

  // append iframe to the video element
  document.body.insertAdjacentHTML("beforeend", reactionIframeVideo);

  // get the iframe element
  const reactionFrame = document.getElementById("reactionFrame");

  reactionFrame.addEventListener("load", () => {
    console.log("reaction video loaded");

    // get the video element
    const reactionVideo = reactionFrame.contentDocument.querySelector("video");

    const reactionAction = {
      PLAY: mainVideo.play.bind(mainVideo),
      PAUSE: mainVideo.pause.bind(mainVideo),
    };

    reactionVideo.addEventListener("timeupdate", () => {
      console.debug("reaction video timeupdate", reactionVideo.currentTime);
      const currentTime = reactionVideo.currentTime.toFixed();
      const action = videoTiming[mainVideoId][reactionVideoId][currentTime];
      try {
        reactionAction[action]();
      } catch (e) {
        console.log(`unknown reaction action ${action}`);
      }
    });
  });
}

main();
