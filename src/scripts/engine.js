const state = {
   view: {
      squeres: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
   },
   values: {
      hitPosition: 0,
      result: 0,
      currentTime: 60,
   },
   actions:{
      tirmerId: setInterval(randomSquare, 1000),
      currentTimeDown: setInterval(countDown, 1000),
   }
}

function countDown() {
   state.values.currentTime--
   state.view.timeLeft.textContent= state.values.currentTime
   if (state.values.currentTime <= 0) {
      playsound("gameover.wav");
      clearInterval(state.actions.currentTimeDown);
      clearInterval(state.actions.tirmerId);
      alert("Game Over! Your result: " + state.values.result)
   }
}

function playsound(audioName) {
   let sound = new Audio(`./src/audios/${audioName}`);
   sound.volume = 0.2;
   sound.play();
}


function randomSquare() {
   state.view.squeres.forEach((square) => {
      square.classList.remove("enemy")
   })
   let randomNumber = Math.floor(Math.random() * 9);
   let randomSquare = state.view.squeres[randomNumber];
   randomSquare.classList.add("enemy");
   if (state.values.hitPosition === randomSquare.id ){
      playsound("enemy.mp3");
   }
   state.values.hitPosition = randomSquare.id;
}

function addListinerHitBox() {
   state.view.squeres.forEach( (square) => {
      square.addEventListener("mousedown", () => {
         if (square.id === state.values.hitPosition) {
            state.values.result++;
            playsound("hit.m4a");
            state.view.score.innerHTML = parseInt(state.values.result);
            state.values.hitPosition = null;
         }
      });
    });;
}

function initialize() {
   addListinerHitBox();
}

initialize()