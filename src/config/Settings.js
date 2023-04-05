//If production is true send the api is the server remote URL
let production = false

let localURL = 'http://localhost:4000'
let remoteUrl = ''

let responseURL = (production) ?  remoteUrl : localURL

export default  responseURL
