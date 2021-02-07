

let grid = document.getElementsByClassName("grid")[0];
let result = document.getElementById("result");
let point = document.getElementById("points");
let flagsLeft = document.getElementById("flagsLeft");
let randArray = [];
let clickedFlags = [];
let totalBoxes = 100, totalBomb = 10, points = 0, flagLeft = 10;
document.getElementById("reset").addEventListener("click", resetGame);
function implement() {
    showBoxes();
    randomArray();
    randerPoints();
}

function showBoxes() {
    for (let i = 0; i < totalBoxes; i++) {
        let box = document.createElement("div");
        box.setAttribute("id", `${i}`);
        box.setAttribute("class", "valid");
        box.addEventListener("mousedown", handleOnmousedown);
        grid.appendChild(box);
    }
}


function randomArray() {
    for (let i = 0; i < totalBomb; i++) {
        let rand = Math.floor(Math.random() * totalBoxes);
        while (randArray.includes(rand)) {
            rand = Math.floor(Math.random() * totalBoxes);
        }
        document.getElementById(`${rand}`).className = "bomb";
        randArray.push(rand);
    }
}

function randerPoints() {
    for (let i = 0; i < totalBoxes; i++) {
        document.getElementById(`${i}`).setAttribute("data", `${calPoints(i)}`);
    }
}

function calPoints(id) {
    let c = 0;
    let row = id / 10;
    row = Math.floor(row);
    let col = id % 10;
    let arr = [];
    let r1 = Math.max(0, row - 1);
    let r2 = Math.min(9, row + 1);
    let c1 = Math.max(0, col - 1);
    let c2 = Math.min(9, col + 1);
    for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
            arr.push(i * 10 + j);
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (randArray.includes(arr[i])) {
            c++;
        }
    }
    arr = [];
    return c;
}

function handleOnmousedown(event) {
    if (event.button == 0) {
        leftButton(event);
    }
    if (event.button == 2) {
        rightButton(event);
    }

}

function leftButton(event) {
    let ele = event.target;
    if (randArray.includes(Number(ele.id))) {
        showBomb();
        lost();
    }
    else {
        ele.innerHTML = ""; //in case it containes flag
        if (ele.style.backgroundColor!="green")
        {
        points += Number(ele.getAttribute("data"));
        point.innerHTML = `${points}`
        }
        ele.style.backgroundColor = "green";
        ele.innerHTML = ele.getAttribute("data");
        ele.className += " checked";
        ele.removeEventListener("mousedown",handleOnmousedown);
        if (points >= 90) {
            won();
        }
    }
}

function rightButton(event) {
    let ele = event.target;
    if (flagLeft != 0 && !(ele.innerHTML == "🚩")) {
        ele.innerHTML = "🚩";
        ele.className += " flag";
        flagLeft -= 1;
        flagsLeft.innerHTML = `${flagLeft}`;

        if ((randArray.includes(Number(ele.id))) && (!clickedFlags.includes(Number(ele.id)))) {
            clickedFlags.push(Number(ele.id));
            if (clickedFlags.length == 10) {
                won();
            }
        }
    }
}

function showBomb() {
    for (let i = 0; i < totalBomb; i++) {
        let ele = document.getElementById(`${randArray[i]}`);
        ele.innerHTML = ""; // in case it has flag
        ele.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
        ele.style.backgroundColor = "red";
        ele.style.backgroundSize = "cover";
    }
    removeEvent();
}

function removeEvent() {
    for (let i = 0; i < totalBoxes; i++) {
        document.getElementById(`${i}`).removeEventListener("mousedown", handleOnmousedown);
    }
}

function won() {
    result.innerHTML = "YOU WIN!";
}

function lost() {
    result.innerHTML = "YOU LOSE!"
}

function resetGame() {
    for (let i = 0; i < totalBoxes; i++) {
        let box = document.getElementById(`${i}`);
        grid.removeChild(box);
    }
    result.innerHTML = "";
    randArray = [];
    clickedFlags = [];
    points = 0;
    flagLeft = 10;
    flagsLeft.innerHTML = "10";
    point.innerHTML = "0";
    implement();

}

implement();