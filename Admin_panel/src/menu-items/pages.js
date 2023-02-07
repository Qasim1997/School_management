// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Authentication',
    type: 'admin',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/user/register',
                    target: false
                },
                {
                    id: 'register3',
                    title: 'Registered Users',
                    type: 'item',
                    url: '/dashboard/user',
                    target: false
                }
            ]
        }
    ]
};

export default pages;
