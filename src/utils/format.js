const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

// Getting the subject name
function getSubject(subjectNumber) {
    const position = subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(hours_str) {
    const [hours, minutes] = hours_str.split(":")
    return Number((hours * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}