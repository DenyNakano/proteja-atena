console.log('connected');
console.log(gameArea)
const startBtn = document.getElementById('startBtn')

startBtn.onclick = gameArea.start()

const gameArea = {
    canvas: document.getElementById('canvas'),
    frames: 0,

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
}

/*class Obstacle{
    constructor (){
        this.x = 800;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.obstacle = new arrow()
        this.obstacle.src = './images/arrrow.png'
    }
    create(){
        const ctx = gameArea.context
        ctx.createArrow(this.obstacle, this.x, this.y, this.width, this.height)
        let obstacle = Math.floor(Math.random)*frames
    }

}
const arrow = new Obstacle() */   

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

function updateGameArea(){
    gameArea.clear()
    pegasus.draw()
    gameArea.frames += 1
    requestAnimationFrame(updateGameArea)
}

/*const arrowObstacle = () => {
    setInterval(()=>{

    })
}*/