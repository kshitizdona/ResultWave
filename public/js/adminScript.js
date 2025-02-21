function checkSemester() {
    const semester = document.getElementById('semester').value;
    const electivesDiv = document.getElementById('electives');
    electivesDiv.innerHTML = ''; // Clear previous fields
    if (semester === '5') {
        addElectiveFields('Elective-I');
    } else if (semester === '6') {
        addElectiveFields('Elective-II');
    }
}

function addElectiveFields(electiveName) {
    const electivesDiv = document.getElementById('electives');
    const electiveCountLabel = document.createElement('label');
    electiveCountLabel.setAttribute('for', 'electiveCount');
    electiveCountLabel.textContent = `Number of Subjects for ${electiveName}:`;
    electivesDiv.appendChild(electiveCountLabel);

    const electiveCountInput = document.createElement('input');
    electiveCountInput.setAttribute('type', 'number');
    electiveCountInput.setAttribute('name', 'electiveCount');
    electiveCountInput.setAttribute('id', 'electiveCount');
    electiveCountInput.setAttribute('min', '1');
    electiveCountInput.setAttribute('required', 'required');
    electivesDiv.appendChild(electiveCountInput);

    const generateElectiveFieldsButton = document.createElement('button');
    generateElectiveFieldsButton.setAttribute('type', 'button');
    generateElectiveFieldsButton.setAttribute('onclick', `generateElectiveFields('${electiveName}')`);
    generateElectiveFieldsButton.textContent = 'Generate Elective Fields';
    electivesDiv.appendChild(generateElectiveFieldsButton);
}

function generateSubjectFields() {
    const subjectCount = document.getElementById('subjectCount').value;
    const subjectsDiv = document.getElementById('subjects');
    subjectsDiv.innerHTML = ''; // Clear previous fields
    for (let i = 0; i < subjectCount; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        subjectDiv.innerHTML = `
        <label for="name">Subject Name : </label>
        <input type="text" name="subjects[${i}][name]" required>
    `;
        subjectsDiv.appendChild(subjectDiv);
    }
}

function generateElectiveFields(electiveName) {
    const electiveCount = document.getElementById('electiveCount').value;
    const electivesDiv = document.getElementById('electives');
    for (let i = 0; i < electiveCount; i++) {
        const electiveDiv = document.createElement('div');
        electiveDiv.classList.add('subject');
        electiveDiv.innerHTML = `
        <label for="elective${i}">${electiveName} Subject-${i + 1}:</label>
        <input type="text" name="electives[${i}][name]" required>
    `;
        electivesDiv.appendChild(electiveDiv);
    }
}