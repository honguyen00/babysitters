let isAnimating = false;
function errorMessage(form, errorP, message)  {
    const xMax = 5;
    const yMax = 5;
    if(!isAnimating) {
        isAnimating = true;
        form.find(`#${errorP}`)[0].innerText = message;
        anime({
            targets: `#${errorP}`,
            easing: 'easeInOutSine',
            duration: 500,
            translateX: [
                {
                value: xMax * -1,
                },
                {
                value: xMax,
                },
                {
                value: xMax/-2,
                },
                {
                value: xMax/2,
                },
                {
                value: 0
                }
            ],
            translateY: [
                {
                value: yMax,
                },
                {
                value: yMax  * -1,
                },
                {
                value: yMax/2,
                },
                {
                value: yMax/-2,
                },
                {
                value: 0
                }
            ],
            });
        setTimeout(() => {
            form.find(`#${errorP}`)[0].innerText = "";
            isAnimating = false;
        }, 1500);
    }
}

export default errorMessage;