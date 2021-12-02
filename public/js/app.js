const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'
messageTwo.textContent = 'Loading..'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the browser to refresh after value is entered and not allow the server to render a new page
    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})