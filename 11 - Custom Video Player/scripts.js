// 요소들을 가져옴
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

 
//함수를 제작함

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    // toggle.textContent = this.paused ? '►' : '❚ ❚'; 
    // 같은동작함.
}

function skip(){
    console.log(`스킵 ${this.dataset.skip}`);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    console.log(this.value);
}

function handleProgress(){
    const percent = (video.currentTime/ video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

//가져온 요소들을 이벤트에 포함시킴
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});
ranges.forEach(silder => {
    silder.addEventListener('change', handleRangeUpdate);
    silder.addEventListener('mousemove', handleRangeUpdate);
})

let mouseDown = false
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', () => {
//     if(mouseDown === true){
//         scrub();
//     }
// });
progress.addEventListener('mousemove', (e)=> mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);