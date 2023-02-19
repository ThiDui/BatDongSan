import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, InputGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Axios from 'axios';

// import '../Home/home.css';
import './search.css';
function Search({ data }) {
  // console.log(data)
  // ,tinhthanh, quanhuyen, xaphuong,handleTinhthanh, handleQuanhuyen, handleXaPhuong ,diachi,handleReSert,handlePrice, handleDienTich
  const navigate = useNavigate();
  const [tinhthanh, setTinhthanh] = useState([]);
  const [quanhuyen, setQuanhuyen] = useState([]);
  const [xaphuong, setXaphuong] = useState([]);
  const [loaibds, setLoaibds] = useState([]);
  const [tenTt, setTenTt] = useState("");
  const [tenQh, setTenQh] = useState("");
  const [tenXp, setTenXp] = useState("");
  const [diachi, setDiaChi] = useState("");

  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxDienTich, setMaxDienTich] = useState('');
  const [minDienTich, setMinDienTich] = useState('');
  const [loaiGd, setLoaiGd] = useState('');
  const [loaibdsFind, setLoaibdsFind] = useState('');
  

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");


  useEffect(() => {
    loadloaiBds();
    
}, []);

const loadloaiBds = async () => {
    const result = await Axios.get('http://localhost:3001/loaibatdongsan');
    setLoaibds(result.data);
    
    
}

  useEffect(() => {
    if (tenTt || tenQh) {
      setDiaChi(tenTt + "," + tenQh + "," + tenXp)
    }

    if (tenTt) {
      setDiaChi(tenTt)

    }
    if (tenTt && tenQh) {
      setDiaChi(tenTt + "," + tenQh)
    }
    if (tenTt && tenQh && tenXp) {
      setDiaChi(tenTt + "," + tenQh + "," + tenXp)
    }


  })

  useEffect(() => {
    Axios.get('http://localhost:3001/address/tinhthanh')
      .then((result) => {
        setTinhthanh(result.data);

      })

  }, []);

  const handleTinhthanh = (id) => {
    // console.log("tinhthanh",id)
    let idma = id.slice(0, id.indexOf('_'));
    let name = id.slice(id.indexOf('_') + 1);
    setTenTt(name);

    Axios.get('http://localhost:3001/address/quanhuyen')
      .then((result) => {

        const dt = result.data.filter((a) => a.TinhThanhTTMa == idma)
        setQuanhuyen(dt);
      })

  }


  const handleQuanhuyen = (id) => {
    let idmaqh = id.slice(0, id.indexOf('_'));
    let nameqh = id.slice(id.indexOf('_') + 1);
    setTenQh(nameqh);
    Axios.get('http://localhost:3001/address/xaphuong')
      .then((result) => {
        const dt = result.data.filter((a) => a.QuanHuyenQHMa == idmaqh)
        setXaphuong(dt);
      })

  }
  const handleXaPhuong = (id) => {
    let idmaqh = id.slice(0, id.indexOf('_'));
    let nameqh = id.slice(id.indexOf('_') + 1);
    setTenXp(nameqh);

  }
  const handleReSert = () => {

    setTenTt("");
    setTenQh("");
    setTenXp("");
    setDiaChi("");
  }
  const handleLoaiGd = (id) => {
    setLoaiGd(id);
  }

  const handleLoaiBds = (id) => {
    setLoaibdsFind(id);
  }

  const handlePrice = (id) => {
    if (id == 0) {
      setMinPrice("");
      setMaxPrice("");

    }
    if (id == 1) {
      setMinPrice(1);
      setMaxPrice(20000);

    }
    if (id == 2) {
      setMinPrice(20000);
      setMaxPrice(40000);

    }
    if (id == 3) {
      setMinPrice(40000);
      setMaxPrice(60000);

    }
    if (id == 14) {
      setMinPrice(60000);
      setMaxPrice(100000);

    }
    if (id == 4) {
      setMinPrice(100000);
      setMaxPrice(300000);

    }
    if (id == 5) {
      setMinPrice(300000);
      setMaxPrice(500000);

    }
    if (id == 6) {
      setMinPrice(500000);
      setMaxPrice(1000000);

    }
    if (id == 7) {
      setMinPrice(1000000);
      setMaxPrice(3000000);

    }
    if (id == 8) {
      setMinPrice(3000000);
      setMaxPrice(7000000);

    }
    if (id == 9) {
      setMinPrice(7000000);
      setMaxPrice(10000000);

    }
    if (id == 10) {
      setMinPrice(10000000);
      setMaxPrice(30000000);

    }
    if (id == 11) {
      setMinPrice(30000000);
      setMaxPrice(50000000);

    }
    if (id == 12) {
      setMinPrice(50000000);
      setMaxPrice(80000000);

    }
    if (id == 13) {
      setMinPrice(0);
      setMaxPrice(0);

    }

  }

  const handleDienTich = (id) => {
    if (id == 0) {
      setMinDienTich("");
      setMaxDienTich("");

    }
    if (id == 1) {
      setMinDienTich(0);
      setMaxDienTich(30);

    }
    if (id == 2) {
      setMinDienTich(30);
      setMaxDienTich(50);

    }
    if (id == 3) {
      setMinDienTich(50);
      setMaxDienTich(100);

    }
    if (id == 4) {
      setMinDienTich(100);
      setMaxDienTich(200);

    }
    if (id == 5) {
      setMinDienTich(200);
      setMaxDienTich(300);

    }
    if (id == 6) {
      setMinDienTich(300);
      setMaxDienTich(500);

    }

  }

  //live search
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
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

  const handleSearch = () => {
    let newData = data.filter(item => { return (diachi == "") ? item : (item.BDS_DiaChiCuThe.toLowerCase().includes(diachi.toLowerCase())) })
      .filter(item => { return (loaiGd == "") ? item : (item.LoaiGiaoDichLGDMa == loaiGd) })
      .filter(item => { return (loaibdsFind == "") ? item : (item.LoaiBDLMa == loaibdsFind) })
      .filter(item => { return (minPrice == "" && maxPrice == "") ? item : (item.BDS_Gia >= minPrice && item.BDS_Gia <= maxPrice) })
      .filter(item => { return (minDienTich == "" && maxDienTich == "") ? item : (item.BDS_DienTich >= minDienTich && item.BDS_DienTich <= maxDienTich) })

    //  console.log("NewData", newData)    
    navigate('/batdongsan/result', { state: { newData } });

  }
  // console.log("diachi",diachi)
  // console.log("loai",loaiGd);
  // console.log("gia min",minPrice);
  // console.log("dien tich min",minDienTich);


  return (


    <Form className='witdhForm' >


      <InputGroup className="mb-3" >
        <Form.Control type="text" placeholder="search" value={wordEntered}
          onChange={handleFilter} />

      <InputGroup.Text className="searchIcon" id="basic-addon2">
         {
            filteredData.length ===0 ? (
              <i class="fas fa-search"></i>
            )
            : (
              <i onClick={clearInput} class="fas fa-times"></i>
              
            )
          }
          </InputGroup.Text>
        {/* <Button variant="secondary">Search</Button> */}

      </InputGroup>

      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <Link  onClick={clearInput} key={key} className="dataItem" to={`/batdongsan/${value.BDS_Ma}`} >
                <p>{value.BDS_Ten} </p>
              </Link>
            );
          })}
        </div>
      )}

      <Row className="RowFilter">
        <Col  className="positonKhuVuc">
          <Dropdown className='dropdownSearch' >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownSearch'>
              {(diachi == "") ? <span>Trên toàn quốc  </span> : diachi}
              <span> &emsp; <i class="fas fa-angle-down"></i></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdownSearchMenu'>
              <h5>Khu vực</h5>
              <p style={{ color: "gray" }}>{diachi}</p>

              <Form.Group>
                {/* <Form.Label className={styles.label}>Tỉnh, thành phố <span className={styles.ic}>*</span> </Form.Label> */}
                <Form.Select aria-label="Default select example" onChange={(e) => handleTinhthanh(e.target.value)} >
                  <option value="#" disabled selected hidden>chọn tỉnh thành</option>
                  {quanhuyen && quanhuyen !== undefined ?
                    tinhthanh.map((tt, index) => {
                      return (
                        <option key={index} value={tt.TT_Ma + "_" + tt.TT_Ten}>{tt.TT_Ten}</option>
                      )

                    })

                    : "Không tìm thấy"
                  }



                </Form.Select>
              </Form.Group>
              <br />

              {/* Quận huyện */}

              <Form.Group>
                {/* <Form.Label className={styles.label}>Quận, huyện <span className={styles.ic}>*</span> </Form.Label> */}
                <Form.Select aria-label="Default select example" onChange={(e) => handleQuanhuyen(e.target.value)} >
                  <option value="#" disabled selected hidden>chọn quận huyện</option>
                  {quanhuyen && quanhuyen !== undefined ?
                    quanhuyen.map((qh, index) => {
                      return (
                        <option key={index} value={qh.QH_Ma + "_" + qh.QH_Ten}>{qh.QH_Ten}</option>
                      )

                    })

                    : "Không tìm thấy"
                  }

                </Form.Select>
              </Form.Group>
              <br />
              {/* Xã phường */}
              <Form.Group>
                {/* <Form.Label className={styles.label}>Phường, xã <span className={styles.ic}>*</span> </Form.Label> */}
                <Form.Select aria-label="Default select example" name="XaPhuongXPMa" onChange={(e) => handleXaPhuong(e.target.value)}>
                  <option value="#" disabled selected hidden>chọn phường, xã</option>
                  {xaphuong && xaphuong !== undefined ?
                    xaphuong.map((tt, index) => {
                      return (
                        <option key={index} value={tt.XP_Ma + "_" + tt.XP_Ten}>{tt.XP_Ten}</option>
                      )

                    })

                    : "Không tìm thấy"
                  }
                </Form.Select>
              </Form.Group>
              <br />

              <Button variant="danger" onClick={() => handleReSert()}>Đặt lại</Button>


            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col >
          <Form.Select onChange={(e) => handleLoaiGd(e.target.value)}>
            <option>Giao dịch</option>
            <option value="1">Bán</option>
            <option value="2">Thuê</option>

          </Form.Select>
        </Col>
        <Col >
          <Form.Select onChange={(e) => handleLoaiBds(e.target.value)}>
            <option>Loại bất động sản</option>
            {loaibds.map((loai,index) =>(
              <option  key={index} value={loai.L_Ma}>{loai.L_Ten}</option>
            ))
            }
            {/* <option value="1">Bán</option>
            <option value="2">Thuê</option> */}

          </Form.Select>
        </Col>
        <Col >
          <Form.Select aria-label="Default select example" name="price" onChange={(e) => handlePrice(e.target.value)}>
            <option value="0">Giá</option>
            <option value="1">Dưới 20 triệu</option>
            <option value="2">20 - 40 triệu</option>
            <option value="3">40-60 triệu</option>
            <option value="14">60-100 triệu</option>
            <option value="4">100-300 triệu</option>
            <option value="5">300-500 triệu</option>
            <option value="6">500-1 tỷ</option>
            <option value="7">1-3 tỷ</option>
            <option value="8">3-7 tỷ</option>
            <option value="9">7-10 tỷ</option>
            <option value="10">10-30 tỷ</option>
            <option value="11">30-50 tỷ</option>
            <option value="12">50-80 tỷ</option>
            <option value="13">Giá thỏa thuận</option>
            


          </Form.Select>
        </Col>
        <Col>
        
        
          <Form.Select aria-label="Default select example" name="dientich" onChange={(e) => handleDienTich(e.target.value)}>
            <option value="0">Diện tích</option>
            <option value="1">Dưới 30 m2</option>
            <option value="2">30 - 50 m2</option>
            <option value="3">50 - 100 m2</option>
            <option value="4">100 - 200 m2</option>
            <option value="5">200 - 300 m2</option>
            <option value="6">300 - 500 m2</option>

          </Form.Select>
          
          {/* <Button variant="secondary" onClick={() => handleSearch()}>Search</Button> */}
        
         
          
        </Col >
        <Col sm={1}> <span><Button variant="secondary" onClick={() => handleSearch()}>Search</Button></span></Col>

      </Row>

    </Form>


  );

}

export default Search;