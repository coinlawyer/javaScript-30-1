const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
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
    [canvas.width, canvas.height] = [width, height];

    return setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = context.getImageData(0, 0, width, height);
        // mess them
       //pixels = redEffect(pixels);
    //    pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);  
    // pull them back
        context.putImageData(pixels, 0, 0);    
        // context.globalAlpha = 0.5;
    }, 16);
}

function redEffect (pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] -= 100;// red
        pixels.data[i + 1] -= 50;// green
        pixels.data[i + 2] *= 0.5; // blue
    }
    return pixels;
}

function rgbSplit (pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};
    document.querySelectorAll('.rgb input').forEach((input)=>{
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i+=4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
    
        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                // take it out
            pixels.data[i + 3] = 0;
            }
    }
    return pixels;
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