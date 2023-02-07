// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import usermenuitem from 'user-menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const type = sessionStorage.getItem('user_type');
    if (type == 'admin') {
        return menuItem.items.map((item) => {
            switch (item.type) {
                case 'admin':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });
    } else {
        return usermenuitem.items.map((item) => {
            switch (item.type) {
                case 'user':
                    return <NavGroup key={item.id} item={item} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });
    }

    const x = 30;

    // return <>

    // {/* {(() => {
    //     if (x == 30) {
    //       return {navItems};
    //     } else {
    //       return  {navItems};
    //     }
    //   })()} */}
    //   {navItems}
    // </>;
};

export default MenuList;
