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
        <h2>${prompt}</h2>
        <input type="text" id="goal-input" placeholder="${example}" />
        <button onclick="submitStep()">დახარისხება</button>
    `;
}

function submitStep() {
    const input = document.getElementById("goal-input").value.trim();
    const step = GOAL_STEPS[stepIndex];
    if(input === "") return alert("გთხოვთ შეავსოთ ველი!");
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
    if(goals.length === 0) {
        document.getElementById("game-container").innerHTML = `
            <button onclick="startGoal()">დამატება ახალი მიზანი</button>
            <button onclick="showGoals()">მიზნების ჩვენება</button>
            <p>მიზნები ჯერ არ არის დამატებული</p>
        `;
        return;
    }

    let html = `<h2>თქვენი მიზნები</h2>`;
    goals.forEach((g, i) => {
        html += `<pre>${i+1}. ${JSON.stringify(g, null, 2)}</pre>`;
    });
    html += `<button onclick="startGoal()">დამატება ახალი მიზანი</button>`;
    html += `<button onclick="showGoals()">მიზნების ჩვენება</button>`;

    document.getElementById("game-container").innerHTML = html;
}
