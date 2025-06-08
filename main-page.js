// let quesCont = document.querySelector("#que");
// let optionCont = document.querySelector("#opt");
// let btnCont = document.querySelector("#btn");
// let footer = document.querySelector("footer");
// let previousBtn = footer.querySelectorAll("button")[0];
// let nextBtn = footer.querySelectorAll("button")[1];
// let submitBtn = footer.querySelectorAll("button")[2];

// let visited = document.querySelector("#visited");
// let notvisited = document.querySelector("#not-visited");
// let answered = document.querySelector("#answered");
// let notanswered = document.querySelector("#not-answered");

// console.log(
//   quesCont,
//   optionCont,
//   btnCont,
//   footer,
//   previousBtn,
//   nextBtn,
//   submitBtn
// );

// async function main() {
//   let datafromjson = await fetch("./ques.json");
//   let storage = await datafromjson.json();
//   console.log(storage);
//   let index = 0;

//   //   create question button
//   function btncreate() {
//     storage.map((e) => {
//       let btn = document.createElement("button");
//       btn.id = e.id;
//       btn.innerHTML = e.id;
//       btnCont.append(btn);
//     });
//   }
//   btncreate();

//   let allbtn = btnCont.querySelectorAll("button");

//   /* Creating Question and option */

//   function queNdOpt() {
//     quesCont.innerHTML = storage[index].question;
//     storage[index].visited = true;
//     optionCont.innerHTML = "";
//     storage[index].option.map((e) => {
//       let opt = document.createElement("input");
//       let label = document.createElement("label");
//       opt.type = "radio";
//       opt.name = "options";
//       opt.value = e;
//       if (opt.value == storage[index].userAnswer) {
//         opt.checked = true;
//       }

//       label.innerHTML = e;
//       let div = document.createElement("div");

//       div.append(opt, label);
//       optionCont.append(div);
//       legends();
//     });
//   }
//   queNdOpt();

//   nextBtn.addEventListener("click", () => {
//     notsave();
//     saveans();
//     index = (index + 1) % storage.length;
//     queNdOpt();
//   });

//   previousBtn.addEventListener("click", () => {
//     notsave();
//     saveans();
//     index = (index - 1 + storage.length) % storage.length;
//     queNdOpt();
//   });

//   //~particular question
//   allbtn.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       notsave();
//       saveans();
//       index = btn.id - 1;
//       queNdOpt();
//     });
//   });

//   function saveans() {
//     let options = optionCont.querySelectorAll("input");
//     options.forEach((opt) => {
//       if (opt.checked) {
//         storage[index].userAnswer = opt.value;
//         allbtn.forEach((e) => {
//           if (index == e.id - 1) {
//             e.style.backgroundColor = "red";
//           }
//         });
//       }
//     });
//     console.log(storage[index]);
//   }

//   function notsave() {
//     allbtn.forEach((e) => {
//       if (index == e.id - 1) {
//         e.style.backgroundColor = "blue";
//       }
//     });
//   }

//   function legends() {
//     let visitedCount = 0;
//     let notvisitedCount = storage.length;
//     let answeredCount = 0;
//     let notansweredCount = storage.length;

//     storage.map((e) => {
//       if (e.visited) {
//         visitedCount++;
//         notvisitedCount--;
//       }

//       if (e.userAnswer) {
//         answeredCount++;
//         notansweredCount--;
//       }
//     });

//     visited.innerHTML = visitedCount;
//     notvisited.innerHTML = notvisitedCount;
//     notanswered.innerHTML = notansweredCount;
//     answered.innerHTML = answeredCount;
//     notanswered.innerHTML = notansweredCount;
//   }
// }
// main();

let quesCont = document.querySelector("#que");
let optionCont = document.querySelector("#opt");
let btnCont = document.querySelector("#btn");
let footer = document.querySelector("footer");
let previousBtn = footer.querySelectorAll("button")[0];
let nextBtn = footer.querySelectorAll("button")[1];
let submitBtn = footer.querySelectorAll("button")[2];

let visited = document.querySelector("#visited");
let notvisited = document.querySelector("#not-visited");
let answered = document.querySelector("#answered");
let notanswered = document.querySelector("#not-answered");

let secEl = document.getElementById("sec");

let timer;
let time = 60;

async function main() {
  let datafromjson = await fetch("./ques.json");
  let storage = await datafromjson.json();
  let index = 0;

  function btncreate() {
    storage.map((e) => {
      let btn = document.createElement("button");
      btn.id = e.id;
      btn.innerHTML = e.id;
      btnCont.append(btn);
    });
  }
  btncreate();
  let allbtn = btnCont.querySelectorAll("button");

  function startTimer() {
    clearInterval(timer);
    time = 60;
    updateTimer();
    timer = setInterval(() => {
      time--;
      updateTimer();
      if (time <= 0) {
        clearInterval(timer);
        alert("Time's up for this question!");
        saveans();
        index = (index + 1) % storage.length;
        queNdOpt();
      }
    }, 1000);
  }

  function updateTimer() {
    secEl.innerHTML = time < 10 ? `0${time}` : time;
  }

  function queNdOpt() {
    quesCont.innerHTML = storage[index].question;
    storage[index].visited = true;
    optionCont.innerHTML = "";
    storage[index].option.map((e) => {
      let opt = document.createElement("input");
      let label = document.createElement("label");
      opt.type = "radio";
      opt.name = "options";
      opt.value = e;
      if (opt.value == storage[index].userAnswer) {
        opt.checked = true;
      }
      label.innerHTML = e;
      let div = document.createElement("div");
      div.append(opt, label);
      optionCont.append(div);
      legends();
    });
    startTimer(); // Restart timer on each question
  }

  queNdOpt();

  nextBtn.addEventListener("click", () => {
    notsave();
    saveans();
    index = (index + 1) % storage.length;
    queNdOpt();
  });

  previousBtn.addEventListener("click", () => {
    notsave();
    saveans();
    index = (index - 1 + storage.length) % storage.length;
    queNdOpt();
  });

  allbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      notsave();
      saveans();
      index = btn.id - 1;
      queNdOpt();
    });
  });

  function saveans() {
    let options = optionCont.querySelectorAll("input");
    options.forEach((opt) => {
      if (opt.checked) {
        storage[index].userAnswer = opt.value;
        allbtn.forEach((e) => {
          if (index == e.id - 1) {
            e.style.backgroundColor = "red";
          }
        });
      }
    });
  }

  function notsave() {
    allbtn.forEach((e) => {
      if (index == e.id - 1) {
        e.style.backgroundColor = "blue";
      }
    });
  }

  function legends() {
    let visitedCount = 0;
    let notvisitedCount = storage.length;
    let answeredCount = 0;
    let notansweredCount = storage.length;

    storage.map((e) => {
      if (e.visited) {
        visitedCount++;
        notvisitedCount--;
      }

      if (e.userAnswer) {
        answeredCount++;
        notansweredCount--;
      }
    });

    visited.innerHTML = visitedCount;
    notvisited.innerHTML = notvisitedCount;
    notanswered.innerHTML = notansweredCount;
    answered.innerHTML = answeredCount;
  }

  submitBtn.addEventListener("click", () => {
    clearInterval(timer);
    saveans();
    showResult();
  });

  // function showResult() {
  //   document.getElementById("quest-cont").style.display = "none";
  //   document.getElementById("option-cont").style.display = "none";
  //   document.getElementById("button-cont").style.display = "none";
  //   footer.style.display = "none";

  //   const resultCont = document.getElementById("result-cont");
  //   resultCont.style.display = "block";
  //   resultCont.innerHTML = `<h2>Quiz Results:</h2>`;

  //   storage.forEach((q, i) => {
  //     const div = document.createElement("div");
  //     const isCorrect = q.userAnswer === q.correctAns;
  //     div.className = "result-question";
  //     div.innerHTML = `
  //       <strong>Q${i + 1}:</strong> ${q.question}<br>
  //       <strong>Your Answer:</strong>
  //         <span class="${isCorrect ? "correct" : "wrong"}">
  //           ${q.userAnswer || "Not Answered"}
  //         </span><br>
  //       <strong>Correct Answer:</strong> <span class="correct">${
  //         q.correctAns
  //       }</span>
  //     `;
  //     resultCont.appendChild(div);
  //   });
  // }
  function showResult() {
    document.getElementById("quest-cont").style.display = "none";
    document.getElementById("option-cont").style.display = "none";
    document.getElementById("button-cont").style.display = "none";
    footer.style.display = "none";

    const resultCont = document.getElementById("result-cont");
    resultCont.style.display = "block";

    let score = 0;

    // Count correct answers
    storage.forEach((q) => {
      if (q.userAnswer === q.correctAns) {
        score++;
      }
    });

    resultCont.innerHTML = `
      <h2>Quiz Results:</h2>
      <h3>Your Score: ${score} / ${storage.length}</h3>
      <hr>
    `;

    // Show individual question results
    storage.forEach((q, i) => {
      const div = document.createElement("div");
      const isCorrect = q.userAnswer === q.correctAns;
      div.className = "result-question";
      div.innerHTML = `
        <strong>Q${i + 1}:</strong> ${q.question}<br>
        <strong>Your Answer:</strong> 
          <span class="${isCorrect ? "correct" : "wrong"}">
            ${q.userAnswer || "Not Answered"}
          </span><br>
        <strong>Correct Answer:</strong> <span class="correct">${
          q.correctAns
        }</span>
      `;
      resultCont.appendChild(div);
    });
  }
}

main();
