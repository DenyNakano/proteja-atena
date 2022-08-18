console.log('connected');

const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', () => {
    gameArea.start()
});

const gameArea = {
    canvas: document.getElementById('canvas'),
    frames: 0,
    obstacles: [],
    //stop: false,
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        updateGameArea()

        
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
    /*crashWith(obstacles){
        return false
    }*/

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
    updatePosition() {
        this.x -= 1
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
    }
    if (key === 'ArrowDown'){
        pegasus.moveDown()
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

function checkGameOver(){
    const crashed = gameArea.obstacles.some(Obstacle => pegasus.crashWith (Obstacle))
    if (crashed) {
        gameArea.stop = true
    }
}


function updateGameArea() {
    gameArea.clear()
    pegasus.draw()
    updateObstacle()
    gameArea.frames += 1
    //if (!gameArea.stop){
    requestAnimationFrame(updateGameArea)
    
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
