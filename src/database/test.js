const database = require("./db")
const createProffy = require("./create_proffy")

database.then(async (db) => {
    proffy = {
            name: "Diego Fernandes",
            avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
            whatsapp: "91823685",
            bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        }

    classData = {
        subject:"Química",
        cost: "20"
        //proffy_id:
    }

    class_schedule = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
            //class_id:
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
            //class_id:
        }
    ]

    //await createProffy(db, { proffy, classData, class_schedule })

    // Sample queries
    //const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // const selectedClassesOnProffys = await db.all(`
    //     SELECT classes.*, proffys.*
    //     FROM proffys
    //     JOIN classes ON (classes.proffy_id = proffys.id)
    //     WHERE classes.proffy_id = 1;
    // `)
    // console.log(selectedClassesOnProffys)

    const selectedScheduleClasses = await db.all(`
        SELECT * FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 420
        AND class_schedule.time_to > 520;
    `)
    // console.log(selectedScheduleClasses)
})