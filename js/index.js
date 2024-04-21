const 정답 = "BREAD";

let attempt = 0;
let index = 0;
let timer = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display: flex; justify-content: center; align-items: center; position:absolute; top:50vh; left:35vw; background-color:white; padding:30px; border-radius:10px; border: 2px solid rgb(230, 230, 233);";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    attempt += 1;
    index = 0;
    if (attempt === 6) {
      window.removeEventListener("keydown", handleKeyDown);
      displayGameover();
      clearInterval(timer);
    }
  };

  const handleEnterKey = () => {
    const gameover = () => {
      window.removeEventListener("keydown", handleKeyDown);
      displayGameover();
      clearInterval(timer);
    };

    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempt}${i}"]`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const keyblock = document.querySelector(
        `.key-block[data-key="${입력한_글자}"]`
      );
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyblock.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyblock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyblock.style.background = "#787C7E";
      }
      block.style.color = "white";
      (console.log = "입력한 글자:"), 입력한_글자, "정답 글자:", 정답_글자;
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleaBackspace = (thisBlock) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index="${attempt}${index - 1}"]`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index="${attempt}${index}"]`
    );

    if (event.key === "Backspace") handleaBackspace(thisBlock);
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  window.addEventListener("keydown", handleKeyDown);
}

const startTimer = () => {
  const 시작_시간 = new Date();
  function setTime() {
    const 현재_시간 = new Date();
    const 경과_시간 = new Date(현재_시간 - 시작_시간);
    const 분 = 경과_시간.getMinutes().toString().padStart(2, "0");
    const 초 = 경과_시간.getSeconds().toString().padStart(2, "0");
    const timeDiv = document.querySelector("#timer");
    timeDiv.innerText = `${분}:${초}`;
    console.log = `${분}:${초}`;
  }

  timer = setInterval(setTime, 1000);
};

appStart();
startTimer();
