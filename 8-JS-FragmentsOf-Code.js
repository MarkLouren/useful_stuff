//* Pure JS slider with pause button: https://codepen.io/SitePoint/pen/zqVGQK
//* Gulp Directory paths:

//js/app.js — файл app.js в директории js
//js/*.js — все файлы с расширением .js в директории js
//js/**/*.js — все файлы с расширением .js в директории js и всех дочерних директориях
//!js/app.js — исключает определенный файл
//*.+(js|css) — все файлы в корневой директории с расширениями .js или .css`

//array.sort(a,b)=>{Math.random()-0.3} // random sort elements in massive

// start Game - This to the Set timeout/ Events
//
// 2 3 1 3 5 4

const game = {
  boxes: [],
  needToClickOn: 1,
  counter: 0,
  onBoxClickFn: null,
  timeoutID: null,

  onBoxClick(event) {
    // const correct = +event.target.innerText === this.needToClickOn;
    if (+event.target.innerText === this.needToClickOn) {
      if(this.needToClickOn === 1) {
        this.timeoutID = setTimeout(() => {
          alert("NE USPEL");
          this.cleanUp();
        }, 4000);
      }
      this.needToClickOn++;
      event.target.style.backgroundColor = 'green';
    }
    if (this.needToClickOn === 4) {
      alert('FINISHED');
      this.cleanUp();
      clearTimeout(this.timeoutID);
    }
  },

  cleanUp() {
    this.boxes.forEach(box => box.style.backgroundColor = '');
    this.boxes.forEach(box => box.removeEventListener('click', this.onBoxClickFn));
    this.start();
  },

  start() {
    // this.onBoxClickFn = this.onBoxClick.bind(this);
    // this.onBoxClickFn = event => this.onBoxClick(event);
    this.needToClickOn = 1;
    this.boxes.forEach(box => box.addEventListener('click', event => this.onBoxClick(event)));
    this.boxes.forEach(box => box.addEventListener('click', this.onBoxClickFn));
  },

  appendTo(container) {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game');
    // const nums = new Array(3).fill(0).map((el, i) => i + 1);
    this.boxes = Array
      .from({length: 3}, (el, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .map((el) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerText = el;
        return box;
      });

    this.boxes.forEach(box => gameWrapper.append(box));

    container.append(gameWrapper);
  }
};

game.appendTo(document.body);
game.start();

////// 
y = {...z}  // копирование обьекта y с z c новой ссылкой вместо object.Assign
y = {...z, 4} // скопировали и добавили 4 в обьект
