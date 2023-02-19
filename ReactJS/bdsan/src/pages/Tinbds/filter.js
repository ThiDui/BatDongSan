import React, { useState, useEffect } from 'react';
import { Collapse, Form ,Button} from 'react-bootstrap';
import styles from './Tinbds.module.css';

function Filter({ handlePrice, handleDienTich ,tinhthanh, quanhuyen, xaphuong,handleTinhthanh, handleQuanhuyen, handleXaPhuong,handleReSert,AdressFilter}) {
    const [open, setOpen] = useState(false);    
    return (

        <div>
            <Form.Group>
                <Form.Label className={styles.label}>Lọc theo giá </Form.Label>
                <Form.Select aria-label="Default select example" name="price" onChange={(e) => handlePrice(e.target.value)} >
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

            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label className={styles.label}>Lọc theo diện tích </Form.Label>
                <Form.Select aria-label="Default select example" name="dientich" onChange={(e) => handleDienTich(e.target.value)}>
                    <option value="0">Chọn giá trị</option>
                    <option value="1">Dưới 30 m2</option>
                    <option value="2">30 - 50 m2</option>
                    <option value="3">50 - 100 m2</option>
                    <option value="4">100 - 200 m2</option>
                    <option value="5">200 - 300 m2</option>
                    <option value="6">300 - 500 m2</option>

                </Form.Select>
            </Form.Group>
            <br/>
            <div >
                <div onClick={() => setOpen(!open)} className={styles.FilterTitle}> Lọc theo địa chỉ</div>
                
            {/* tỉnh thành */}
            <Collapse in={open}>
            <div className={styles.AddressFilter}>
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
            <br/>
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
            <br/>
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
                    <br/>
            <Button variant="danger" onClick={()=> handleReSert()}>Đặt lại</Button>
            &emsp;  
            <Button variant="danger" onClick={()=> AdressFilter()}>Lọc địa chỉ</Button>
            </div>
            </Collapse>
            
            </div>
        </div>
    );

}

export default Filter;