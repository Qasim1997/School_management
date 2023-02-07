// assets
import { IconBrandChrome, IconHelp, IconUser } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconUser };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'user',
    children: [
        {
            id: 'attendance',
            title: 'Attendance',
            type: 'collapse',
            icon: icons.IconBrandChrome,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Attendance',
                    type: 'item',
                    url: '/user/attendance',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Attendance Status',
                    type: 'item',
                    url: '/user/attendance/status',
                    breadcrumbs: false
                },

            ]
        },
        {
            id: 'icons',
            title: 'Result',
            type: 'collapse',
            icon: icons.IconUser,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Result',
                    type: 'item',
                    url: '/dashboard/result',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Result',
                    type: 'item',
                    url: '/dashboard/parant/create',
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default other;
