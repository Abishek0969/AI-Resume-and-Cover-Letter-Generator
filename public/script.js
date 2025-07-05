const form = document.getElementById("resume-form");
const outputBox = document.getElementById("output-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  outputBox.textContent = "Generating... Please wait...";

  const data = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    skills: document.getElementById("skills").value,
    education: document.getElementById("education").value,
    experience: document.getElementById("experience").value,
    extra: document.getElementById("extra").value,
  };

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    outputBox.textContent = result.output;
  } catch (err) {
    console.error(err);
    outputBox.textContent = "Something went wrong!";
  }
});
