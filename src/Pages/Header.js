import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserDetail } from '../api/auth';
import { toast } from 'react-toastify';
import logo from '../Img/Logo.svg';
import { IoIosLogOut } from 'react-icons/io';
import { ContextMain } from '../Context/context';
import Loading from '../components/Loading';

const Header = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { isLoading } = useContext(ContextMain);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const res = await getUserDetail();
          const userDetail = res.data;
          setUser(userDetail);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem('accessToken');
      toast.success('Đăng xuất thành công !!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Đã xảy ra lỗi khi đăng xuất');
    }
  };

  const handleClick = () => {
    return setLoading(true) && <Loading />;
  };

  if (isLoading) return <Loading />;

  const isHomePage = location.pathname === '/';

  return (
    <header className="flex items-center justify-between container pt-2 pb-2">
      <Link to={'/'} 
                  onClick={handleClick}
      
      >
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <nav>
        <>
          {user && (
            <>
              <div className="flex items-center">
                <span className="mr-5 b hover:text-gray-800 dark:hover:text-gray-200 ">
                  Hello: {user?.response?.userName}
                </span>

                <Link
                  to="/blog"
                  className={`mr-5 border-b-2 ${
                    location.pathname === '/blog'
                      ? 'border-gray-800'
                      : 'border-transparent'
                  } hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-800 mx-1.5 sm:mx-6`}
                  onClick={handleClick}
                >
                  Blog
                </Link>
                <Link
                  to="/createPost"
                  className={`mr-5 border-b-2 ${
                    location.pathname === '/createPost'
                      ? 'border-gray-800'
                      : 'border-transparent'
                  } hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-800 mx-1.5 sm:mx-6`}
                >
                  Create New Post
                </Link>
                <a onClick={logout}>
                  <IoIosLogOut className="cursor-pointer" />
                </a>
              </div>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/"
                className={`mr-5 text-gray-800 dark:text-gray-200 ${
                  isHomePage ? 'border-b-2 border-gray-800' : ''
                } mx-1.5 sm:mx-6 transition-all `}
                onClick={handleClick}

              >
                Home
              </Link>

              <Link
                to="/blog"
                className={`mr-5 border-b-2 ${
                  location.pathname === '/blog'
                    ? 'border-gray-800'
                    : 'border-transparent'
                } hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-800 mx-1.5 sm:mx-6`}
                onClick={handleClick}

              >
                Blog
              </Link>

              <Link
                to="/register"
                className={`mr-5 border-b-2 ${
                  location.pathname === '/register'
                    ? 'border-gray-800'
                    : 'border-transparent'
                } hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-800 mx-1.5 sm:mx-6`}
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className={`mr-5 border-b-2 ${
                  location.pathname === '/login'
                    ? 'border-gray-800'
                    : 'border-transparent'
                } hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-800 mx-1.5 sm:mx-6`}
              >
                Login
              </Link>
            </>
          )}
        </>
      </nav>
    </header>
  );
};

export default Header;
