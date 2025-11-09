const GOAL_STEPS = ["name", "specific", "measureable", "achievable", "relevant", "timebound", "plan"];
const PROMPTS = {
    "name": "📝 შეიყვანეთ თქვენი მიზნის სახელი:",
    "specific": "🎯 S: კონკრეტულად რას მინდა მივაღწიო?",
    "measureable": "📊 M: როგორ მივხვდები, რომ მივაღწიე მიზანს?",
    "achievable": "✅ A: რეალურია ეს მიზანი ჩემთვის თუ არა?",
    "relevant": "💖 R: რატომ არის ეს მიზანი ჩემთვის მნიშვნელოვანი?",
    "timebound": "⏰ T: როდის მინდა რომ მივაღწიო ამ მიზანს?",
    "plan": "🛠️ აღწერეთ სამოქმედო გეგმა, მიზნის მისაღწევად გადადგმული ნაბიჯები:"
};

const SMART_EXAMPLES = {
    "name": "მაგალითი: 'ფიზიკური ფორმის გაუმჯობესება 3 თვის განმავლობაში'",
    "specific": "მაგალითი: 'ვაპირებ კვირაში 3 ჯერ 30 წუთი სირბილს'",
    "measureable": "მაგალითი: 'შევძლებ 5 კმ გაჩერების გარეშე სირბილს'",
    "achievable": "მაგალითი: 'ჩემი არსებული ფორმით ეს რეალურია'",
    "relevant": "მაგალითი: 'ჯანმრთელობა და ენერგია სამუშაოსთვის მნიშვნელოვანია'",
    "timebound": "მაგალითი: '3 თვის განმავლობაში'",
    "plan": "მაგალითი: 'შევადგინო ვარჯიშის გრაფიკი, დავაკვირდე პროგრესს'"
};

let currentGoal = {};
let stepIndex = 0;
let savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");

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
        <h2>${prompt}</h2>
        <input type="text" id="goal-input" placeholder="${example}" />
        <button onclick="submitStep()">დახარისხება</button>
    `;
}

function submitStep() {
    const step = GOAL_STEPS[stepIndex];
    const value = document.getElementById("goal-input").value.trim();
    if (!value) return alert("გთხოვთ შეიყვანოთ ტექსტი!");

    currentGoal[step] = value;
    stepIndex++;

    if (stepIndex < GOAL_STEPS.length) {
        showStep();
    } else {
        saveGoal();
    }
}

function saveGoal() {
    savedGoals.push({ ...currentGoal, progress: 0 });
    localStorage.setItem("goals", JSON.stringify(savedGoals));
    document.getElementById("game-container").innerHTML = `
        <h2>მიზანი შენახულია!</h2>
        <pre>${JSON.stringify(currentGoal, null, 2)}</pre>
        <button onclick="startGoal()">დამატება კიდევ ერთი მიზანი</button>
        <button onclick="showGoals()">მიზნების ჩვენება</button>
    `;
}

function showGoals() {
    let html = "<h2>თქვენი მიზნები:</h2>";
    savedGoals.forEach((goal, i) => {
        html += `<h3>${i + 1}. ${goal.name}</h3><p>პროგრესი: ${goal.progress}%</p>`;
        html += `<pre>${JSON.stringify(goal, null, 2)}</pre>`;
    });
    html += `<button onclick="startGoal()">მიზნის დამატება</button>`;
    document.getElementById("game-container").innerHTML = html;
}
