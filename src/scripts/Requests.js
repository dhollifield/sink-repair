import { getRequests, getPlumbers, getCompletions, saveCompletion, deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = { 
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()
            }

            saveCompletion(completion)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const Requests = () => {
    
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completions = getCompletions()
    
    const convertRequestToListItems = (request) => {
        let html = ""
        if (completions.find((x) => x.requestId == request.id)) {
            return html += `<div class="request complete">
            ${request.description}
            <button class="request__delete" id="request--${request.id}">
                    Delete
                </button>
            </div>`
        } else {
            return `<div class="request">
                ${request.description}
                <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}).join("")}
                    
            </select>
                <button class="request__delete" id="request--${request.id}">
                Delete
                </button>
                </div>`
                }
            }
                
                let html = `${requests.map(convertRequestToListItems).join("")}`
                
                return html
}