let gameSeq= []
let userSeq=[]

let started =false
let level=0
let h2 = document.querySelector("h2")
let highestScore= localStorage.getItem("highestScore")|| 0
document.querySelector(".highest-score").innerText=`Heighest Score: ${highestScore}`

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game stared")
        started=true
        levelUp() // call kya levelUp function ko jisse ki anykey press karne ke baad level 1show hoye
}
})

let btns= ['red','yellow','green','purple']

function levelUp(){
    // reset game after levelUP
    userSeq=[]
    level+=1
    h2.innerText=`level ${level}`
    //random color choose
    let randomIdx= Math.floor(Math.random()*4)
    let randomColor= btns[randomIdx]
    console.log(randomColor)
    let randomBtn=document.querySelector(`.${randomColor}`)
    gameflash(randomBtn)
    gameSeq.push(randomColor)
    console.log(gameSeq)

}

function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
        },250)
}
function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash")
        },100)
}

function checkAns(idx){
    // let idx= level-1
    if(gameSeq[idx]===userSeq[idx]){
        // console.log("correct")
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000)
        }
        }else{
            // console.log("wrong")
            h2.innerHTML=`Game over🎮!!! Your's score : <b>${level}</b> <br>Press any key to start`
            document.querySelector("body").style.backgroundColor="red"
            setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgba(144, 169, 182, 0.656)"
            },150)
            if (level > highestScore) {
                highestScore = level
                localStorage.setItem("highestScore", highestScore)
                document.querySelector(".highest-score").innerText = `Highest Score: ${highestScore}`
                
            }
            console.log("wrong")
            
            resetGame()
            }   
        
}

function resetGame(){
            started=false
            userSeq=[]
            gameSeq=[]
            level=0
}

function btnPress(){
    let btn=this
    userflash(this)

    let userColor= btn.getAttribute("id")
    userSeq.push(userColor)
    checkAns(userSeq.length-1)
}
let allbtns=document.querySelectorAll(".btn")
for( let btn of allbtns){
btn.addEventListener("click",btnPress)
}



