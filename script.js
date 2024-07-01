import { GoogleGenerativeAI } from "@google/generative-ai";

const promptForm = document.getElementById("prompt-form");
const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const mainBox = document.getElementsByTagName("main")[0];

const outputBox = (box, text) => {
  box.className = "output";
  box.innerHTML = marked.parse(text);
};
const loader = () => {
  let output = document.createElement("div");
  output.className = "output";
  output.innerHTML = ` <span class="loader"></span>`;
  output.className = "onloader";
  mainBox.appendChild(output);
  return output;
};
const inputBox = (text) => {
  let input = document.createElement("div");
  input.className = "input";
  input.innerHTML = marked.parse(text);
  mainBox.appendChild(input);
};


// * Main function 

async function run(prompt) {
  const outBox = loader();
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  outputBox(outBox, text);
}

// * Event Listener

promptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  prompt = promptForm[0].value;
  inputBox(prompt);
  run(prompt);
});
