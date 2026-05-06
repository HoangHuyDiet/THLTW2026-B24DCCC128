import component from "@/locales/en-US/component";
import { Redirect } from "react-router";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/products-management',
		name: 'Quản lý sản phẩm',
		icon: 'shopping',
		component: './ProductManagement',
	}, 
	{
		path: '/TH01',
  		name: 'Thực hành 01',
 		icon: 'project',
  		component: './TH01',
	},
	{
		path: '/TH02',
		name: 'Thực hành 02',
		icon: 'project',
		component: './TH02',
	},
	{
		path: '/TH03',
		name: 'Thực hành 03',
		icon: 'project',
		component: './TH03',
	},
	{
		path: 'TH04',
		name: 'Thực hành 04',
		icon: 'project',
		component: './TH04'
	}, 
	{
		path: 'TH05',
		name: 'Thực hành 05',
		icon: 'project',
		component: './TH05'
	},
	{
		path: 'TH06',
		name: 'Thực hành 06',
		icon: 'project',
		component: './TH06'
	},
	{
		path: 'KTGK',
		name: 'Kiểm tra giữa kì',
		icon: 'project',
		component: './KTGK'
	},
	{
		path: 'TH07',
		name: 'Thực hành 07',
		icon: 'project',
		component: './TH07'
	},
	{
		path: 'TH08',
		name: 'Thực hành 08',
		icon: 'project',
		component: './TH08'
	},
	{
		path: 'TH09',
		name: 'Thực hành 09',
		icon: 'project',
		component: './TH09'
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];	
