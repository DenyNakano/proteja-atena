console.log('connected');

const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', () => {
    gameArea.start()
});

const gameArea = {
    canvas: document.getElementById('canvas'),
    frames: 0,
    obstacles: [],
    powers: [],
    score: 0,
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        updateGameArea()

        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    setScore: function () {
        const points = gameArea.score;
        this.context.font = '60px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);

    }
}

class Knight{
    constructor (){
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.moveSpeed = 5;
        this.image = new Image()
        this.image.src = './images/pegasus1.png'
    }
    draw(){
        const ctx = gameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    moveUp(){
       if(this.y <= 0){
        this.y = 0
       } else {
        this.y -= 50
    }
    }
    moveDown(){
        if(this.y >= 400) {
        this.y = 400
    } else {
        this.y += 50
    }
    }
    
}

class Obstacle{
    constructor (y){
        this.x = 700;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = new Image()
        this.image.src = './images/arrrow.png'
    }
    draw(){
        const ctx = gameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        
    }
    updatePosition(){
        this.x -= 1
        if(this.x <= 0){
            gameOver()
        }
    }

    top (){
        return this.y
    }
    bottom (){
        return this.y + this.height
    }
    left (){
        return this.x
    }
    right (){
        return this.x + this.width
    }
    
    crashWith(power){
        return !(
            this.bottom() < power.top()
            || this.top() > power.bottom()
            || this.right() < power.left()
            || this.left() > power.right()
        )
    }
}

class Power{
    constructor(y){
      this.x = 50;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.image = new Image()
      this.image.src = './images/meteoro.png'
    }
  
    draw(){
      const ctx = gameArea.context
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
  
    updateThrowPower(){
      this.x += 1
    }
    
    top (){
        return this.y
    }
    bottom (){
        return this.y + this.height
    }
    left (){
        return this.x
    }
    right (){
        return this.x + this.width
    }
  }
//const arrow = new Obstacle(250)   

const pegasus = new Knight()

const startWalking = () => {
    setInterval(()=>{
        gameArea.clear()
        pegasus.draw()
    },100)
}


document.addEventListener('keydown', (e) => {

    const key = e.code
    if (key === 'ArrowUp'){
        pegasus.moveUp()
        e.preventDefault()
    }
    if (key === 'ArrowDown'){
        pegasus.moveDown()
        e.preventDefault()
    }
    if (key === 'ArrowRight') {
        throwPower()
    }
    
})

function createObstacle() {
    let minHeight = 30
    let maxHeight = 450 
    let y = Math.floor(minHeight + Math.random() * (maxHeight-minHeight))
    console.log(y)
    let arrow = new Obstacle(y)
    gameArea.obstacles.push(arrow)
}

function throwPower() {
    console.log(pegasus.y)
    const power = new Power(pegasus.y)
  
    gameArea.powers.push(power)
    updateThrowPower()
  }
  
  function updateThrowPower() {
    for (power of gameArea.powers) {
      power.updateThrowPower()
      power.draw()
    }
  }
function checkScore(){
    let crashed = false
    for (let i = 0; i < gameArea.powers.length; i += 1) {
        for (let j = 0; j < gameArea.obstacles.length; j += 1) {
            crashed = gameArea.obstacles[j].crashWith(gameArea.powers[i])
            console.log(crashed)
            if (crashed){
                gameArea.obstacles.splice(j, 1)
                gameArea.powers.splice(i, 1)
                gameArea.score += 1
                break
            }
        }
    }
    
}
function gameOver() {
    gameArea.stop = true
}

function updateGameArea() {
    gameArea.clear()
    pegasus.draw()
    updateObstacle()
    updateThrowPower()
    checkScore()
    gameArea.frames += 1
    gameArea.setScore()
    if (!gameArea.stop){
    requestAnimationFrame(updateGameArea)
} else {
    cancelAnimationFrame(updateGameArea)
}

function updateObstacle() {
    if(gameArea.frames % 120 === 0){
        createObstacle()
    }

    for(arrow of gameArea.obstacles) {
        arrow.updatePosition()
        arrow.draw();
    }
}
}