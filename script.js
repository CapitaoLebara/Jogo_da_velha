const xClass = "x"
const oClass="o"
let xTurn

const cells = document.querySelectorAll(".cell")

const board = document.querySelector("#board")

const gameEnd= document.querySelector("[data-game]")

const gameEndElement= document.querySelector("#game-endElement")

const Restart_Button=document.querySelector("#restart")

/*==== LISTA DE PROBABILIDADE ====*/
const lines =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
]



/*==== START_GAME ====*/

startGame() 

function startGame(){
    xTurn=true
    board.classList.add("x")

    cells.forEach(cell=>{
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        board.classList.replace('o','x')


        cell.addEventListener("click",handleClick,{once:true})
    })
    Restart_Button.addEventListener('click',startGame)
    gameEndElement.classList.remove("show")
    document.querySelector('main').classList.remove('end')
}



/*==== HANDLE_CLICK ====*/
function handleClick(e){
    let cell = e.target
    let TurnClass = xTurn?xClass:oClass

    placeMarker(cell,TurnClass)

    if(checkwin(TurnClass)){
        endGame(false)
    }else if(checkDraw()){
        endGame(true)
    }
    swapTurn()
    setBoardHover()
}


function placeMarker(cell, TurnClass){
    cell.classList.add(TurnClass)
}


function swapTurn(){
    xTurn=!xTurn
}
function setBoardHover(){
    xTurn ? board.classList.replace('o','x') : board.classList.replace('x','o')
}

/*==== GANHAR O JOGO ====*/
function checkwin(TurnClass){
    return lines.some(line =>{
        return line.every(index =>{
            return cells[index].classList.contains(TurnClass)
        })
    })

}

function checkDraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

/*==== EMPATE ====*/

function endGame(drow){
    if(drow){
        gameEnd.innerText = "Empate!"
    }else{
        gameEnd.innerText = `${xTurn ? "X's" : "O's"} Venceu!`
    }
    gameEndElement.classList.add("show")
    document.querySelector('main').classList.add('end')
}