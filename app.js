document
  .getElementById("modules")
  .addEventListener("input", generateModuleFields);
document.getElementById("gpa-form").addEventListener("submit", calculateGPA);

function generateModuleFields() {
  const moduleCount = document.getElementById("modules").value;
  const modulesContainer = document.getElementById("modules-container");
  modulesContainer.innerHTML = "";

  for (let i = 1; i <= moduleCount; i++) {
    modulesContainer.innerHTML += `
            <div>
                <label for="grade-${i}">Module ${i} Grade:</label>
                <select id="grade-${i}" name="grade-${i}" required>
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
                
                <label for="credits-${i}">Module ${i} Credits:</label>
                <input type="number" id="credits-${i}" name="credits-${i}" min="1" required>
            </div>
        `;
  }
}

function calculateGPA(event) {
  event.preventDefault();

  const moduleCount = document.getElementById("modules").value;
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= moduleCount; i++) {
    const grade = document.getElementById(`grade-${i}`).value;
    const credits = parseFloat(document.getElementById(`credits-${i}`).value);

    const gradePoints = convertGradeToPoints(grade);
    totalPoints += gradePoints * credits;
    totalCredits += credits;
  }

  const gpa = totalPoints / totalCredits;
  document.getElementById("gpa-result").innerText = `Your GPA is: ${gpa.toFixed(
    2
  )}`;
}

function convertGradeToPoints(grade) {
  const gradeScale = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };
  return gradeScale[grade] || 0;
}
