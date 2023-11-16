import React, { useEffect, useState } from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import { getAllUser } from "../../api/UserRequests";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

const LogoSearch = () => {

  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState([])
  const [users, setUsers] = useState([])

  const [selectedOptions, setSelectedOptions] = useState('');


  const navigate = useNavigate();


  // Function triggered on selection
  function handleSelect(data) {
  
    setSelectedOptions(data);
    navigate(`/profile/${data._id}`)
    
  }

  // const handleChange = (e) => {
  //   setSearch(e.target.value)
  //   if (e.target.value !== '') {var search = users.find((val) => val.firstname.concat(val.lastname).includes(e.target.value))}

  //   if (search) {
  //     dropDown[0] = search
  //     setDropDown(dropDown)

  //   } else {
  //     setDropDown([])
  //   }
  // }
  const getAllUsers = async () => {
    const res = await getAllUser()
    setUsers(res.data)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">


        <div style = {{width:"200px", cursor:'pointer'}} >
          <Select
            options={users}
            getOptionValue={option => option.firstname}
            getOptionLabel={option => `${option?.firstname} ${option?.lastname}`}
            placeholder="#Explore"
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
          />
        </div>
        {/* <input type="text" value={search} placeholder="#Explore" onChange={handleChange} />
        <div className="s-icon">
          <UilSearch />
        </div>

      </div>
      <div style={{display: 'flex', position:'absolute', top:'50px', left:'70px',backgroundColor:"GrayText"}}>
      {
        dropDown.map((val) => (
          <option value={val.firstname.concat(val.lastname)}>{val.firstname.concat(val.lastname)}</option>
        ))
      } */}
      </div>
    </div>
  );
};

export default LogoSearch;
