import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

const InfoModal = (props) => {
    if (props.show) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Información del sistema
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger">
                        <Alert.Heading>Hubo un error al enviar al recibir la información</Alert.Heading>
                        <p>
                            Tenemos problemas para mostrar la información, verifica la conexión a internet y recarga el sitio.
                            Verifica que haya conexión a internet.
                        </p>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default InfoModal