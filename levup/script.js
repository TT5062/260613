// HTML 문서가 완전히 로딩될 때까지 기다렸다가 실행합니다. (집이 다 지어지고 나서 전기를 켭니다)
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 폼(서류 봉투)과 입력칸(빈칸)들을 찾아옵니다.
  const loginForm = document.getElementById('loginForm');
  const studentIdInput = document.getElementById('studentId');
  const studentNameInput = document.getElementById('studentName');

  // 2. 폼에서 '제출(submit)' 이벤트가 발생할 때 할 일을 정해줍니다.
  loginForm.addEventListener('submit', (event) => {
    // 폼이 제출되면 페이지가 새로고침되는 기본 동작을 막아줍니다. (깜빡임 방지!)
    event.preventDefault();

    // 3. 입력된 값들을 가져와서 앞뒤 여백을 잘라냅니다(trim).
    const studentId = studentIdInput.value.trim();
    const studentName = studentNameInput.value.trim();

    // 4. 값이 비어있는지 검사합니다. (경비아저씨 검문소 역할!)
    if (studentId === '') {
      alert('에헤이! 학번을 안 적으셨구마잉. 학번을 입력해주세요!');
      studentIdInput.focus(); // 학번 입력칸으로 커서를 쏙 보내줍니다.
      return; // 여기서 멈춤! 밑으로 안 내려갑니다.
    }

    if (studentName === '') {
      alert('누구신지 이름을 알려주셔야 입장시켜 드리지요! 이름을 입력해주세요!');
      studentNameInput.focus();
      return;
    }

    // 5. 무사히 검문을 통과했다면 환영 인사를 띄워줍니다.
    // (나중에는 여기서 진짜 수강신청 데이터베이스(창고)로 정보를 슝~ 보내게 될 겁니다!)
    alert(`환영합니다, ${studentName} 학생! 수강신청을 시작합니다! 찌릿! ⚡️`);
    
  });
});
