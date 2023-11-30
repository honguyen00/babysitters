function errorMessage(form, errorP, message)  {
    form.find(`#${errorP}`)[0].innerText = message;
    const xMax = 5;
    const yMax = 5;
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
    }, 1500);
}

export default errorMessage;