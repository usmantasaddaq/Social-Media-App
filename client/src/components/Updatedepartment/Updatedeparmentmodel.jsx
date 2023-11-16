
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function Updatedeparmentmodel(props) {
    const [mode, setMode] = useState(false)
    const [datatoupdate, setdatatoupdate] = useState(props.updatevalue.departmentname)

    const items = JSON.parse(localStorage.getItem('userdetail'));





    const toggle = () => {
        setMode(!mode)

    }
    const handleSubmmition = async (event) => {
        // event.preventDefault()
        // try {
        //     await axios.put(`http://localhost:5098/api/add/departments/${props.updatevalue._id}`, {
        //         departmentname: datatoupdate
        //     }, {
        //         headers: {
        //             authorization: `${items.token}`
        //         }
        //     })
        // } catch (error) {
        //     console.log("error", error.message)
        // }

        // toggle()

    }


    return (

        <div >
            <Button color="success" onClick={toggle}>{props.buttonLabel}</Button>
            <Modal isOpen={mode} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Department</ModalHeader>
                <ModalBody>

                    <Form onSubmit={handleSubmmition}>
                        <FormGroup>
                            <Label for="iddepartmentname">Deparment Name</Label>
                            <Input type="text" name="departmentname" value={datatoupdate} onChange={(e) => setdatatoupdate(e.target.value)} id="iddepartmentname" />
                        </FormGroup>

                        <ModalFooter>

                            <Button color="primary" type='submit'>{props.buttonLabel}</Button>
                            <Button color="secondary" onClick={toggle}>Close</Button>



                        </ModalFooter>

                    </Form>
                </ModalBody>

            </Modal>
        </div>
    )

}

export default Updatedeparmentmodel