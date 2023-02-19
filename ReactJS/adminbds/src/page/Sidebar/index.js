
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '~/App.css'

import Collapse from 'react-bootstrap/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openTin, setOpenTin] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='boxBarLeft'>
      <div className="logo">
        <h2>ADMIN</h2>
      </div>
      <ul className="SidebarList">
        <Link to="/" className="linkSB" >
          <li className="SidebarRow">
            <div id="icon"><HomeIcon /></div>
            <div id="title">Home</div>
          </li>
        </Link>

        {/* <Link to="/user" className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><ManageAccountsIcon /></div>
            <div id="title">Quản lý tài khoản</div>
          </li>
        </Link> */}
        <li>
          <div className="SidebarRow" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
            <div id="icon"><ManageAccountsIcon /></div>
            <div id="title">Quản lý tài khoản</div>
            <div className="icondown"><KeyboardArrowDownIcon /></div>
          </div>
          <div className="collapseDown">
            <Collapse in={open}>
              <div>
                <div><Link to=
                { (user.roles[0] != "ROLE_ADMIN") ? "/quyentruycap" : "/accountAd"}
                 className="linkSB linkDown">Tài khoản nhân viên</Link></div>
                <div><Link to=
                { (user.roles[0] != "ROLE_ADMIN") ? "/quyentruycap" : "/account/user"}
                 className="linkSB linkDown">Tài khoản khách hàng</Link></div>
              </div>
              

            </Collapse>
          </div>

        </li>
        {/* <Link to="/batdongsan" className="linkSB"> */}
        <li>
          <div className="SidebarRow" onClick={() => setOpenTin(!openTin)} aria-controls="example-collapse-text" aria-expanded={openTin}>
            <div id="icon"><DomainAddIcon /></div>
            <div id="title">Bất động sản</div>
            <div className="icondown"><KeyboardArrowDownIcon /></div>
          </div>
          <div className="collapseDown">
            <Collapse in={openTin}>
              <div>
                <div><Link to="/batdongsan" className="linkSB linkDown">Bất động sản</Link></div>
                <div><Link to="/batdongsanhethan" className="linkSB linkDown">Bất động sản hết hạn</Link></div>
              </div>
              

            </Collapse>
          </div>

        </li>
        {/* </Link> */}


        <Link to="/news" className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><BeenhereIcon /></div>
            <div id="title">Tin Tuc</div>
          </li>
        </Link>

        <Link to="/lienhe" className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><RecentActorsIcon /></div>
            <div id="title">Đơn vị liên kết</div>
          </li>
        </Link>

        <Link to="/yeucaulienhe" className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><BeenhereIcon /></div>
            <div id="title">Yêu Cầu Liên Hệ</div>
          </li>
        </Link>

        <Link to={ 
          (user.roles[0] != "ROLE_ADMIN") ? "/quyentruycap" : "/thongke"
        
      } className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><ShowChartIcon /></div>
            <div id="title">Thống kê</div>
          </li>
        </Link>
        <Link to="/loai" className="linkSB">
          <li className="SidebarRow">
            <div id="icon"><BeenhereIcon /></div>
            <div id="title">Loại</div>
          </li>
        </Link>


      </ul>
    </div>

  );

}

export default Sidebar;

 // id={value.link ? "active":""}