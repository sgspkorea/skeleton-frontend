// test.js

// 예시 문제(프론트엔드 상에서 하드코딩)
// 실제로는 서버에서 fetch로 가져올 수 있음
const questions = [
    {
      question: "images/problem1.png",
      choices: ["images/answer1-1.png", "images/answer1-2.png", "images/answer1-3.png", "images/answer1-4.png", "images/answer1-5.png"]
    },
    {
      question: "images/problem2.png",
      choices: ["images/answer1-1.png", "images/answer1-2.png", "images/answer1-3.png", "images/answer1-4.png", "images/answer1-5.png"]
    },
    {
      question: "images/problem3.png",
      choices: ["images/answer1-1.png", "images/answer1-2.png", "images/answer1-3.png", "images/answer1-4.png", "images/answer1-5.png"]
    }
  ];
  
  // 현재 문제 번호 (0부터 시작)
  let currentQuestionIndex = 0;
  // 사용자가 고른 답안을 임시로 저장
  // 예: [0, 3, 2] → 첫 문제 0번 선택, 두 번째 문제 3번 선택, ...
  let userAnswers = [];
  
  // HTML 요소 가져오기
  // const questionTitle = document.getElementById('question-title');
  // const choicesContainer = document.getElementById('choices-container');
  const prevQuestionBtn = document.getElementById('prevQuestionBtn');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  
  // 초기 문제 표시
  showQuestion(currentQuestionIndex);

  // "이전" 버튼 클릭
  prevQuestionBtn.addEventListener('click', () => {
    // 현재 선택 상태를 저장
    saveCurrentAnswer();
  
    // 이전 문제로 이동 (인덱스 감소)
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });
  
  // "다음" 버튼 클릭
  nextQuestionBtn.addEventListener('click', () => {
    // 현재 선택 상태를 저장
    saveCurrentAnswer();
  
    if (currentQuestionIndex < questions.length - 1) {
      // 아직 마지막 문제가 아니라면 다음 문제로 이동
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      // 마지막 문제였다면 결과 페이지로 이동
      // userAnswers를 localStorage에 저장 후 페이지 이동
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      window.location.href = 'result.html';
    }
  });
  

  function showQuestion(index) {
    const q = questions[index];

    // 문제 이미지 표시
    // questionTitle.innerHTML = `<img src="${q.question}" alt="문제 이미지" class="question-img">`;
      const questionImage = document.getElementById("question-image");
      questionImage.src = q.question;
      questionImage.alt = `문제 ${index + 1}`;
    
      // 선택지 영역 초기화
      const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    // 선택지를 이미지로 렌더링
    q.choices.forEach((choice, i) => {
        // const li = document.createElement('li');
        // const img = document.createElement('img');

        // img.src = choice;
        // img.alt = `선택지 ${i + 1}`;
        // img.classList.add('choice-img');
        // img.dataset.index = i; // 선택지 인덱스 저장

        const choiceWrapper = document.createElement("div");
        choiceWrapper.classList.add("choice-wrapper");

        const numberLabel = document.createElement("span");
        numberLabel.classList.add("choice-number");
        numberLabel.textContent = i + 1; // 넘버링 (1~5)

        const img = document.createElement("img");
        img.src = choice;
        img.alt = `선택지 ${i + 1}`;
        img.classList.add("choice-img");
        img.dataset.index = i; // 선택지 인덱스 저장


        // 클릭하면 선택된 답안 저장 + 다음 문제로 이동
        img.addEventListener('click', () => {
            userAnswers[currentQuestionIndex] = i; // 사용자의 선택 저장

                // 모든 선택지에서 기존 선택 표시 제거
    const allChoices = document.querySelectorAll('.choice-img');
    allChoices.forEach(img => img.classList.remove('selected'));

    // 현재 클릭한 선택지에 선택 표시 추가
    img.classList.add('selected');



            // 다음 문제 또는 결과 페이지로 이동
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
                window.location.href = 'result.html';
            }

            updateProblemNumber(); // 문제 번호 업데이트
            updateProgressBar(); // 진행 바 업데이트

        });

        // li.appendChild(img);
        // choicesContainer.appendChild(li);

        choiceWrapper.appendChild(numberLabel);
        choiceWrapper.appendChild(img);
        choicesContainer.appendChild(choiceWrapper);

    });

// 이전에 선택한 답안이 있으면 선택 표시
if (userAnswers[index] !== undefined) {
  // 먼저 모든 선택지에서 .selected 제거
  const allChoices = choicesContainer.querySelectorAll('.choice-img');
  allChoices.forEach(img => img.classList.remove('selected'));

  // 저장된 선택지 인덱스를 찾아서 선택 표시
  const selectedImg = allChoices[userAnswers[index]];
  if (selectedImg) {
      selectedImg.classList.add('selected');
  }
}

    // "이전" 버튼 활성화/비활성화 설정
    prevQuestionBtn.disabled = index === 0;
    nextQuestionBtn.textContent = index === questions.length - 1 ? 'Submit' : 'Next';

    updateProblemNumber(); // 문제 번호 업데이트
    updateProgressBar(); // 진행 바 업데이트
}

  
  // 현재 문제에서 사용자가 체크한 라디오 값 저장
  function saveCurrentAnswer() {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (selected) {
      userAnswers[currentQuestionIndex] = parseInt(selected.value, 10);
    } else {
      // 만약 선택안하고 넘어가면, undefined로 두거나 기본값을 정해도 됨
      userAnswers[currentQuestionIndex] = undefined;
    }
  }
  
  // 문제를 자동으로 넘기거나 결과 페이지로 이동
function goNextOrResult() {
  if (currentQuestionIndex < questions.length - 1) {
    // 아직 마지막 문제가 아니라면, 다음 문제로 이동
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  } else {
    // 마지막 문제에서 답안 선택 시 → result.html로 이동
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    window.location.href = 'result.html';
  }
}




// Update the problem number display
function updateProblemNumber() {
  const problemNumberElement = document.getElementById('current-problem');
  problemNumberElement.textContent = currentQuestionIndex + 1;
}

// Update the progress bar

function updateProgressBar() {
  const percentComplete = ((currentQuestionIndex + 1) / questions.length) * 100;
  const progressFill = document.getElementById('progress-fill');

  if (progressFill) {
    progressFill.style.width = `${percentComplete}%`;
  } else {
    console.error("❌ 'progress-fill' 요소를 찾을 수 없습니다.");
  }
}
