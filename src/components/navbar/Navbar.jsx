import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const {currentUser} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  console.log(number);
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Real Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">Apt List</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
        {
          !currentUser && <> <a href="/login">Sign in</a>
          <a href="/register">Sign up</a> </>
        }
        
        
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser?.userInfo?.avatar ? currentUser?.userInfo?.avatar : "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              alt=""
            />
            <span>{currentUser?.userInfo?.username}</span>
            <Link to="/profile" className="profile">
               <div className="notification">
                {/* {number} */}
                1
                </div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            {/* <a href="/login">Sign in</a>
            <a href="/register" className="">
              Sign up
            </a> */}
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
