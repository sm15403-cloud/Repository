// 🔥 import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 config
const firebaseConfig = {
  apiKey: "AIzaSyACcCirr7O28Efvuj4O1rKKDIe8Smod-OQ",
  authDomain: "study-planner-1b13a.firebaseapp.com",
  projectId: "study-planner-1b13a"
};

// 🚀 init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 สมัคร
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("สมัครสำเร็จ 🎉");
  } catch (err) {
    alert(err.message);
  }
};

// 🔐 login
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "choose.html";
  } catch (err) {
    alert(err.message);
  }
};

// 🤖 AI วิเคราะห์ (ต้องอยู่นอก login!)
window.analyzeAI = function () {
  const interest = document.getElementById("interest").value;
  const skill = document.getElementById("skill").value;
  const job = document.getElementById("job").value;

  let score = {
    engineering: 0,
    medicine: 0,
    business: 0,
    art: 0
  };

  if (interest === "science") score.medicine += 2;
  if (interest === "math") score.engineering += 2;
  if (interest === "art") score.art += 2;

  if (skill === "analysis") score.engineering += 2;
  if (skill === "memory") score.medicine += 2;
  if (skill === "creative") score.art += 2;

  if (job === "office") score.business += 2;
  if (job === "field") score.medicine += 1;
  if (job === "freelance") score.art += 2;

  let best = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );

  let resultText = "";

  if (best === "engineering") {
    resultText = "🤖 AI แนะนำ: วิศวกรรม / IT";
  } else if (best === "medicine") {
    resultText = "🤖 AI แนะนำ: แพทย์ / พยาบาล";
  } else if (best === "business") {
    resultText = "🤖 AI แนะนำ: บริหาร / การตลาด";
  } else {
    resultText = "🤖 AI แนะนำ: นิเทศ / ออกแบบ";
  }

  document.getElementById("result").innerText = resultText;
};