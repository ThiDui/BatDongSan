import React from "react";
import LoaiBatDonggSan from "./batdongsan/loaiBds";
import LoaiGiaoDich from "./giaodich/loaiGd";
import LoaiTienTe from "./tiente/loaiTt";

import {Row,Col} from 'react-bootstrap';

function Loai(){
    return(
        <div>
        <LoaiBatDonggSan />
        <Row className="w-100">
            <Col md={6}><LoaiGiaoDich /></Col>
            <Col md={6}><LoaiTienTe /></Col>
        </Row>
        
        
        </div>

        )

}

export default Loai;