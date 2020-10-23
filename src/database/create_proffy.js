module.exports = async function(db, { proffy, classData, class_schedule }) {
    // Inserting proffy data
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffy.name}",
            "${proffy.avatar}",
            "${proffy.whatsapp}",
            "${proffy.bio}"
        )
    `)
    const proffy_id = insertedProffy.lastID

    // Inserting class data
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classData.subject}",
            "${classData.cost}",
            "${proffy_id}"
        )
    `)
    const class_id = insertedClass.lastID

    // Inserting class schedule data
    const allInsertedClasses = class_schedule.map((scheduleItem) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${scheduleItem.weekday}",
                "${scheduleItem.time_from}",
                "${scheduleItem.time_to}"
            )
        `)
    })
    await Promise.all(allInsertedClasses)
}