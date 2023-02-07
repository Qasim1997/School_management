// assets
import {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconSchool,
    IconBook,
    IconFriends,
    IconUser,
    IconCalendarEvent,
    IconNotebook,
    IconChargingPile
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconSchool,
    IconBook,
    IconFriends,
    IconUser,
    IconCalendarEvent,
    IconNotebook,
    IconChargingPile
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Pages',
    type: 'admin',
    children: [
        {
            id: 'documentation',
            title: 'Calender',
            type: 'item',
            url: '/dashboard/calender',
            icon: icons.IconCalendarEvent,
            external: false,
            target: false
        },
        {
            id: 'icons',
            title: 'Teacher',
            type: 'collapse',
            icon: icons.IconSchool,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Teacher',
                    type: 'item',
                    url: '/dashboard/teacher',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Teacher',
                    type: 'item',
                    url: '/dashboard/teacher/create',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Class',
            type: 'collapse',
            icon: icons.IconSchool,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Class',
                    type: 'item',
                    url: '/dashboard/class',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Class',
                    type: 'item',
                    url: '/dashboard/class/create',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Book',
            type: 'collapse',
            icon: icons.IconBook,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Book',
                    type: 'item',
                    url: '/dashboard/book',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Book',
                    type: 'item',
                    url: '/dashboard/book/create',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Library',
            type: 'collapse',
            icon: icons.IconNotebook,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Library',
                    type: 'item',
                    url: '/dashboard/library',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Library',
                    type: 'item',
                    url: '/dashboard/add/book',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Students',
            type: 'collapse',
            icon: icons.IconFriends,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Students',
                    type: 'item',
                    url: '/dashboard/student',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Student',
                    type: 'item',
                    url: '/dashboard/student/create',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Parants',
            type: 'collapse',
            icon: icons.IconUser,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Parants',
                    type: 'item',
                    url: '/dashboard/parant',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Parants',
                    type: 'item',
                    url: '/dashboard/parant/create',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Fee',
            type: 'collapse',
            icon: icons.IconChargingPile,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Fee',
                    type: 'item',
                    url: '/dashboard/fee',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Add Fee',
                    type: 'item',
                    url: '/dashboard/fee/create',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
