function calculateDepartureTime() {
    const timeTextareaEl = document.getElementById('timeTextarea');
    const todayKey = 'timeTextarea-' + new Date().toISOString().slice(0, 10);
    localStorage.setItem(todayKey, timeTextareaEl.value.trim());

    let workTimeMinutes = 7 * 60 + 13;

    let workTimeDelta = document.getElementById('dayWorkTimeDelta').value.trim()
    if (workTimeDelta) {
        workTimeMinutes -= parseTimeDelta(workTimeDelta);
    }

    let textareaTimes = timeTextareaEl.value.trim().split('\n');
    let times = textareaTimes.length === 3 && textareaTimes.every(t => t.includes(':')) ? textareaTimes : [
        document.getElementById('startMorning').value,
        document.getElementById('endMorning').value,
        document.getElementById('startAfternoon').value,
    ];

    if (!times.every(time => time)) {
        alert('Veuillez remplir tous les champs !');
        return;
    }

    times[2] = enforceMinimalLunchTime(times[1], times[2]);

    let totalMorningMinutes = calculateDifferenceMinutes(times[0], times[1]);
    let remainingMinutes = workTimeMinutes - totalMorningMinutes;
    let departureTime = calculateTimeAfter(times[2], remainingMinutes);

    document.getElementById('departureTime').textContent = 'Heure de départ : ' + departureTime;
}

function parseTimeDelta(delta) {
    // Vérifie le signe + ou -
    let sign = delta.startsWith('-') ? -1 : 1;

    // Enlève le signe et sépare les heures et minutes
    let time = delta.slice(1).split(':');
    let hours = parseInt(time[0], 10);
    let minutes = parseInt(time[1], 10);

    // Convertit tout en minutes et applique le signe
    return sign * (hours * 60 + minutes);
}

function calculateDifferenceMinutes(time1, time2) {
    // Sépare les heures des minutes
    let splitTime1 = time1.split(':');
    let splitTime2 = time2.split(':');

    let date1 = new Date(2023, 0, 1, splitTime1[0], splitTime1[1]);
    let date2 = new Date(2023, 0, 1, splitTime2[0], splitTime2[1]);

    let diff = date2 - date1;

    return diff / 1000 / 60;
}

function calculateTimeAfter(time1, minutes) {
    let splitTime1 = time1.split(':');

    let date = new Date(2023, 0, 1, splitTime1[0], splitTime1[1]);
    date.setMinutes(date.getMinutes() + minutes);

    let hours = date.getHours();
    let mins = date.getMinutes();

    return (hours < 10 ? '0' : '') + hours + ':' + (mins < 10 ? '0' : '') + mins;
}

function enforceMinimalLunchTime(time1, time2) {
    let break_duration = calculateDifferenceMinutes(time1, time2);

    return break_duration < 45 ?  calculateTimeAfter(time1, 45) : time2
}

window.addEventListener('DOMContentLoaded', () => {
    const todayKey = 'timeTextarea-' + new Date().toISOString().slice(0, 10);
    const storedValue = localStorage.getItem(todayKey);
    if (storedValue) {
        document.getElementById('timeTextarea').value = storedValue;
        calculateDepartureTime();
    }
});
