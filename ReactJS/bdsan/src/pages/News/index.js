import {Row,Col,ListGroup, Card} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

import styles from './news.module.css';
function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/news')
            .then(res => res.json())
            .then(news => {
                setNews(news);
            })

    }, [])

    return (
        <div className='container'>
        < div className={styles.products}>

            <div className={styles.contenteee}>
                <Row>
                    <Col className={styles.row1} md={9}>

                   

                        <h1>Tin tức thị trường</h1>
                        <div className={styles.bdscontent}>
                        {
                            news.slice(0, 2).map(a => (
                                
                                    <div className={styles.boxFlex1} key={a.TinMa}>
                                    <Card className={styles.bdsbox}>
                                        <Card.Img variant="top" src={a.HinhTieuDe} alt={a.TieuDe} />
                                        <Card.Body>
                                            <Card.Title><a href = {a.Tin_DuongDan} style={{color:"black"}}>{a.TieuDe}</a></Card.Title>
                                            <Card.Text className={styles.mota}>{a.Mota}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    </div>
                                   
                           

                            ))
                        }
                    </div>

                    <div className={styles.bdscontent}>
            {
            
           
            news.map(a => (
                        <div className={styles.boxFlex} key={a.TinMa}  >
                            
                            <Card className={styles.bdsbox} >
                                {/* <div  className={styles.bdsimg}> */}
                                <Card.Img  variant="top" src={a.HinhTieuDe} alt={a.TieuDe} />
                                
                                {/* </div> */}
                                <Card.Body>
                                    <Card.Title><a href = {a.Tin_DuongDan} style={{color:"black"}}>{a.TieuDe}</a></Card.Title>
                                    <Card.Text className={styles.mota}>
                                    {a.Mota}
                                    </Card.Text>
                                    
                                </Card.Body>
                                
                            </Card>
                            
                            
                        

                        </div>
                    ))
           
                    
            }
            </div>
                    </Col>
                    <Col md={3} className={styles.boxMenuR}>
                        <div className={styles.boxright}>
                    <ListGroup variant="flush" >
                        <ListGroup.Item  className={styles.listItem}><a style={{color:"black"}} href="http://localhost:3000/batdongsan/dangtin">Đăng tin</a></ListGroup.Item>
                        <ListGroup.Item  className={styles.listItem}><a style={{color:"black"}} href="/batdongsan/user/notapproved">Tin chờ duyệt</a></ListGroup.Item>
                        <ListGroup.Item  className={styles.listItem} ><a style={{color:"black"}} href="/batdongsan/user">Tin đã đăng</a></ListGroup.Item>
                    </ListGroup>
                    <br />
                    <h4 className={styles.titlemenuR}>Tin nổi bật</h4>
                  
                    <div>
                    <ListGroup variant="flush" >
                     {
                            news.slice(0, 7).map(a => (
                                
                                    <div key={a.TinMa}>
                                        
                                           
                                            <ListGroup.Item   className={styles.listItem} ><a href = {a.Tin_DuongDan} style={{color:"black"}}>{a.TieuDe}</a></ListGroup.Item>
                                       
                                    
                                    </div>
                                   
                            ))
                        }
                    </ListGroup> 
                    </div>

                </div>
                    </Col>

                </Row>

            </div>

        </div>

        </div>

    );

}

export default News;