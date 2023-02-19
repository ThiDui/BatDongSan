import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BeenhereIcon from '@mui/icons-material/Beenhere';

export const SidebarData = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:"/"
    },
    {
        title:"Manage Accounts",
        icon:<ManageAccountsIcon />,
        link:"/user"
    },
    {
        title:"Bất động sản",
        icon:<HomeIcon />,
        link:"/batdongsan"
    },
    {
        title:"Tin Tuc",
        icon:<BeenhereIcon />,
        link:"/news"
    },
    {
        title:"Đơn vị liên kết",
        icon:<BeenhereIcon />,
        link:"/lienhe"
    },
    {
        title:"Yêu Cầu Liên Hệ",
        icon:<BeenhereIcon />,
        link:"/yeucaulienhe"
    },
    {
        title:"Loại bất đs",
        icon:<HomeIcon />,
        link:"/loai"
    }
]