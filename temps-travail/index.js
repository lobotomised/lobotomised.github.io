function calculateDepartureTime() {
    let workTimeMinutes = 7 * 60 + 13;

    let workTimeDelta = document.getElementById('dayWorkTimeDelta').value;
    if (workTimeDelta) {
        workTimeMinutes -= workTimeDelta * 60;
    }

    let textareaTimes = document.getElementById('timeTextarea').value.trim().split('\n');
    let times = textareaTimes.length === 3 ? textareaTimes : [
        document.getElementById('startMorning').value,
        document.getElementById('endMorning').value,
        document.getElementById('startAfternoon').value,
    ];

    if (!times.every(time => time)) {
        alert('Veuillez remplir tous les champs !');
        return;
    }

    let totalMorningMinutes = calculateDifferenceMinutes(times[0], times[1]);
    let remainingMinutes = workTimeMinutes - totalMorningMinutes;
    let departureTime = calculateTimeAfter(times[2], remainingMinutes);

    document.getElementById('departureTime').textContent = 'Heure de départ : ' + departureTime;
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
