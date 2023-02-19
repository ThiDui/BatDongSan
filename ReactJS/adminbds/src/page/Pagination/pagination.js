import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationCode = ({ postsPerPage, totalPosts, paginate,currentPage,handleNext,handlePre }) => {
  const pageNumbers = [];

  // tong trang bang tong so luong bai chia cho bai/1trang
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
        <Pagination>
        <Pagination.Prev onClick={handlePre}/>
        {pageNumbers.map(number => (
        
            <Pagination.Item key={number} onClick={() => paginate(number)} active={currentPage==number} >
            {number}
            </Pagination.Item>
            
        ))}
        <Pagination.Next onClick={handleNext}/>
        </Pagination>
    </nav>
  );
};

export default PaginationCode;