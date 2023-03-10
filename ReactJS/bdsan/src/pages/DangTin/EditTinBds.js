import React, { useState, useEffect } from "react";
import { Form, FormControl, InputGroup, Button,Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import axios from 'axios';
import styles from './dangtin.module.css';
import PriceFormat from '~/Services/priceFormat';
import NavLeft from "./navLeft";
function EditTinBds(){
    const [giaodich, setGiaodich] = useState([]);
    const [loaibds, setLoaibds] = useState([]);
    const [tiente, setTiente] = useState([]);
    // const [tinhthanh, setTinhthanh] = useState([]);
    // const [quanhuyen, setQuanhuyen] = useState([]);
    // const [xaphuong, setXaphuong] = useState([]);

    const [quantity, setQuantity] = useState(0);
    const [quantityBr, setQuantityBr] = useState(0);

    const [lienhe, setLienhe] = useState([]);
    const [lienheTT, setLienheTT] = useState([]);


    const navigate = useNavigate();
    const {id} = useParams();

    const initialValues = { BDS_Ten: "", BDS_DienTich: "", BDS_Gia: "", BDS_SoPhongNgu: "",BDS_SoPhongTam: "",BDS_NgayDang: "",BDS_MoTaChiTiet: "",
    BDS_DiaChiCuThe: "",BDS_TrangThai: "",UserId: "",LoaiTienTeLTTMa: "",LoaiGiaoDichLGDMa: "",LoaiBDLMa: "",LienHeLHMa: "",XaPhuongXPMa: "",PL_Ten:""};
    const [formValues, setFormValue] = useState(initialValues);

    const {BDS_Ten,BDS_DienTich,BDS_Gia,BDS_SoPhongNgu,BDS_SoPhongTam,BDS_NgayDang,BDS_MoTaChiTiet,BDS_DiaChiCuThe,BDS_TrangThai,
        UserId,LoaiTienTeLTTMa,LoaiGiaoDichLGDMa,LoaiBDLMa,LienHeLHMa,XaPhuongXPMa,PL_Ten} =formValues;

        const handleChange = (e)=>{
            const { name, value } = e.target;
            setFormValue({ ...formValues, [name]: value });
        }

    useEffect(() => {
        axios.get(`http://localhost:3001/batdongsan/show/${id}`)
        .then(response=>{
            setQuantity(response.data.BDS_SoPhongNgu);
            setQuantityBr(response.data.BDS_SoPhongTam);
            
            setFormValue(response.data);
            
        })

        
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/batdongsan/${id}`,formValues
        
        );
        window.location.href="/batdongsan/user/notapproved";
        navigate("/batdongsan/user/notapproved");  
    }



    

    useEffect(() => {
        axios.get('http://localhost:3001/loaibatdongsan')
            .then((result) => {
                setLoaibds(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/loaitiente')
            .then((result) => {
                setTiente(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/loaigiaodich')
            .then((result) => {
                setGiaodich(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/lienhe')
            .then((result) => {
                setLienhe(result.data);

            })

    }, []);


    
    // }

    const handleIncrement = () => {
        setQuantity(prevCount => prevCount + 1);
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const handleIncrementBr = () => {
        setQuantityBr(prevCount => prevCount + 1);
    }

    const handleDecrementBr = () => {
        if (quantityBr > 1) {
            setQuantityBr(prevCount => prevCount - 1);
        }
    }

    const handleLienhe = (id) => {
        axios.get('http://localhost:3001/lienhe')
            .then((result) => {
                const dt = result.data.filter((a) => a.LH_Ma == id)
                setLienheTT(dt);

            })

    }
    return(
        <div className={styles.products}>
             <Row>
                <Col className="col2" md={3} fixed="left">
                    <NavLeft />
                    
                </Col>
                <Col className="col2" md={9}>



        <Form>
            <div className={styles.content}>
                <div className={styles.form}>
                    <h4>Th??ng tin c?? b???n</h4><br />
                    <div className={styles.GrAddress}>
                        <div className={styles.tinhthanh}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Lo???i giao d???ch <span className={styles.ic}>*</span> </Form.Label>
                                <Form.Select aria-label="Default select example" name="LoaiGiaoDichLGDMa"  onChange={handleChange}>
                                    <option value="#" disabled selected hidden>Ch???n giao d???ch</option>
                                    {
                                        giaodich.map((data, index) => {
                                            return (
                                                <option key={index} value={data.LGD_Ma}>{data.LGD_Ten}</option>
                                            )
                                        })
                                    }

                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className={styles.quanhuyen}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Lo???i b???t ?????ng s???n <span className={styles.ic}>*</span> </Form.Label>
                                <Form.Select aria-label="Default select example" name="LoaiBDLMa" onChange={handleChange}>
                                    <option value="#" disabled selected hidden>VD: Nh?? ri??ng</option>
                                    {
                                        loaibds.map((data, index) => {
                                            return (
                                                <option key={index} value={data.L_Ma}>{data.L_Ten}</option>
                                            )
                                        })
                                    }

                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                   
                    <div className={styles.hr}>
                        <div className={styles.hrText}>?????a ch???</div>
                        <div className={styles.hrBtop}></div>

                    </div>

                    
                        <div className={styles.quanhuyen}>
                            <Form.Group>
                                <Form.Label className={styles.label}>?????a ch??? c??? th??? <span className={styles.ic}>*</span> </Form.Label>
                                <FormControl placeholder="B???n c?? th??? b??? sung h???m, ng??ch, ng??..." name="BDS_DiaChiCuThe"
                                    value={formValues.BDS_DiaChiCuThe} onChange={handleChange} />
                            </Form.Group>
                        </div>

                    {/* </div> */}

                </div>
            </div>

            {/* Th??ng tin b??i vi???t */}
            <div className={styles.padConent}>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h4>Th??ng tin b??i vi???t</h4><br />

                        <Form.Group>
                            <Form.Label className={styles.label}>Ti??u ????? <span className={styles.ic}>*</span> </Form.Label>
                            <FormControl placeholder="VD: B??n nh?? ri??ng 50m2 ch??nh ch??? t???i C???u Gi???y" name="BDS_Ten"
                                value={formValues.BDS_Ten} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles.label}>M?? t???<span className={styles.ic}>*</span> </Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Nh???p m?? t??? chung v??? b???t ?????ng s???n c???a b???n. V?? d???: Khu nh?? c?? v??? tr?? thu???n l???i, g???n c??ng vi??n, g???n tr?????ng h???c..."
                                name="BDS_MoTaChiTiet" value={formValues.BDS_MoTaChiTiet} onChange={handleChange} />
                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* Th??ng tin b???t ?????ng s???n */}
            <div className={styles.padConent}>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h4>Th??ng tin b???t ?????ng s???n</h4><br />
                        <Form.Group>
                            <Form.Label className={styles.label}>Di???n t??ch <span className={styles.ic}>*</span> </Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Nh???p di???n t??ch" name="BDS_DienTich" value={formValues.BDS_DienTich} onChange={handleChange} />
                                <InputGroup.Text>m??</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>


                        <div className={styles.GrAddress}>
                            <div className={styles.boxGia}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>M???c gi?? <span className={styles.ic}>*</span> </Form.Label>
                                    <FormControl placeholder="Nh???p gi??, VD: 120000000" name="BDS_Gia" value={formValues.BDS_Gia} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className={styles.boxTt}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Lo???i giao d???ch <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" name="LoaiTienTeLTTMa" value={formValues.LoaiTienTeLTTMa} onChange={handleChange}>

                                        {
                                            tiente.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.LTT_Ma}>{data.LTT_Ten}</option>
                                                )
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>
                            </div>

                        </div>
                        <p>{PriceFormat(formValues.BDS_Gia)}</p>

                        {/* ph??p l?? */}
                        <Form.Group>
                            <Form.Label className={styles.label}>Gi???y t??? ph??p l?? </Form.Label>
                            <FormControl placeholder="VD: S??? ?????, s??? h???ng,..." name="PL_Ten"
                                value={formValues.PL_Ten} onChange={handleChange} />
                        </Form.Group>

                        <div className={styles.hr}>
                            <div className={styles.hrText}>Th??ng tin chi ti???t</div>
                            <div className={styles.hrBtop}></div>

                        </div>
                        <div className={styles.GrAddress}>
                            <div className={styles.boxchitiet}>
                                S??? ph??ng ng???:
                            </div>
                            <div className={styles.boxQuantity}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <Button variant="secondary " onClick={handleDecrement} >-</Button>
                                        <FormControl className="text-center" name="BDS_SoPhongNgu" value={formValues.BDS_SoPhongNgu = quantity} onChange={handleChange} />
                                        <Button variant="secondary" onClick={handleIncrement}>+</Button>
                                    </InputGroup>
                                </Form.Group>
                            </div>

                        </div>

                        <div className={styles.GrAddress}>
                            <div className={styles.boxchitiet} >
                                S??? phong tam:
                            </div>
                            <div className={styles.boxQuantity}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <Button variant="secondary " onClick={handleDecrementBr}>-</Button>
                                        <FormControl className="text-center" name="BDS_SoPhongTam" value={formValues.BDS_SoPhongTam = quantityBr} onChange={handleChange} />
                                        <Button variant="secondary" onClick={handleIncrementBr}>+</Button>
                                    </InputGroup>
                                </Form.Group>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

            {/* h??nh ???nh b???t ?????ng s???n */}
            <div className={styles.padConent}>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h4>H??nh ???nh</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>H??nh ti??u ?????</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                                <Form.Control aria-describedby="basic-addon1"
                                    name="HinhTieuDe" />
                            </InputGroup>
                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* th??ng tin li??n h??? ch??? s??? h???u b???t ?????ng s???n */}
            <div className={styles.padConent}>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h4>Th??ng tin ch??? s??? h???u</h4>
                        
                        <Form.Group>
                            <Form.Label className={styles.label}>Ch??? s??? h???u ???? h???p t??c </Form.Label>
                            <Form.Select aria-label="Default select example" name="LienHeLHMa"
                                onChange={handleChange}>
                                {/* onChange={(e) => handleLienhe(e.target.value)} */}
                                <option value="#" disabled selected hidden>Nh???ng ch??? s??? h???u ???? h???p t??c</option>
                                {
                                    lienhe.map((data, index) => {
                                        return (
                                            <option key={index} value={data.LH_Ma}>{data.LH_TenChuSoHuu}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>
                        {
                            lienheTT.map((data, index) => {
                                return (
                                    <div key={index} >
                                        <div className={styles.GrAddress}>
                                            <div className={styles.tinhthanh}>

                                                <Form.Group>
                                                    <Form.Label className={styles.label}>T??n ch??? s??? h???u<span className={styles.ic}>*</span> </Form.Label>
                                                    <FormControl placeholder="T??n li??n h???" value={data.LH_TenChuSoHuu} />
                                                </Form.Group>
                                            </div>
                                            <div className={styles.quanhuyen}>
                                                <Form.Group>
                                                    <Form.Label className={styles.label}>S??? ??i???n tho???i<span className={styles.ic}>*</span> </Form.Label>
                                                    <FormControl placeholder="S??? ??i???n tho???i" value={data.LH_SoDienThoai} />
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className={styles.GrAddress}>
                                            <div className={styles.tinhthanh}>

                                                <Form.Group>
                                                    <Form.Label className={styles.label}>Email<span className={styles.ic}>*</span> </Form.Label>
                                                    <FormControl placeholder="T??n li??n h???" value={data.LH_Email} />
                                                </Form.Group>
                                            </div>
                                            <div className={styles.quanhuyen}>
                                                <Form.Group>
                                                    <Form.Label className={styles.label}>?????a ch???<span className={styles.ic}>*</span> </Form.Label>
                                                    <FormControl placeholder="S??? ??i???n tho???i" value={data.LH_DiaChi} />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* submit   */}
                        <br />
                        <Button onClick={handleSubmit} variant="primary" className="w-25 " type="submit">
                            Submit
                        </Button>
                    </div>

                </div>
            </div>
        </Form>




        </Col>
              </Row>
        </div>
        )

}

export default EditTinBds;