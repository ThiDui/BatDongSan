import {  Carousel } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import Axios from 'axios';
import './home.css';
import Search from "../Search/search";
import FindAddress from '../Tinbds/LocBdsDiaChi';
import LimitBan from '../Tinbds/limitBan';
import LimitThue from '../Tinbds/limitThue';
function Home() {


  const [tinbds, setTinbds] = useState([]);



useEffect(() => {

  Axios.get("http://localhost:3001/batdongsan")

      .then((response) => {

          setTinbds(response.data);
          
      })

}, [])




const address =["Hà Nội","Đà Nẵng","Cần Thơ","Hà Tiên","Hồ Chí Minh"];

  return (
    <div className="borderIndex">
      <div className="transparent">
        <Carousel className="imgCarousel ">
          <Carousel.Item>
            <img
              className="d-block w-100 imgCr"
              src="https://i.pinimg.com/originals/bb/7a/00/bb7a00b1cdccd419d6bad81cc2707669.jpg"
              alt="First slide" />
            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCr"
              src="https://wallpaperaccess.com/full/3060243.jpg"
              alt="Second slide" />

            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCr"
              src="https://www.whoa.in/download/amazing-modern-house-designs-hd-wallpaper"
              alt="Third slide" />
           
          </Carousel.Item>
        </Carousel>

      {/* tìm kiếm */}
        
        <div className="formsize">
          <Search data={tinbds}/>
          {/* tinhthanh={tinhthanh} quanhuyen={quanhuyen} xaphuong={xaphuong}
          handleTinhthanh={handleTinhthanh} handleQuanhuyen={handleQuanhuyen}
          handleXaPhuong={handleXaPhuong} diachi={diachi} handleReSert={handleReSert} */}
        </div>
      </div>

    <div><LimitBan data={tinbds} /></div>
    <div><LimitThue data={tinbds} /></div>

      <div className="diadiem">
        <div className="container paddingDD ">
          <h2 className="titleDD"><i className="fas fa-map-marker-alt fa-lg map"></i>Các dự án đã triển khai tại một số thành phố</h2>
          <div className="row rowDD">
            <div className="col-lg-9">
              <div className='row rowDD'>
                <div className="col-lg-5  col-md-5  col5DD">
                  <div className="containerDD">
                    <Link className="linkDD" to ={`/batdongsan/find/${address[0]}`}>
                      <img className="imgDD" src="https://www.aseantraveller.net/source/img_news/4553.jpg" alt="hanoi" />
                      <div className="contentDD">
                        <h4>HÀ NỘI</h4>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col7DD">
                  <div className="containerDD">
                  <Link className="linkDD" to ={`/batdongsan/find/${address[1]}`}>
                    <img className="imgDD" src="https://anduc.edu.vn/hinh-anh-dep-ve-da-nang/imager_4744.jpg" alt="danang" />
                    <div className="contentDD">
                      <h4>ĐÀ NẴNG</h4>
                    </div>
                    </Link>
                  </div>
                 
                </div>

              </div>

              <div className='row rowDD'>
                <div className="col-lg-7  col-md-7 col7DD">
                  <div className="containerDD">
                  <Link className="linkDD" to ={`/batdongsan/find/${address[2]}`}>
                    <img className="imgDD" src="http://nhatkyhanhtrinh.com/wp-content/uploads/2016/04/cau-can-tho.jpg" alt="cantho" />
                    <div className="contentDD">
                      <h4>CẦN THƠ</h4>
                    </div>
                   </Link> 
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 ">
                  <div className="containerDD">
                  <Link className="linkDD" to ={`/batdongsan/find/${address[3]}`}>
                    <img className="imgDD" src="https://baogialai.com.vn/dataimages/201811/original/images2715212_1hatien.jpeg" alt="hatien" />
                    <div className="contentDD">
                      <h4>HÀ TIÊN</h4>
                    </div>
                   </Link> 
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-3">
              <div className="containerDD">
              <Link className="linkDD" to ={`/batdongsan/find/${address[4]}`}>
                <img className="imgDDcol3" src="https://upanh123.com/wp-content/uploads/2021/01/anh-thanh-pho-ve-dem0.jpg" alt="tphcm" />
                <div className="contentDD">
                  <h4>THÀNH PHỐ HỒ CHÍ MINH</h4>
                </div>
               </Link> 
              </div>
            </div>
          </div>

        </div>

      </div>
      <div className="container">
        <div className="gioithieu">
          <div className="row ">
            <div className="col-sm col-left">
              <h2 className="titlleGT"><span>Sứ mệnh của chúng tôi là giúp mọi người <br></br>
                <span className="cl">tìm & tạo nên một không gian sống tốt hơn!</span>
              </span></h2>
              <div className="contentGT">
                <p>Thành lập Công ty TNHH Dịch vụ và Xây dựng batdongsan.vn với vốn điều lệ ban đầu là 0,8 tỷ đồng và 10 nhân viên. Khi mới hoạt động,
                  batdongsan.vn chuyên về môi giới các dự án bất động sản. Hiện tại, đã tăng vốn điều lệ lên 3.500 tỷ đồng với trên 3500 nhân viên</p>
                <p>Tầm nhìn đến 2025: "Trở thành 1 trong 10 Tập đoàn kinh tế tư nhân lớn nhất Việt Nam"

                  Tầm nhìn đến 2030: "Trở thành 1 trong 10 công ty phát triển Bất động sản tốt nhất Đông Nam Á"</p>

              </div>
            </div>

            <div className="col-sm ">
              {/* <img src="https://i.pinimg.com/originals/bb/7a/00/bb7a00b1cdccd419d6bad81cc2707669.jpg" alt="Los Angeles" style={{height: '350px'}}/> */}
              <div className="itemGT item1">
                <i className="fas fa-city fasGT fa-3x"></i>
                <p className="itemTittle">Tìm kiếm thông tin dễ dàng</p>
                <span>Không ngừng phát triển mạnh mẽ các hoạt động đầu tư xây dựng để nhanh chóng trở thành một trong những
                  tập đoàn phát triển bất động sản hàng đầu</span>
              </div>

              <div className="itemGT item2">
                <i className="fas fa-business-time fasGT fa-3x"></i>
                <p className="itemTittle">Tiết kiệm thời gian và chi phí</p>
                <span>Tất cả các giải pháp mà batdongsan.vn cung cấp đều được phân tích một cách chuyên sâu, hướng đến phục vụ và giải quyết những vướng mắc
                  một cách nhanh chóng nhu cầu của khách hàng.</span>
              </div>

              <div className="itemGT item3 ">
                <i className="fas fa-gift fasGT fa-3x"></i>
                <p className="itemTittle">Đảm bảo quyền lợi khách hàng</p>
                <span>Trải qua chặng đường 17 năm phát triển, batdongsan.vn đã trở thành một trong những chủ đầu tư mang
                  lại dấu ấn với sản phẩm đa dạng đáp ứng nhu cầu của thị trường</span>
              </div>
              <div className="itemGT item4">
                <i className="fas fa-layer-group fasGT fa-3x"></i>
                <p className="itemTittle">Kết nối với các nhà đầu tư</p>
                <span>Là thương hiệu hàng đầu trên thị trường batdongsan.vn luôn được các đối tác đánh giá cao về năng lực và uy tín kinh doanh.
                  Đã trở thành đối tác tin cậy của hàng loạt công ty.</span>
              </div>

            </div>

          </div>
          {/* <div className="row ">
            <div className="col-sm-5 boxCamket"><h3>Cam kết từ chúng tôi</h3>
              <p>Chúng tôi từ TBlue Shop cam kết cung cấp các loại cây cảnh được chăm sóc cẩn thận.<br />
                Chúng tôi ưu tiên chất lượng sản phẩm, sẽ được hoàn trả nếu gặp bất kì sai sót nào!</p>
            </div>

            <div className="col-sm "><h3>TBlue Shop từ năm 2010</h3>
              <p>  TBlue Shop luôn tập trung vào một điều: Sự hài lòng của khách hàng.<br />
                Chúng tôi cung cáp sự hài lòng đó thông qua các dịch vụ chăm sóc, thông qua sự tỉ mỉ trên từng sản phẩm</p>
            </div>
            <div className="col-sm "><h3>Châm ngôn</h3>
              <h5 > Hãy ngắm nhìn thiên nhiên bạn sẽ thấy hình ảnh tâm hồn chính mình!</h5>
            </div>
          </div> */}
        </div>
      </div>

      <div className="c"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.795710081171!2d105.76783941487895!3d10.033710092828038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881792eeb09b%3A0x44438ff5102c4bd6!2zS8O9IHTDumMgeMOhIEtodSBB!5e0!3m2!1svi!2s!4v1668180480402!5m2!1svi!2s"
       width="100%" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
   <br />
    </div>
  );

}

export default Home;