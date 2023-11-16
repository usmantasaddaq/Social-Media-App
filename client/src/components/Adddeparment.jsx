import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Department from "./Newdepartment/Reactmodal/Department"
import { Table } from "reactstrap"
import Updatedeparmentmodel from './Updatedepartment/Updatedeparmentmodel'





function Adddeparment() {


    const [datam, setData] = useState([]);
    const items = JSON.parse(localStorage.getItem('userdetail'));


    const Handledelete = async (id) => {

        const { data } = await axios.delete(`http://localhost:5000/api/add/departments/${id._id}`,
            {
                headers: {
                    authorization: `${items.token}`
                }
            });
        if (data) {
            alert("datato delete", data)
        }
    }


    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/add/departments/getall`);
            setData(data);
        }
        getData();
    }, [datam]);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}><Department buttonLabel="Addnew department" />

                <div style={{ marginTop: "20px" }}>
                    <div className="row">
                        <div className="col-md-6">


                            <Table bordered hover striped >
                                <thead className='bg-info text-dark' style={{ position: "relative",left: "-70px" }}>
                                    <tr>
                                        <th>DepartmentId</th>
                                        <th>DeparmentName</th>
                                        <th> Delete operation</th>
                                        <th>Update operation</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        datam?.length > 0 && datam.map((val, ind) =>
                                            <tr key={ind}>
                                                <td>{val._id}</td>
                                                <td>{val.departmentname}</td>
                                                <td><button className='btn btn-warning' onClick={() => Handledelete(val)}> Delete</button></td>
                                                <td><Updatedeparmentmodel buttonLabel="Update" updatevalue={val} /></td>

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </Table>


                        </div>
                    </div>

                </div>
            </div>


        </>

    )
}

export default Adddeparment