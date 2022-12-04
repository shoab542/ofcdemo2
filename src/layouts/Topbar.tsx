import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
// actions
import { showRightSidebar, changeSidebarType, getUserRole, getCurrency } from '../redux/actions';

// store
import { RootState, AppDispatch } from '../redux/store';

//constants
import { LayoutTypes, SideBarTypes } from '../constants/layout';

// components
// import TopbarSearch from '../components/TopbarSearch';
import MaximizeScreen from '../components/MaximizeScreen';
// import SearchDropdown from '../components/SearchDropdown';
import ProfileDropdown from '../components/ProfileDropdown';
import CCL_Logo from '../assets/images/Qorum.svg';
import NoImage from '../assets/images/no_image.jpg';



export interface NotificationItem {
    id: number;
    text: string;
    subText: string;
    icon?: string;
    avatar?: string;
    bgColor?: string;
}

// get the notifications
const Notifications: NotificationItem[] = [
    {
        id: 1,
        text: 'New user registered.',
        subText: '5 hours ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'warning',
    },
    {
        id: 2,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'secondary',
    },
];


// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'fe-user',
        redirectTo: '/app/my-profile',
    },
    {
        label: 'Change Password',
        icon: 'fe-lock',
        redirectTo: '/app/change_password',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/login',
    },
];

// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '#',
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '#',
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '#',
    },
];

  

interface TopbarProps {
    hideLogo?: boolean;
    navCssClasses?: string;
    openLeftMenuCallBack?: () => void;
    topbarDark?: boolean;
}

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isopen, setIsopen] = useState<boolean>(false);
    const navbarCssClasses: string = navCssClasses || '';
    const containerCssClasses: string = !hideLogo ? 'container-fluid' : '';

    const { layoutType, leftSideBarType, user } = useSelector((state: RootState) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
        user: state.Auth.user,
    }));

    
    

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen(!isopen);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    /**
     * Toggles the left sidebar width
     */
    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === 'default' || leftSideBarType === 'compact')
            dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
        if (leftSideBarType === 'condensed') dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    };

   

            
    useEffect(()=>{
        dispatch(getUserRole());
        dispatch(getCurrency());
    },[])
   
    return (
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <div className="logo-box">
                            <Link to="/" className="logo logo-dark text-center">
                                <span className="logo-sm">
                                    <img src={CCL_Logo} alt="" height="60" />
                                </span>
                                <span className="logo-lg">
                                    <img
                                        src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? CCL_Logo : CCL_Logo}
                                        alt=""
                                        height="60"
                                    />
                                </span>
                            </Link>
                            <Link to="/" className="logo logo-light text-center">
                                <span className="logo-sm">
                                    <img src={CCL_Logo} alt="" height="30" />
                                </span>
                                <span className="logo-lg">
                                    <img
                                        src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? CCL_Logo : CCL_Logo}
                                        alt=""
                                        height="60"
                                    />
                                </span>
                            </Link>
                        </div>
                    )}

                    <ul className="list-unstyled topnav-menu float-end mb-0">
                        {/* <li className="d-none d-lg-block">
                            <TopbarSearch items={SearchResults} />
                        </li> */}

                        {/* <li className="dropdown d-inline-block d-lg-none">
                            <SearchDropdown />
                        </li> */}
                        <li className="dropdown d-none d-lg-inline-block">
                            <MaximizeScreen />
                        </li>
                        {/* <li className="dropdown notification-list topbar-dropdown">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        <li className="dropdown notification-list topbar-dropdown">
                            <ProfileDropdown
                                profilePic={user? (user?.profile_image !== 'null' ? user.profile_image: NoImage) : NoImage}
                                menuItems={ProfileMenus}
                                username={user?.first_name}
                                userTitle={'Founder'}
                            />
                        </li>
                        {/* <li className="dropdown notification-list">
                            <button
                                className="nav-link dropdown-toggle right-bar-toggle waves-effect waves-light btn btn-link shadow-none"
                                onClick={handleRightSideBar}
                            >
                                <i className="fe-settings noti-icon"></i>
                            </button>
                        </li> */}
                    </ul>

                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                        {layoutType !== LayoutTypes.LAYOUT_HORIZONTAL && (
                            <li>
                                <button
                                    className="button-menu-mobile waves-effect waves-light d-none d-lg-block"
                                    onClick={toggleLeftSidebarWidth}
                                >
                                    <i className="fe-menu"></i>
                                </button>
                            </li>
                        )}

                        <li>
                            <button
                                className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                                onClick={handleLeftMenuCallBack}
                            >
                                <i className="fe-menu" />
                            </button>
                        </li>

                        {/* Mobile menu toggle (Horizontal Layout) */}
                        <li>
                            <Link
                                to="#"
                                className={classNames('navbar-toggle nav-link', {
                                    open: isopen,
                                })}
                                onClick={handleLeftMenuCallBack}
                            >
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
