import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import Menubar from '../Navbar/Navbar';
import { getLocal } from '../../healpers/auth';
import jwtDecode from 'jwt-decode';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getLocal();
  const decoded = jwtDecode(token);

  useEffect(() => {
    if (!token) {
      console.log("User not authenticated");
    } else {
      // fetchUser is action return in userActions.jsx
      dispatch(fetchUser(decoded.user_id));
    }
  }, [])
  return (
    <div className="vh-100" style={{ backgroundColor: 'white' }}>
      <Menubar heading={'Profile'} />
      <div>
        <div className="flex-shrink-0">
          {/* Render the user profile image here */}
          <img
            style={{ width: '180px', borderRadius: '10px' }}
            src={user.profile_image ? user.profile_image : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'}
            alt='Profile'
            fluid
          />
        </div>
        <div className="flex-grow-1 ms-5 mt-5">
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          {/* Add more details if needed */}
          <p>Senior Journalist</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
