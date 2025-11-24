import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: "Logout",
                    onClick: handleLogout,
                },
            ]}
        />
    );

    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="w-[300px] bg-gray-50 flex-shrink-0 flex flex-col border-r border-gray-200">
                <div className="px-10 py-3 border-b border-gray-200">
                    <Link to="/">
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>ZOOZOOSTUDIO</span>
                    </Link>
                </div>
                <div className="p-5 flex-grow overflow-y-auto">
                    <div className="mt-4">
                        <h2 className="text-secondary uppercase text-xs px-5 mt-8 mb-3">
                            Service
                        </h2>
                        <div className="flex flex-col gap-y-1">
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/my-order') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/my-order"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="receipt"
                                    className={`svg-inline--fa fa-receipt fa-fw w-5 h-4 ${isActive('/my-order') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill={isActive('/my-order') ? '#2b7fff' : '#000'}
                                        d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8l0  464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0  488L0 24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 144zM80 352c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 336c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 240z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/my-order') ? 'text-blue-500' : ''}`}>My Order</span>
                            </Link>
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/create-order') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/create-order"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="cart-shopping"
                                    className={`svg-inline--fa fa-cart-shopping fa-fw w-5 h-4 ${isActive('/create-order') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill={isActive('/create-order') ? '#2b7fff' : '#000'}
                                        d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/create-order') ? 'text-blue-500' : ''}`}>Create Order</span>
                            </Link>
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/services') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/services"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="comment-dots"
                                    className={`svg-inline--fa fa-comment-dots fa-fw w-5 h-4 ${isActive('/services') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill={isActive('/services') ? '#2b7fff' : '#000'}
                                        d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/services') ? 'text-blue-500' : ''}`}>Services</span>
                            </Link>
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/chat') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/messages"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="comment-dots"
                                    className={`svg-inline--fa fa-comment-dots fa-fw w-5 h-4 ${isActive('/chat') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill={isActive('/messages') ? '#2b7fff' : '#000'}
                                        d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/messages') ? 'text-blue-500' : ''}`}>Messages</span>
                            </Link>
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/payments') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/payments"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="wallet"
                                    className={`svg-inline--fa fa-wallet fa-fw w-5 h-4 ${isActive('/payments') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill={isActive('/payments') ? '#2b7fff' : '#000'}
                                        d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/payments') ? 'text-blue-500' : ''}`}>Payments</span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-secondary uppercase text-xs px-5 mt-8 mb-3">
                            Account
                        </h2>
                        <div className="flex flex-col gap-y-1">
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/my-account') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/my-account"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="user"
                                    className={`svg-inline--fa fa-user fa-fw w-5 h-4 ${isActive('/my-account') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        fill={isActive('/my-account') ? '#2b7fff' : '#000'}
                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/my-account') ? 'text-blue-500' : ''}`}>My Account</span>
                            </Link>
                            <Link
                                className={`px-5 py-3 space-x-3 rounded-lg text-sm flex items-center ${isActive('/change-password') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                to="/change-password"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="lock"
                                    className={`svg-inline--fa fa-lock fa-fw w-5 h-4 ${isActive('/change-password') ? 'text-blue-500' : 'text-primary-dark'}`}
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        fill={isActive('/change-password') ? '#2b7fff' : '#000'}
                                        d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"
                                    ></path>
                                </svg>
                                <span className={`${isActive('/change-password') ? 'text-blue-500' : ''}`}>Change Password</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <div className="h-[75px] p-3 pl-6 pr-10 border-b border-gray-200 w-full flex items-center justify-between md:justify-end flex-shrink-0">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bars"
                        className="svg-inline--fa fa-bars md:!hidden cursor-pointer w-5 h-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill={isActive('/my-account') ? '#2b7fff' : '#000'}
                            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                        ></path>
                    </svg>
                    <div className="flex gap-x-4 items-center">
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <div className="ant-dropdown-trigger flex gap-x-2 items-center select-none cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold uppercase">
                                    {user?.email ? user.email.charAt(0) : "S"}
                                </div>
                                <span>{user?.email || "silinh66@gmail.com"}</span>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="chevron-down"
                                    className="svg-inline--fa fa-chevron-down w-3 h-2"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill={isActive('/my-account') ? '#2b7fff' : '#000'}
                                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                    ></path>
                                </svg>
                            </div>
                        </Dropdown>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="bell"
                            className="svg-inline--fa fa-bell text-text-secondary cursor-pointer w-5 h-5"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={isActive('/notifications') ? '#2b7fff' : '#000'}
                                d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-10 py-13">
                    {children}
                </div>
            </main>

            {/* Chat Widget */}
            <div className="fixed z-50 flex flex-col items-end" style={{ bottom: '24px', right: '24px' }}>
                <div className="hidden sm:block select-none mb-4">
                    <div className="px-3 py-2 rounded-2xl bg-white border border-border shadow-md font-light flex gap-x-2 items-center">
                        <span>Chat with us 👋</span>
                        <button className="w-7 h-7 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="xmark"
                                className="svg-inline--fa fa-xmark w-4 h-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    fill={isActive('/chat') ? '#2b7fff' : '#000'}
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Chat with support"
                    className="p-0 relative flex items-center justify-center"
                >
                    <span className="absolute inline-flex h-1/2 w-1/2 rounded-full bg-primary opacity-40 animate-ping"></span>
                    <img src="data:image/svg+xml,%3csvg%20width='84'%20height='84'%20viewBox='0%200%2084%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_d_486_28214)'%3e%3cpath%20d='M16%2034C16%2014.5%2022.5%208%2042%208C61.5%208%2068%2014.5%2068%2034C68%2053.5%2061.5%2060%2042%2060C22.5%2060%2016%2053.5%2016%2034Z'%20fill='url(%23paint0_linear_486_28214)'/%3e%3c/g%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M41.9987%2021.459C35.0721%2021.459%2029.457%2027.0741%2029.457%2034.0007C29.457%2036.1663%2030.0067%2038.206%2030.9746%2039.9854L30.0551%2044.9238C30.0024%2045.2074%2030.0927%2045.4987%2030.2966%2045.7027C30.5006%2045.9066%2030.792%2045.997%2031.0755%2045.9442L36.0139%2045.0248C37.7933%2045.9926%2039.833%2046.5423%2041.9987%2046.5423C48.9252%2046.5423%2054.5404%2040.9272%2054.5404%2034.0007C54.5404%2027.0741%2048.9252%2021.459%2041.9987%2021.459ZM47.832%2032.5423C47.0267%2032.5423%2046.3737%2033.1953%2046.3737%2034.0007C46.3737%2034.806%2047.0267%2035.459%2047.832%2035.459C48.6374%2035.459%2049.2904%2034.806%2049.2904%2034.0007C49.2904%2033.1953%2048.6374%2032.5423%2047.832%2032.5423ZM40.5404%2034.0007C40.5404%2033.1953%2041.1933%2032.5423%2041.9987%2032.5423C42.804%2032.5423%2043.457%2033.1953%2043.457%2034.0007C43.457%2034.806%2042.804%2035.459%2041.9987%2035.459C41.1933%2035.459%2040.5404%2034.806%2040.5404%2034.0007ZM36.1654%2032.5423C35.3599%2032.5423%2034.707%2033.1953%2034.707%2034.0007C34.707%2034.806%2035.3599%2035.459%2036.1654%2035.459C36.9708%2035.459%2037.6237%2034.806%2037.6237%2034.0007C37.6237%2033.1953%2036.9708%2032.5423%2036.1654%2032.5423Z' fill='white'/%3e%3cdefs%3e%3cfilter%20id='filter0_d_486_28214'%20x='0'%20y='0'%20width='84'%20height='84'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dy='8'/%3e%3cfeGaussianBlur%20stdDeviation='8'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='out'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%201%200%200%200%200%200.337255%200%200%200%200%200.188235%200%200%200%200.24%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_486_28214'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_486_28214'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_486_28214'%20x1='15.9992'%20y1='59.9997'%20x2='67.9994'%20y2='7.99937'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF7A00'/%3e%3cstop%20offset='1'%20stop-color='%23FFD439'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" />
                </button>
            </div>
        </div>
    );
};

export default DashboardLayout;
