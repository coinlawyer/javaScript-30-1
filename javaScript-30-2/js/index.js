const secondHand = document.querySelector('.second-hand', setDate);
const minuteHand = document.querySelector('.minute-hand', setDate);
const hoursHand = document.querySelector('.hour-hand', setDate);

function setDate(){
    const date = new Date;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minutesDegrees = (minutes / 60 * 360) + 90;
    const hoursDegrees = (hours / 12 * 360) + 90;
    console.log(hours); 
    console.log(minutes); 
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
    console.log(seconds);
}

setInterval(setDate, 1000);
setDate();  
