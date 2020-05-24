const body = document.querySelector("body");
const table = document.querySelector("table");

const tds = [];
const trs = [];
let turn = "X";
let result;

function resultCheck(fewTrs, fewTds) {
    result = false;
    tds[fewTrs][fewTds].innerText = turn;
    if (tds[fewTrs][0].innerText === turn && // 가로로 같을 때
        tds[fewTrs][1].innerText === turn &&
        tds[fewTrs][2].innerText === turn) {
        result = true;
        console.log(1)
    }
    if (tds[0][fewTds].innerText === turn && // 세로로 같을 때
        tds[1][fewTds].innerText === turn &&
        tds[2][fewTds].innerText === turn) {
        result = true;
        console.log(2)
    }
    if (tds[0][0].innerText === turn && // 대각선으로 같을 때 1
        tds[1][1].innerText === turn &&
        tds[2][2].innerText === turn) {
        result = true;
        console.log(3)
    }
    if (tds[2][0].innerText === turn && // 대각선으로 같을 때 2
        tds[1][1].innerText === turn &&
        tds[0][2].innerText === turn) {
        result = true;
        console.log(4)
    }
}

function reset(draw) {
    const 결과창 = document.createElement("h1");
    if (draw) {
        결과창.innerText = "무승부입니다.";
    } else {
        결과창.innerText = turn + "님의 승리입니다.";
    }
    body.appendChild(결과창);
    setTimeout(function() {
        tds.forEach(function(row) {
            row.forEach(function(square) {
                square.innerText = "";
            });
        });
        body.removeChild(결과창);
        turn = "X";
    }, 1500);
}

function handleClick(event) {
    event.preventDefault();
    if (turn === "O") {
        return;
    }
    const fewTrs = trs.indexOf(event.target.parentNode);
    const fewTds = tds[fewTrs].indexOf(event.target);
    if (tds[fewTrs][fewTds].innerText === "") {
        // 모든칸이 다 찼는지 검사
        resultCheck(fewTrs, fewTds);
        let candidate = [];
        tds.forEach(function (row) {
            row.forEach(function (square) {
                candidate.push(square);
            });
        });
        candidate = candidate.filter(function (square) {
            return !square.innerText;
        });
        console.log(candidate);
        if (result === true) {
            reset();
        } else if (candidate.length === 0) {
            reset(true);
        } else {
            if (turn === "X") {
                turn = "O";
            }
            setTimeout(function () {
                const selectSquare = candidate[Math.floor(Math.random() * candidate.length)];
                selectSquare.innerText = turn;
                const fewTrs = trs.indexOf(selectSquare.parentNode);
                const fewTds = tds[fewTrs].indexOf(selectSquare);
                // 한줄이 만들어졌는지 확인
                resultCheck(fewTrs, fewTds);
                // 만들어졌다면 초기화
                if (result) {
                    reset();
                } else {
                    turn = "X";
                }
            }, 1000)
        }
    } else {
        console.log("빈칸이 아닙니다.")
    }
}

for (i = 0; i < 3; i += 1) {
    const tr = document.createElement("tr");
    tds.push([]);
    trs.push(tr);
    table.appendChild(tr);
    for (j = 0; j < 3; j += 1) {
        const td = document.createElement("td");
        td.style.textAlign = "center";
        td.style.fontSize = "35px";
        td.style.fontWeight = "bold";
        td.addEventListener("click", handleClick);
        tds[i].push(td);
        tr.appendChild(td);
    }

}