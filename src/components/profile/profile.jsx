import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      dispatch(fetchUser(decoded.user_id));
    }
  }, []);

  return (
    <div className="vh-100" style={{ backgroundColor: 'white' }}>
      <Menubar heading={'Profile'} />
      <div className="card mt-4 mx-auto p-4" style={{ width: '400px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={user.profile_image ? user.profile_image : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'}
              alt='Profile'
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{user.username}</h3>
              <p className="card-text">{user.email}</p>
              <p className="card-text">Senior Journalist</p>
              <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
