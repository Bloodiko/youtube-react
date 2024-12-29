# Youtube React Watch

This is a small proof of concept, to show how it could work to watch reaction to an existing youtube video, while still providing watchtime and ad revenue to the original creator by watching the actual video. 

## Idea

The idea is to be able to watch reaction videos to youtube videos in a way that still provides watchtime and ad revenue to the original creator. This is done by adding an IFrame with the reaction video to the page. 

The reactInject.js also loads a JSON with when to pause the main video and when to resume it. 

Creators should be able to "record" a reaction, which will keep track of pauses and resumes in the video. 
This json should then be uploaded, so that the timestamps can be used by any viewer of the reaction video.

This allows for a more interactive experience, where the viewer can watch the reaction video, while still watching the original video.

## POC

As for the proof of concept, I used 2 hardcoded videos and a hardcoded JSON with 2 timestamps.

As the reaction video is being watched in the IFrame, the main video will pause and resume at the timestamps in the JSON. 


## possible improvements
The timestamp data should preferably be fetched from a database.
IFrame is also hardcoded in position and should be able to be moved around.
To start a reaction, the user should be able to use a specific query parameter (or other methods), so that the correct reaction video is being loaded. 
