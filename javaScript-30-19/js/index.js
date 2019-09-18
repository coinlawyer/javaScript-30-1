const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err=> {
            console.error('Oh NO!', err);   
        });
}

function paintToCanvas () {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    [canvas.width, canvas.height] = [width, height];

    return setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
        let pixels = context.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
    }, 16);
}

function redEffect (pixels) {
    for (let i = 0; i < pixels.length; i+=4) {
        pexels[i + 0] = pixels.data[i + 0] + 100;// red
        pixels[i + 1] = pixels.data[i + 1] -50;// green
        pixels[i + 2] = pixels.data[i + 2] * 0.5 // blue

    }
}

function takePhoto () {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas); 