import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from './../../lib/apiRequest';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from './../../context/AuthContext';

function ProfilePage() {
  const {currentUser, updateUser} = useContext(AuthContext)
  const navigate = useNavigate();


  useEffect(()=>{
    if(!currentUser){
      navigate('/login')
    }
  },[currentUser, navigate])


  const handleLogout= async()=>{
    try{
       await apiRequest.post('/auth/logout');
      updateUser(null)
      
      navigate('/')

    }catch(err){
      console.log(err?.message)
    }
  }
  return (
   
    currentUser && (
      (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={'/profile/update'}> 
            <button>Update Profile</button></Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.userInfo?.avatar ? currentUser?.userInfo?.avatar : "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser?.userInfo?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.userInfo?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={'/add'}> 
            <button>Create New Post</button></Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>)
    )
  
  );
  
}

export default ProfilePage;
