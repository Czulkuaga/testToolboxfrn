import Settings from '../config/Settings'
const HomeService = {}
const GET_DOCUMENT_DATA_URL_API = `${Settings}/files/data`
const GET_DOCUMENT_DATA_BY_FILENAME_URL_API = `${Settings}/files/find-one/data`

HomeService.getDocumentData = async() => {
    let getFilesData = await fetch(GET_DOCUMENT_DATA_URL_API, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(!getFilesData.ok){
        let response = {
            code: 'Error500',
            msg: 'Something went wrong'
        }
        return response
    }

    let data = await getFilesData.json()
    let response = {
        code: 'success',
        files: data.files
    }
    return response
}

HomeService.getDocumentDataByQuery = async (query1) => {
    let getFilesData = await fetch(`${GET_DOCUMENT_DATA_BY_FILENAME_URL_API}?fileName=${query1}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(!getFilesData.ok){
        let response = {
            code: 'Error500',
            msg: 'Something went wrong'
        }
        return response
    }

    let data = await getFilesData.json()
    console.log(data)
    let response = {
        code: 'success',
        files: data.file
    }
    return response
}

export default HomeService