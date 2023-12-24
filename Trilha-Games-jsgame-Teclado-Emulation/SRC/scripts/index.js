const pianokeys = document.querySelectorAll('.piano-keys .key');
let  mapedKeys = [];
let audio = new Audio("SRC/tunes/a.wav");
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');

const playTune = (key) => {
    audio.src = `SRC/tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add('active');
    setTimeout(() => {
        clickedKey.classList.remove('active');
    }, 150);
}

pianokeys.forEach(key => {
    console.log(key.dataset.key);
    key.addEventListener('click', () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener('keydown', (e) => {
   if(mapedKeys.includes(e.key)){
         playTune(e.key);
   }
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

const showHideKeys = (e) => {
    pianokeys.forEach(key => key.classList.toggle('hide'));
};

volumeSlider.addEventListener('input', handleVolume);

keysCheck.addEventListener('click', showHideKeys);