import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '~/page/Pagination/pagination';


import { Form, FormControl } from 'react-bootstrap';
import HandellAddNews from './Addnews';
import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import styles from './news.module.css';
import authHeader from '~/Services/authHeader';

function News() {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [newsPerPage] = useState(3); //so bai viet tren trang
    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        
        loadNews();
    }, []);


    const loadNews = async () => {
        try{
        setLoading(true);
        const result = await axios.get('http://localhost:3001/news',{ headers: authHeader() });
        
        setNews(result.data);
        setLoading(false);
        }
        catch (err) {
            console.log(err);
            
          }
        
    };
    // Get current posts
  const indexOfLastPost = currentPage * newsPerPage;
  const indexOfFirstPost = indexOfLastPost - newsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    //handleNext
    const handleNext=()=>{
        
        setCurrentPage(currentPage+1)
    }
    //handlePre
    const handlePre=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
        
    }

    const deleteNews=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa bài đăng này!";

        if(user.roles[0] != "ROLE_ADMIN"){
            alert("Bạn không có đủ quyền thực hiện chức năng này!")
        }
         else
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/news/${id}`)
             loadNews();
        } 
       
      }

    // const deleteNews= async (id)=>{
    //     await axios.delete(`http://localhost:3001/news/${id}`)
    //     loadNews();
    // }

    return (
        
            <div className={styles.boxNews}>
            <div className={styles.contentNews}>
                <h2>DANH SÁCH TIN TỨC</h2>
                <div className={styles.btnAdd}>
                    <div className={styles.btnSearch} >
                        <Form.Group>
                            <FormControl className="w-50" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div>
                    <HandellAddNews />
                    </div>
                </div>
                
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Tiêu Đề</th>
                            <th>Hình Tiêu Đề</th>
                            <th>Mô Tả</th>
                            <th>Đường Dẫn</th>
                            <th colSpan={2}>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!loading) ?
                            currentPosts.filter((item)=>{
                                return search.toLowerCase()===''? item : item.TieuDe.toLowerCase().includes(search)
                            }).map((news,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{news.TieuDe}</td>
                                    <td>
                                        <img style={{width:"100px", height:"60px"}} src={news.HinhTieuDe} alt="hình tiêu đề"/>
                                    </td>
                                    <td>{news.Mota}</td>
                                    <td>{news.Tin_DuongDan}</td>
                                    
                                    <td><Link className="btn" to ={`/news/edit/${news.TinMa}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} /></Link></td>
                                    <td>
                                        <Link className="btn" onClick={()=>{deleteNews(news.TinMa)}}><DeleteForeverIcon style={{ color: "red" }}/></Link>
                                    </td>
                                </tr>
                            ))
                            : "Loading..."
                        }
                    </tbody>
                </Table>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination 
                postsPerPage={newsPerPage}
                totalPosts={news.length}
                paginate={paginate} 
                currentPage={currentPage}
                handlePre={handlePre}
                handleNext={handleNext}/>
                </div>
            </div>
            </div>
        

    )

}

export default News;