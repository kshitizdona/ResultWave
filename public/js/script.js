function updateDate() {
    const englishDateElement = document.getElementById('englishDate');

    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const englishDate = now.toLocaleDateString('en-US', options);

    englishDateElement.textContent = englishDate;
}

updateDate();