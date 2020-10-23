// Turn on the eventListener to the #add-time button
document.querySelector("#add-time")
.addEventListener("click", addField)

function addField() {
    // Schedule fieldset
    const parent = document.querySelector("#schedule")

    // Schedule sections
    const field = document.querySelector(".schedule-box").cloneNode(true)

    // Add a remove button
    const button = document.createElement("button")
    button.type = "button"
    button.innerHTML = "Remover"
    
    // Clean and add new clones of schedule sections
    var inputFields = field.querySelectorAll("input")
    inputFields.forEach(clear)

    field.appendChild(button)
    parent.appendChild(field)
}

function clear (input) {
    input.value = ""
}
