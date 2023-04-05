import React from 'react'
import Navbar from '../../custom/Navbar/Navbar'
import { Container, Form, Row, Button, Table } from 'react-bootstrap'
import HomeService from '../../../services/HomeService'
import InfoModal from '../../custom/Messages/InfoModal'

const Home = () => {
    //States
    const [search, setSearch] = React.useState("")
    // const [selectedFiledata, setSelectedFileData] = React.useState("")
    const [filesData, setFilesData] = React.useState([])
    const [error, setError] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    const [ShowInfoModal, setShowInfoModal] = React.useState(false)

    //functions
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const getFilesData = React.useCallback(async () => {
        setLoad(true)
        if (search === "") {
            try {
                let getfilesData = await HomeService.getDocumentData()
                // console.log(getfilesData)
                switch (getfilesData.code) {
                    case 'Error500':
                        setLoad(false)
                        setError(true)
                        setShowInfoModal(true)
                        throw Error('Hubo un erorr al traer la información')
                    case 'success':
                        setFilesData(getfilesData.files)
                        setLoad(false)
                        break;
                    default:
                        console.log('something went wrong')
                        setShowInfoModal(true)
                        setError(true)
                        setLoad(false)
                }
            } catch (error) {
                console.log(error)
                setError(true)
                setLoad(false)
            }
        } else {
            if (search.length > 3) {
                try {
                    let getfilesData = await HomeService.getDocumentDataByQuery(search)
                    // console.log(getfilesData)
                    switch (getfilesData.code) {
                        case 'Error500':
                            setLoad(false)
                            setError(true)
                            setShowInfoModal(true)
                            throw Error('Hubo un erorr al traer la información')
                        case 'success':
                            console.log(getfilesData.files)
                            if(getfilesData.files){
                                setFilesData(getfilesData.files)
                                setLoad(false)
                            }else{
                                setFilesData([])
                                setLoad(false)
                            }
                            break;
                        default:
                            console.log('something went wrong')
                            setShowInfoModal(true)
                            setError(true)
                            setLoad(false)
                    }
                } catch (error) {
                    console.log(error)
                    setError(true)
                    setLoad(false)
                }
            }
        }
    }, [search])


    const handleSubmit = async (e) => {
        e.preventdefault()
        console.log('submit')
    }

    //useEffect

    React.useEffect(() => {
        void getFilesData()
    }, [getFilesData])

    return (
        <>
            <Navbar />
            {load && <> <Container><p>Cargando...</p></Container> </>}
            {
                filesData && error ?
                    (
                        <Container><p>Hubo un error al traer la información</p></Container>
                    )
                    :
                    (
                        <Container>
                            <Row className='mt-4'>
                                <Form className='d-flex' onSubmit={(e) => handleSubmit(e)}>
                                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                                        {/* <Form.Label>Buscar</Form.Label> */}
                                        <Form.Control type="search" onChange={handleChange} value={search} placeholder="Search for FileName..." />
                                    </Form.Group>

                                    <Button className='h-75 mr-2' variant="primary" type="button">
                                        Buscar...
                                    </Button>
                                </Form>
                            </Row>
                            <Row>
                                <Table className='border rounded-1 border-2' responsive striped bordered>
                                    <thead className='border-bottom border-3 border-dark'>
                                        <tr>
                                            <th className='border border-1 rouded-1'>#</th>
                                            <th className='border border-1'>File name</th>
                                            <th className='border border-1'>Text</th>
                                            <th className='border border-1'>Number</th>
                                            <th className='border border-1'>Hex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filesData && filesData.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{item.file}</td>
                                                        <td>{item.text}</td>
                                                        <td>{item.number}</td>
                                                        <td>{item.hex}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Row>
                        </Container>
                    )
            }
            <InfoModal show={ShowInfoModal} onHide={() => setShowInfoModal(false)} />
        </>
    )
}

export default Home