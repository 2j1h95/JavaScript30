const display = document.querySelector('.display');
const timeLeft = display.querySelector('.display__time-left');
const endTime = display.querySelector('.display__end-time');
// const buttons = document.querySelectorAll('button'); 
// 아래와 같은 역할을 하지만 아래 처럼하는게 원하는 값만 불러올수있음.
const buttons =document.querySelectorAll('[data-time]');


let countdown;

function timer(sec){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + sec * 1000;
    displayTimeLeft(sec); //여기서 한번 호출함으로써 시작하는 초부터 카운트함
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);

        if(secondLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondLeft);
    }, 1000);
}

function displayTimeLeft(sec){
    const mins = Math.floor(sec/ 60);
    sec = sec% 60;
    const hourLeft = Math.floor (sec / 3600);
    sec = sec % 3600;


    const html = (hourLeft ? hourLeft + ":" : "") + (mins < 10 ? "0" + mins: mins) + ":" + (sec < 10 ? "0"+ sec : sec );
    document.title = html;
    timeLeft.textContent = html;
}

function displayEndTime(then){
    const day = new Date(then);
    const hour = day.getHours();
    const min = day.getMinutes();
    const sec = day.getSeconds();
    console.log(day);
    const html = `${hour}:${min}:${sec}에 끝납니다!`;
    endTime.innerHTML = html;
}



buttons.forEach(button => {
    button.addEventListener('click', timer.bind(null, button.dataset.time));
});

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const min = this.minutes.value;
    console.log(min)
    timer(min * 60);
    this.reset();  
})

