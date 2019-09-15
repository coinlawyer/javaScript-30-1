const timeNodes = Array.from(document.querySelectorAll('[data-time]')); //convert the array like object to the array

const seconds = timeNodes 
    .map(node => node.dataset.time) // get the time duration of each element
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat); // desrtucturing the time into mins and secs
        return (mins * 60) + secs; // return each items duration in seconds
    })
    .reduce((total, timeInSeconds) => total + timeInSeconds); // cout all items time duration in seconds

    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft/3600);
    secondsLeft %= 3600;
    const mins = Math.floor(secondsLeft/60);
    secondsLeft = secondsLeft % 60;
    

