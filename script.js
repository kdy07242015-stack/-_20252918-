const analyzeBtn = document.getElementById("analyzeBtn");
const resultDiv = document.getElementById("result");

analyzeBtn.addEventListener("click", () => {
  const foods = document.getElementById("foodInput").value.trim();
  if (!foods) {
    alert("식단을 입력해주세요! (예: 요거트, 김치, 라면)");
    return;
  }

  // 오늘 입력한 식단을 localStorage에 저장
  localStorage.setItem("todayFood", foods);

  // 기본 데이터
  let goodBacteria = 50;
  let badBacteria = 50;

  // ✅ 식단 분석 규칙 (간단한 AI 로직)
  const goodList = ["요거트", "김치", "샐러드", "두유", "현미", "사과", "브로콜리", "바나나"];
  const badList = ["햄버거", "라면", "튀김", "피자", "콜라", "감자튀김", "초콜릿"];

  goodList.forEach(item => {
    if (foods.includes(item)) goodBacteria += 10;
  });
  badList.forEach(item => {
    if (foods.includes(item)) badBacteria += 10;
  });

  // 균형 비율 제한 (0~100%)
  if (goodBacteria > 100) goodBacteria = 100;
  if (badBacteria > 100) badBacteria = 100;

  // ✅ 분석 결과 문장 생성
  let advice = "";
  if (goodBacteria > badBacteria + 10) {
    advice =
      "유익균이 잘 자라고 있어요! 장 건강을 잘 관리 중이에요 😊 꾸준히 발효식품과 채소류를 섭취하세요.";
  } else if (badBacteria > goodBacteria + 10) {
    advice =
      "유해균이 많아요 😥 튀김, 인스턴트 음식은 줄이고 식이섬유·발효식품을 늘리세요.";
  } else {
    advice =
      "균형이 나쁘지 않아요 😄 조금 더 신선식품을 추가하면 장내 환경이 더 좋아질 거예요.";
  }

  // ✅ 추천 식단 / 피해야 할 음식 / 유산균 리스트
  let recommendation = `
    <div class="recommendation">
      <h3>🥗 추천 식단</h3>
      <ul>
        <li>요거트, 샐러드, 두유, 현미밥</li>
        <li>식이섬유 많은 채소: 브로콜리, 시금치, 사과</li>
        <li>수분이 많은 과일: 키위, 배, 바나나</li>
      </ul>

      <h3>🚫 피해야 할 음식</h3>
      <ul>
        <li>튀김류, 라면, 햄버거, 탄산음료</li>
        <li>지방과 당이 많은 가공식품</li>
      </ul>

      <h3>🦠 권장 유산균</h3>
      <ul>
        <li><strong>Lactobacillus acidophilus</strong> – 장내 균형 유지 및 유해균 억제</li>
        <li><strong>Bifidobacterium longum</strong> – 스트레스 완화 및 면역력 강화</li>
        <li><strong>Streptococcus thermophilus</strong> – 소화 개선 및 발효유 주요 균주</li>
      </ul>
    </div>
  `;

  // ✅ 결과를 HTML에 출력
  resultDiv.innerHTML = `
    <h2>🔍 분석 결과</h2>
    <p>입력한 식단: <em>${foods}</em></p>
    <p>유익균 비율: ${goodBacteria}%<br>유해균 비율: ${badBacteria}%</p>
    <p><strong>AI 조언:</strong> ${advice}</p>
    ${recommendation}
  `;

  // ✅ [Chart.js 그래프 생성 코드 — 반드시 click 함수 안에]
  const ctx = document.getElementById("bacteriaChart").getContext("2d");

  // 기존 그래프 있으면 제거
  if (window.bacteriaChart) {
    window.bacteriaChart.destroy();
  }

  // 새 그래프 생성
  window.bacteriaChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["유익균", "유해균"],
      datasets: [
        {
          data: [goodBacteria, badBacteria],
          backgroundColor: ["#4caf50", "#e74c3c"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "장내 미생물 비율 그래프" },
      },
    },
  });
});


