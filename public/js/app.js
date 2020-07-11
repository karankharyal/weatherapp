console.log('client side js file is loaded')




const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const link = '/weather?address=' + encodeURI(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch(link).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
                
            }
        })
    })
      

})