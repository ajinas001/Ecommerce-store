import React, { useState } from "react";


function Adminsidebar() {
    const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
    const [postDropdownOpen, setPostDropdownOpen] = useState(false);
    const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);
    const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);

    const toggleUsersDropdown = () => {
        setUsersDropdownOpen(!usersDropdownOpen);
    };

    const togglePostDropdown = () => {
        setPostDropdownOpen(!postDropdownOpen);
    };

    const toggleMessagesDropdown = () => {
        setMessagesDropdownOpen(!messagesDropdownOpen);
    };

    const toggleNotificationsDropdown = () => {
        setNotificationsDropdownOpen(!notificationsDropdownOpen);
    };


    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };
    return (
        <>

            {/* {isDropdownOpen && (<button
                type="button"
                className=" fixed left-0 top-0  bg-[#f8f4f3] p-4 text-lg text-gray-900 font-semibold sidebar-toggle"
                onClick={toggleDropdown}
            >
                <i className="ri-menu-line" />
            </button>)}
            {!isDropdownOpen && (
                <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform sm:w-10">
                    <ul className="mt-4">
                        <span className="text-gray-400 font-bold">ADMIN</span>
                        <button
                            type="button"
                            className="text-lg text-gray-900 font-semibold sidebar-toggle ms-32"
                            onClick={toggleDropdown}
                        >
                            <i className="ri-menu-line" />
                        </button>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="ri-home-2-line mr-3 text-lg" />
                                <span className="text-sm">Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={toggleUsersDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bx-user mr-3 text-lg" />
                                <span className="text-sm">Users</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${usersDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${usersDropdownOpen ? '' : 'hidden'}`}>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Roles
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={togglePostDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bx-plus-circle mr-3 text-lg" />

                                <span className="text-sm">Add Products</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${postDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${postDropdownOpen ? '' : 'hidden'}`}>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={togglePostDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Post</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${postDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${postDropdownOpen ? '' : 'hidden'}`}>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <span className="text-gray-400 font-bold">BLOG</span>
                        <li className="mb-1 group">
                       
                            <a
                                href="#"
                                onClick={toggleMessagesDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Blog</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${messagesDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                        </li>
                      
                        <li className="mb-1 group">
                           
                        </li>
                        <span className="text-gray-400 font-bold">OTHER</span>
                        <li className="mb-1 group">
                          
                            <a
                                href="#"
                                onClick={toggleNotificationsDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Other</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${notificationsDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                        </li>
                    </ul>
                </div>)} */}


                <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform sm:w-10">
                <div className="flex-shrink-0">
                                <a href="#" title="" className="flex">
                                    <img
                                        className="w-30 h-20 "
                                        src="../images/shoplogo.png"
                                        alt=""
                                    />
                                </a>
                            </div>
                    <ul className="mt-4">
                        
                        <span className="text-gray-400 font-bold">ADMIN</span>
                        {/* <button
                            type="button"
                            className="text-lg text-gray-900 font-semibold sidebar-toggle ms-32"
                            onClick={toggleDropdown}
                        >
                            <i className="ri-menu-line" />
                        </button> */}
                        <li className="mb-1 group">
                            <a
                                href="/adminhome"
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="ri-home-2-line mr-3 text-lg" />
                                <span className="text-sm">Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={toggleUsersDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bx-user mr-3 text-lg" />
                                <span className="text-sm">Users</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${usersDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${usersDropdownOpen ? '' : 'hidden'}`}>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Roles
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={togglePostDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bx-plus-circle mr-3 text-lg" />

                                <span className="text-sm">Add Products</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${postDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${postDropdownOpen ? '' : 'hidden'}`}>
                               
                                <li className="mb-4">
                                    <a
                                        href="/addproduct"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                       Add Product
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                       Add Offer Product
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Add Swiper product
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Add latest collection product
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-1 group">
                            <a
                                href="#"
                                onClick={togglePostDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Post</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${postDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                            <ul className={`pl-7 mt-2 ${postDropdownOpen ? '' : 'hidden'}`}>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                    >
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <span className="text-gray-400 font-bold">BLOG</span>
                        <li className="mb-1 group">
                            {/* Blog menu items */}
                            <a
                                href="#"
                                onClick={toggleMessagesDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Blog</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${messagesDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                        </li>
                        {/* <span className="text-gray-400 font-bold">PERSONAL</span> */}
                        <li className="mb-1 group">
                            {/* Personal menu items */}
                        </li>
                        <span className="text-gray-400 font-bold">OTHER</span>
                        <li className="mb-1 group">
                            {/* Other menu items */}
                            <a
                                href="#"
                                onClick={toggleNotificationsDropdown}
                                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                            >
                                <i className="bx bxl-blogger mr-3 text-lg" />
                                <span className="text-sm">Other</span>
                                <i className={`ri-arrow-right-s-line ml-auto ${notificationsDropdownOpen ? 'rotate-90' : ''}`} />
                            </a>
                        </li>
                    </ul>
                </div>

        </>
    )
}

export default Adminsidebar
