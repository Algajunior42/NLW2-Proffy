// Import Database
const database = require("./database/db")

// Import objects and function from format.js
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require("./utils/format")

function landingPage (req, res) {
    return res.render("index.html")
}

async function studyPage (req, res) {
    const filters = req.query

    // Checking if the fields are empty
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays }) 
    }

    // Converting the time to minutes
    const timeInMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            JOIN classes
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to > ${timeInMinutes}
        )
        AND classes.subject = "${filters.subject}"
    `

    // Prevent Database ERROR
    try {
        const db = await database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", { proffys, filters, subjects, weekdays })
    } catch (error) {
        console.log(error)
    }
}

// To do
function teachPage (req, res) {
    return res.render("teach.html", { subjects, weekdays })
}

async function submitForm(req, res) {
    const createProffy = require("./database/create_proffy")
    
    const proffy = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classData = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const class_schedule = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await database
        await createProffy(db, { proffy, classData, class_schedule })

        let queryString ="?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {  landingPage, studyPage, teachPage, submitForm }