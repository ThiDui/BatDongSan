import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row,InputGroup } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
// import '../Home/home.css';
import './search.css';
function Search({data}) {
    
     const [filteredData, setFilteredData] = useState([]);
     const [wordEntered, setWordEntered] = useState("");

     const [tinbds, setTinBDS] = useState([]);
   
 
     useEffect(() => {
         loadTinBDS();
     }, []);
 
     const loadTinBDS = async () => {
         const result = await axios.get('http://localhost:3001/batdongsan');
         setTinBDS(result.data);
 
     }


    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = tinbds.filter((value) => {
          return value.BDS_Ten.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };

      const clearInput = ()=>{
        setFilteredData([])
        setWordEntered("");
      }

    

    return (


        <Form className='witdhForm' >
       {/* <div className="searchAD">
                <InputGroup className="mb-3">
                  <Form.Control
                  className="boxSearchAD"
                    size="sm"
                    placeholder="Search for..."
                    aria-label="Search for..."
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="secondary" id="button-addon2">
                  <SearchIcon />
                  </Button>
                </InputGroup>
              </div> */}
             
        <div className='selectSearch'>
          <InputGroup className="mb-3 searchGroup" >
        <Form.Control type="text" placeholder="search" value={wordEntered}
          onChange={handleFilter} />
         <InputGroup.Text className="searchIcon" id="basic-addon2">
         {
            filteredData.length ===0 ? (
            <SearchIcon />
            )
            : (
              <CloseIcon onClick={clearInput} />
            )
          }
          </InputGroup.Text>
      
        

        </InputGroup>

                {filteredData.length != 0 && (
                <div className="dataResult">
                {filteredData.slice(0, 5).map((value, key) => {
                    return (
                    <Link onClick={clearInput} key ={key} className="dataItem" to ={`/batdongsan/detail/${value.BDS_Ma}`} >
                        <p>{value.BDS_Ten} </p>
                    </Link>
                    );
                })}
                </div>
            )}
        </div>
           
          
          
            

        </Form>
      
          
   
);

}

export default Search;