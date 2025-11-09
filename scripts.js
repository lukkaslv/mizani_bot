let GOAL_STEPS = ["name", "specific", "measureable", "achievable", "relevant", "timebound", "plan"];
let PROMPTS = {
    name: "📝 შეიყვანეთ თქვენი მიზანის სახელი:",
    specific: "🎯 S: კონკრეტულად რას მინდა მივაღწიო?",
    measureable: "📊 M: როგორ მივხვდები, რომ მივაღწიე მიზანს?",
    achievable: "✅ A: რეალურია ეს მიზანი ჩემთვის თუ არა?",
    relevant: "💖 R: რატომ არის ეს მიზანი ჩემთვის მნიშვნელოვანი?",
    timebound: "⏰ T: როდის მინდა რომ მივაღწიო ამ მიზანს?",
    plan: "🛠️ აღწერეთ სამოქმედო გეგმა"
};
let SMART_EXAMPLES = {
    name: "მაგალითი: 'ფიზიკური ფორმის გაუმჯობესება 3 თვეში'",
    specific: "მაგალითი: 'ვიქნები ვარჯიშში 3 დღე კვირაში, 30 წუთი'",
    measureable: "მაგალითი: '5 კმ გავირბენ უპრობლემოდ'",
    achievable: "მაგალითი: 'ჩემთვის ეს რეალურია'",
    relevant: "მაგალითი: 'ჯანმრთელობა მნიშვნელოვანია'",
    timebound: "მაგალითი: '3 თვის შემდეგ'",
    plan: "მაგალითი: 'ვაკეტავ განრიგს, ვადევნებ პროგრესს'"
};

let currentGoal = {};
let stepIndex = 0;
let goals = [];

function startGoal() {
    stepIndex = 0;
    currentGoal = {};
    showStep();
}

function showStep() {
    const step = GOAL_STEPS[stepIndex];
    const prompt = PROMPTS[step];
    const example = SMART_EXAMPLES[step];

    document.getElementById("game-container").innerHTML = `
        <h2 class="fade-in">${prompt}</h2>
        <input class="fade-in" type="text" id="goal-input" placeholder="${example}" />
        <div class="buttons">
            <button class="fade-in submit-step">დახარისხება</button>
        </div>
    `;

    // Назначаем событие кнопке после перерисовки
    document.querySelector(".submit-step").addEventListener("click", submitStep);
}

function submitStep() {
    const input = document.getElementById("goal-input").value.trim();
    if(input === "") { 
        alert("გთხოვთ შეავსოთ ველი!");
        return;
    }

    const step = GOAL_STEPS[stepIndex];
    currentGoal[step] = input;

    stepIndex++;
    if(stepIndex < GOAL_STEPS.length) {
        showStep();
    } else {
        goals.push(currentGoal);
        showGoals();
    }
}

function showGoals() {
    let html = `<h2 class="fade-in">თქვენი მიზნები</h2>`;

    if(goals.length === 0) {
        html += `<p class="fade-in">მიზნები ჯერ არ არის დამატებული</p>`;
    } else {
        goals.forEach((g, i) => {
            html += `
            <div class="goal-card fade-in">
                <strong>${i+1}. ${g.name}</strong>
                <div class="goal-field"><strong>🎯 S:</strong> ${g.specific}</div>
                <div class="goal-field"><strong>📊 M:</strong> ${g.measureable}</div>
                <div class="goal-field"><strong>✅ A:</strong> ${g.achievable}</div>
                <div class="goal-field"><strong>💖 R:</strong> ${g.relevant}</div>
                <div class="goal-field"><strong>⏰ T:</strong> ${g.timebound}</div>
                <div class="goal-field"><strong>🛠️ გეგმა:</strong> ${g.plan}</div>
            </div>`;
        });
    }

    html += `
        <div class="buttons">
            <button class="start-goal">დამატება ახალი მიზანი</button>
            <button class="show-goals">მიზნების ჩვენება</button>
        </div>
    `;

    document.getElementById("game-container").innerHTML = html;

    // Назначаем события кнопкам после перерисовки
    attachButtons();
}

function attachButtons() {
    document.querySelectorAll(".start-goal").forEach(btn => btn.addEventListener("click", startGoal));
    document.querySelectorAll(".show-goals").forEach(btn => btn.addEventListener("click", showGoals));
}

// Инициализация
attachButtons();
