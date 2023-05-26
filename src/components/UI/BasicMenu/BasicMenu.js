import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {useNavigate} from "react-router";
import {useState} from "react";

export default function BasicMenu({nawLinks}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (to) => {
    navigate(to)
    handleClose()
  }

  return (
    <div>
      <MenuOpenIcon
        htmlColor={'white'}
        fontSize={'large'}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </MenuOpenIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          nawLinks.map((link, idx) => {
            return <MenuItem key={idx} onClick={() => navigateTo(link.to)}>{link.title}</MenuItem>
          })
        }

      </Menu>
    </div>
  );
}
