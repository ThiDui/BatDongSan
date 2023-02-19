import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './App.css';
import GlobalStyles from './GlobalStyles';
import HomePage from './pages/Home';
import ContactPage from './pages/Contact';
import NewsPage from './pages/News';
import TinbdsPage from './pages/Tinbds';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TinbdsChiTiet from './pages/TinbdsChiTiet';
import DangTin from './pages/DangTin';
import Logout from './pages/logout';
import TinUser from './pages/DangTin/tinUser';
import FindAddress from './pages/Tinbds/LocBdsDiaChi';
import TinChuaDuyet from './pages/DangTin/TinChuaDuyet';
import YeuCauLhUser from './pages/YeuCauLH/index';
import Account from './pages/Account/account';
import Profile from './pages/Account/profile';
import ResultFilter from './pages/resultFilter/resultData'
import TinHetHan from './pages/DangTin/TinHetHan';
import EditTinBds from './pages/DangTin/EditTinBds';
import Logo from './logo4.png';

import { Container, Nav, Navbar, Row, Col, Button ,Dropdown,NavDropdown} from 'react-bootstrap'


function App() {
    const navigate = useNavigate();
    const [loaibds, setLoaibds] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));



//loai bat dong san
        useEffect(() => {
            loadloai();
            
        }, []);

        const loadloai = async () => {
            const result = await axios.get('http://localhost:3001/loaibatdongsan');
            setLoaibds(result.data);
            
            
        }

   
    const handleClick = ()=>{
        if(user === null){
            alert("Bạn phải đăng nhập để sử dụng tính năng này!")
        }
        else{
            navigate("/batdongsan/dangtin"); 
          
        }

         
    }
    

    
    return (
        <GlobalStyles>
            <div>
            <Navbar fixed="top" collapseOnSelect expand="xl" bg="dark" variant="dark" className="navbarheader" >
                {/* <Container> */}
                     <Navbar.Brand style={{display:"flex"}} href="/">
                         &emsp;   &emsp;
                         <span><img src={Logo} className="loGoImg" alt="logo"/></span>
                        <span className='nameLogo'>MUABAN <br/>NHADAT</span> 
                     </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto navtext ">&emsp;
                            <Nav.Link as={Link} to="/" className="navtext-cl">TRANG CHỦ</Nav.Link>
                            
                            {/* <Nav className="navtext-cl"> */}
                            <NavDropdown  className="titleMenuBBar" title="NHÀ ĐẤT BÁN" id="collasible-nav-dropdown">
                            {
                                    loaibds.map((loai,index) =>(
                                        
                                        <NavDropdown.Item style={{color:"black"}} href={`/batdongsan/${1}/${loai.L_Ma}`} key={index}>Bán {loai.L_Ten}</NavDropdown.Item>          
                                        
                                    ))
                                }
                                
                                
                            </NavDropdown>
            
                            
                            <NavDropdown  className="titleMenuBBar" title="NHÀ ĐẤT THUÊ" id="collasible-nav-dropdown">
                            {
                                    loaibds.map((loai,index) =>(
                                        
                                        <NavDropdown.Item style={{color:"black"}} href={`/batdongsan/${2}/${loai.L_Ma}`}  key={index}>Cho thuê {loai.L_Ten}</NavDropdown.Item>          
                                        
                                    ))
                                }
                                
                                
                            </NavDropdown>
            
                                
                            {/* </Nav> */}
                            <Nav.Link as={Link} to="/news" className="navtext-cl">TIN TỨC</Nav.Link>
                            {/* <Nav.Link as={Link} to="/contact" className="navtext-cl">Liên hệ</Nav.Link> */}
                            
                        </Nav>
                        <Nav >
                                
                                <Button onClick={handleClick} variant="light" className="btn-dtin">
                                    Đăng tin
                                </Button>
                            </Nav>
                            &emsp;   &emsp;
                <Nav className="navtext">
                            {
                               (user!=null) ? 
                               <Account />
                               :
                            (
                                <>
                            <Nav>
                                <LoginPage />

                            </Nav>

                            <Nav>
                                <SignupPage />
                            </Nav>
                            </>
                            )
                            }
                            &emsp;  
                            
                            
                            
                        </Nav>
                        
                        
                    </Navbar.Collapse>
                
            </Navbar>
            </div>
            <div className='contenApp'>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/news" element={< NewsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/batdongsan/dangtin" element={<DangTin />} />
                <Route path="/batdongsan/result" element={<ResultFilter />} />
                <Route path="/batdongsan/user" element={<TinUser />} />
                <Route path="/yeucaulienhe/user" element={<YeuCauLhUser />} />
                <Route path="/batdongsan/user/notapproved" element={<TinChuaDuyet />} />
                <Route path="/batdongsan/user/hethan" element={<TinHetHan />} />
                <Route path="/batdongsan/edit/:id" element={<EditTinBds />} />
                <Route path="/batdongsan/find/:id" element={<FindAddress />} />
                <Route path="/batdongsan/:idgd/:idbds" element={<TinbdsPage />} />
                <Route path="/batdongsan/:id" element={<TinbdsChiTiet />}>
                ResultFilter
                </Route>
            </Routes>

            </div>
            
            <div className="main-footer">
                <Container>
                    <Row>
                        <Col md={3} sm={6}>
                        <img src={Logo} className="loGoImg" alt="logo"/>
                            <h4>MUABANNHADAT</h4>
                            <ul className="list-unstyled">

                            </ul>
                        </Col>
                        <Col md={3} sm={6}>
                            <h4>Danh mục</h4>
                            <ul className="list-unstyled">
                                <li>TRANG CHỦ</li>
                                <li>Nhà đất bán</li>
                                <li>Nhà đất thuê</li>
                                <li>Tin tức</li>
                            </ul>
                        </Col>
                        <Col md={3} sm={6}>
                            <h4>Liên hệ</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <p>
                                        <i className="fas fa-home mr-3"></i> XK-Ninh Kiều, Cần Thơ</p>
                                </li>
                                <li>
                                    <p>
                                        <i className="fas fa-envelope mr-3"></i> duithi1234@gmail.com</p>
                                </li>
                                <li>
                                    <p>
                                        <i className="fas fa-phone mr-3"></i> +01 234 567 88</p>
                                </li>
                                <li>
                                    <p>
                                        <i className="fas fa-print mr-3"></i> +01 234 567 89</p>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} sm={6}>
                            <h4>Follow us</h4>

                            <div  type="button" className="btn-fb">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </div>

                            <div ><i className="fab fa-github fa-2x"></i></div>
                        </Col>
                    </Row>
                </Container>
            </div>



        </GlobalStyles>
    );
}

export default App;
