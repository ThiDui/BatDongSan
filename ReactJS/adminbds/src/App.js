import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button,Dropdown } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import './App.css';
import Sidebar from './page/Sidebar'
import GlobalStyles from './GlobalStyles';

import HomePage from './page/Home';
import ErrorPage from './page/Error';
import ThongBaoQuyenPage from './page/Error/ThongBaoQuyen';
import UserPage from './page/Account/accountAd';
import AccountUsPage from './page/Account/accountUs';
import NewsPage from './page/News';
import LoaiPage from './page/Loai';
import AddTinbdsPage from './page/TinBDS/AddTinBds';
import TinbdsPage from './page/TinBDS/index';
import TinHetHanPage from './page/TinBDS/TinHetHan';
import DetailTinbdsPage from './page/TinBDS/detailTinBds';
import EditTinbdsPage from './page/TinBDS/EditTinBds';
import EditLoaibdsPage from './page/Loai/batdongsan/Editbds';
import EditLoaiTtPage from './page/Loai/tiente/EditTt';
import EditNewsPage from './page/News/EditNews';
import EditLienhePage from './page/Lienhe/EditLienhe';
import LienhePage from './page/Lienhe';
import LoginPage from './page/Login';
import LogoutPage from './page/logout';
import ProfilePage from './page/Profile';
import ThongKePage from './page/thongke/thongke';
import YeuCauLH from './page/YeuCauLH/index';
import AvataPage from './page/Account/account'
import Search from "./page/Search/search"


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
     
    }
  }, []);
  // const user = JSON.parse(localStorage.getItem('user'));
  
  return (

    <GlobalStyles>
     

        {
          
        (!user) ? <LoginPage/>  :
        
        (
        <Container fluid>
          <div className="col2">
          <Sidebar />
          </div>
        <Row>
          {/* <Col className="col2" md={2}>
            <Sidebar />

          </Col> */}

          <Col></Col>
          <Col className="col" md={10}>
            <div className="header">
              <div className="searchAD">
                <Search />
                
              </div>
              <AvataPage />
              {/* <div className='avatarTT'>
              
                <Dropdown align="end">
                <Dropdown.Toggle className="colorToggle"  variant="none"><img src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-chat-ngau-nu.jpg" alt="Avatar" className="avatar" /></Dropdown.Toggle>
                    
                  <Dropdown.Menu>
                  <Dropdown.Item ><span><img src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-chat-ngau-nu.jpg" alt="Avatar" className="avatar" /></span>
                    <span>Ha Sa</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                    <Dropdown.Item ><Link to="/profile" >Trang cá nhân</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to="/logout" >Logout</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}
            </div>
          <div className='contenAD'>
            <Routes>
            
              <Route path="/" element={<HomePage />} />
              <Route path="/accountAd" element={<UserPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/loai" element={<LoaiPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/batdongsan" element={<TinbdsPage />} />
              <Route path="/batdongsanhethan" element={<TinHetHanPage />} />
              <Route path="/yeucaulienhe" element={<YeuCauLH />} />
              <Route path="/thongke" element={<ThongKePage />} />
              <Route path="/quyentruycap" element={<ThongBaoQuyenPage />} />
              <Route path="/account/user" element={<AccountUsPage />} />
              <Route path="/batdongsan/add" element={<AddTinbdsPage />} />
              <Route path="/batdongsan/detail/:id" element={<DetailTinbdsPage />} />
              <Route path="/batdongsan/edit/:id" element={<EditTinbdsPage />} />
              <Route path="/lienhe" element={<LienhePage />} />
              <Route path="/lienhe/edit/:id" element={<EditLienhePage />} />
              <Route path="/loaibatdongsan/edit/:id" element={<EditLoaibdsPage />} />
              <Route path="/loaitiente/edit/:id" element={<EditLoaiTtPage />} />
              <Route path="/news/edit/:id" element={<EditNewsPage />} />
              <Route path="*" element={<ErrorPage />} />

            </Routes>
            </div>
          </Col>
        </Row>
        </Container>)
    }
      

    

    </GlobalStyles>

  );

}

export default App;
