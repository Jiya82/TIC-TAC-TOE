let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; //player x and o;
let count = 0 ;//To track draw;

const patterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [6,4,2],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };



//forEach to apply for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //console.log("Clicked");
        box.style.color = "purple"; //changes color of innerText
        if(turnO){
            box.innerText="O";
            turnO=false;
        } else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled= true; 
        //Box disabled because once value is entered ,it doesn't change on clicking it again.
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled =true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes) {
        box.disabled = false;
        box.innerText= "";
    }
};


const showWinner =(winner) => {
    msg.style.color="black";
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    confetti({
        particleCount: 150,
        spread: 75,
        origin: { y: 0.6 }
    });
};



const checkWinner = () => {
    for (let pattern of patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        //This condition checks that either of the 3 positions should not be empty. All the 3 should have some value to be declared as winner. 
        if(pos1Val != "" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){//Checks if the value of pos 1,2 and 3 are all equal i.e either all O or all X
                showWinner(pos1Val);
                return true;
            }  
        }
    }
};

    newGameBtn.addEventListener("click", resetGame);
    reset.addEventListener("click", resetGame);