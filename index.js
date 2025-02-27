$(document).ready(function() {
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();

        // Simulando envio de formulário
        alert('Obrigado, ' + name + '! Sua mensagem foi enviada com sucesso.');

        // Limpar o formulário após o envio
        $('#contact-form')[0].reset();
    });
});

const events = {
    '2025-02-22': 'Culto Presbitério',
    '2025-03-05': 'Jantar de Casais',
    '2025-03-29': 'Encontro de Pastores e Líderes',
    '2025-04-18': 'Retiro de Jovens',
    '2025-04-19': 'Retiro de Jovens',
    '2025-04-20': 'Retiro de Jovens/Páscoa',
    '2025-04-27': 'Batismo',
    '2025-05-17': 'Retiro da Igreja',
    '2025-05-18': 'Retiro da Igreja',
    '2025-06-02': 'Aniversário da Igreja',
    '2025-06-14': 'Encontro de Mulheres',
    '2025-07-01': '',
    '2025-08-01': '',
    '2025-09-01': '',
    '2025-10-01': '',
    '2025-11-01': '',
    '2025-12-25': 'Natal',
};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function generateCalendar(year, month) {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; // Clear previous calendar

    const date = new Date(year, month);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let table = `<table>
        <thead>
            <tr><th colspan="7">${monthName} ${year}</th></tr>
            <tr><th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sáb</th></tr>
        </thead>
        <tbody><tr>`;

    let dayCounter = 0;
    for (let i = 0; i < firstDay; i++) {
        table += '<td></td>';
        dayCounter++;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events[formattedDate];
        const eventDot = event ? '<div class="event-dot"></div>' : ''; // Add dot if event exists

        table += `<td data-date="${formattedDate}" onclick="showEvent('${formattedDate}')">${day}${eventDot}</td>`;
        dayCounter++;

        if (dayCounter % 7 === 0) {
            table += '</tr><tr>';
        }
    }

    while (dayCounter % 7 !== 0) {
        table += '<td></td>';
        dayCounter++;
    }

    table += '</tr></tbody></table>';
    calendarContainer.innerHTML = table;

    updateEventList(year, month); // Update the event list
}



function updateEventList(year, month) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; // Clear previous list

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    for (const date in events) {
        const eventDate = new Date(date);
        if (eventDate >= startDate && eventDate <= endDate) {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${date}: ${events[date]}`;
            eventList.appendChild(listItem);
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar-container');
    const eventList = document.getElementById('event-list');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthYearDisplay = document.getElementById('currentMonthYear');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const events = [
        { title: 'Reunião de Oração', start: '2025-02-26T20:00:00' },
        { title: 'Culto das Mulheres', start: '2025-02-27T20:00:00' },
        { title: 'Missão Social', start: '2025-02-28T19:00:00' },
        { title: 'Estudo Bíblico', start: '2025-03-01T20:00:00', description: 'Estudo quinzenal' },
        { title: 'Culto dos Homens', start: '2025-03-01T20:00:00', description: 'Culto quinzenal' },
        { title: 'Jiu-Jitsu com Propósito', start: '2025-03-01T10:00:00' },
        { title: 'Culto dos Jovens (IDC)', start: '2025-03-02T20:00:00' },
        { title: 'Culto da Família', start: '2025-03-03T19:00:00' }
    ];

    function generateCalendar(year, month) {
        calendarContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        currentMonthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const daysOfWeekRow = document.createElement('div');
        daysOfWeekRow.classList.add('row', 'mb-2', 'fw-bold');
        daysOfWeek.forEach(day => {
            const dayOfWeekCell = document.createElement('div');
            dayOfWeekCell.classList.add('col', 'text-center');
            dayOfWeekCell.textContent = day;
            daysOfWeekRow.appendChild(dayOfWeekCell);
        });
        calendarContainer.appendChild(daysOfWeekRow);

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('div');
            weekRow.classList.add('row');
            for (let j = 0; j < 7; j++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('col', 'border', 'p-2', 'text-center', 'calendar-day');
                if (i === 0 && j < startingDay) {
                } else if (dayCounter <= daysInMonth) {
                    dayCell.textContent = dayCounter;
                    const currentDateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayCounter.toString().padStart(2, '0')}`;
                    const matchingEvents = events.filter(event => event.start.startsWith(currentDateString));
                    if (matchingEvents.length > 0) {
                        matchingEvents.forEach(event => {
                            const eventMarker = document.createElement('div');
                            eventMarker.classList.add('bg-primary', 'text-white', 'rounded', 'p-1', 'mt-1', 'small');
                            eventMarker.textContent = event.title;
                            dayCell.appendChild(eventMarker);
                            dayCell.addEventListener('click', () => {
                                alert(`Evento: ${event.title}\n${event.description || ''}`);
                            });
                        });
                    }
                    dayCounter++;
                }
                weekRow.appendChild(dayCell);
            }
            calendarContainer.appendChild(weekRow);
            if (dayCounter > daysInMonth) break;
        }
        displayUpcomingEvents(year, month);
    }

    function displayUpcomingEvents(year, month) {
        eventList.innerHTML = '';
        const today = new Date();
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.start);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.start) - new Date(b.start));

        upcomingEvents.forEach(event => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${event.title} - ${new Date(event.start).toLocaleString('pt-BR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}`;
            eventList.appendChild(listItem);
        });
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

    generateCalendar(currentYear, currentMonth);
});