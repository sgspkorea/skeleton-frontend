// test.js

// 예시 문제(프론트엔드 상에서 하드코딩)
// 실제로는 서버에서 fetch로 가져올 수 있음
const questions = [
    {
      question: "다음 중 대한민국의 수도는?",
      choices: ["부산", "서울", "대구", "광주", "대전"]
    },
    {
      question: "원주율(π)에 가장 가까운 숫자는?",
      choices: ["1.41", "2.17", "2.72", "3.14", "3.21"]
    },
    {
      question: "다음 중 프로그래밍 언어가 아닌 것은?",
      choices: ["JavaScript", "Python", "HTML", "C++", "TypeScript"]
    }
  ];
  
  // 현재 문제 번호 (0부터 시작)
  let currentQuestionIndex = 0;
  // 사용자가 고른 답안을 임시로 저장
  // 예: [0, 3, 2] → 첫 문제 0번 선택, 두 번째 문제 3번 선택, ...
  let userAnswers = [];
  
  // HTML 요소 가져오기
  const questionTitle = document.getElementById('question-title');
  const choicesContainer = document.getElementById('choices-container');
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
  
  // 현재 문제 표시 함수
  function showQuestion(index) {
    const q = questions[index];
    questionTitle.textContent = `Q${index + 1}. ${q.question}`;
  
    // 선택지 영역 초기화
    choicesContainer.innerHTML = '';
  
    // 선택지 렌더링
    q.choices.forEach((choice, i) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const radio = document.createElement('input');
  
      radio.type = 'radio';
      radio.name = 'choice';
      radio.value = i;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${choice}`));
      li.appendChild(label);

      // 라디오 버튼 "change" 이벤트 → 선택 즉시 다음 문제(혹은 결과 페이지)
      radio.addEventListener('change', () => {
        // 사용자가 이 문제에서 고른 답안 저장
        userAnswers[currentQuestionIndex] = parseInt(radio.value, 10);
        goNextOrResult();
      });
  
      choicesContainer.appendChild(li);
    });
  
    // 이전에 선택했던 답안이 있다면 라디오 버튼에 체크
    if (userAnswers[index] !== undefined) {
      const savedAnswerIndex = userAnswers[index];
      // 라디오 버튼 중 savedAnswerIndex에 해당하는 것 체크
      const radios = document.querySelectorAll('input[name="choice"]');
      if (radios[savedAnswerIndex]) {
        radios[savedAnswerIndex].checked = true;
      }
    }
  
    // "이전" 버튼은 첫 문제(인덱스 0)일 때 비활성화
    if (index === 0) {
      prevQuestionBtn.disabled = true;
    } else {
      prevQuestionBtn.disabled = false;
    }
  
    // "다음" 버튼 텍스트 변경(마지막 문제일 경우 'Finish' 등)
    if (index === questions.length - 1) {
      nextQuestionBtn.textContent = 'Finish';
    } else {
      nextQuestionBtn.textContent = 'Next';
    }
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