// result.js

const emailInput = document.getElementById('emailInput');
const submitEmailBtn = document.getElementById('submitEmailBtn');

// localStorage에서 userAnswers 가져오기
let userAnswers = [];
// try {
//   const storedAnswers = localStorage.getItem('userAnswers');
//   if (storedAnswers) {
//     userAnswers = JSON.parse(storedAnswers);
//   }
// } catch (e) {
//   console.error("Error parsing userAnswers", e);
// }

submitEmailBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  if (!email) {
    alert("이메일을 입력해주세요!");
    return;
  }


    // "userAnswers" 변수에 사용자가 풀었던 객관식 인덱스들을 담아둔다고 가정
    fetch('https://wiz-5w0i.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          answers: userAnswers // [0, 3, 2] 같은 배열
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("서버 응답:", data);
        alert(`결과 이메일이 전송되었습니다! 점수: ${data.score}`);
      })
      .catch(err => {
        console.error("에러 발생:", err);
        alert("이메일 전송 중 오류가 발생했습니다.");
      });



  // 데모용
  // console.log("User Email:", email);
  // console.log("User Answers:", userAnswers);
  // alert("데모: 서버로 전송했다고 가정했습니다. 콘솔 로그를 확인하세요!");


});
