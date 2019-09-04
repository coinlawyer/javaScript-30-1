function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout (timeout);     
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    console.log(e);
}

