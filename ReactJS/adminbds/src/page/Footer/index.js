
import React from "react";
import {Container,Row,Col} from 'react-bootstrap';


function Footer(){
    return(
        <div className="main-footer">
                <Container>
                    <Row>
                        <Col md={3} sm={6}>
                            <h4>LOGO</h4>
                            <ul className="list-unstyled">

                            </ul>
                        </Col>
                        <Col md={3} sm={6}>
                            <h4>Danh mục</h4>
                            <ul className="list-unstyled">
                                <li>Trang chủ</li>
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

                            <a href="#home" type="button" className="btn-fb">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </a>

                            <a href="#home"><i className="fab fa-github fa-2x"></i></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )

}

export default Footer;
