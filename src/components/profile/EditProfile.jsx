// EditProfile.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '../actions/userActions';
import { getLocal } from '../../healpers/auth';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const user = useSelector((state) => state.user.user);
    const token = getLocal();
    const decoded = jwtDecode(token);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: null,
    });

    useEffect(() => {
        // Fetch user details when the component mounts
        dispatch(fetchUser(decoded.userId));
    }, [dispatch]);

    useEffect(() => {
        // Set the form data when user details are fetched
        setFormData({
            username: user.username,
            email: user.email,
            password: '',  // Resetting password for security reasons
            profileImage: null, // Resetting profile image for security reasons
            userId: user.id,
        });
    }, [user]);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            // Handle file input separately
            const selectedFile = e.target.files[0];
            console.log('Selected File:', selectedFile);
            setFormData((prevFormData) => ({
                ...prevFormData,
                profileImage: selectedFile,
            }));
        } else {
            // Handle other inputs
            const { name, value } = e.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        console.log('Updated FormData:', formData);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const updatedUserData = await dispatch(updateUser(formData));
            console.log('User updated successfully:', updatedUserData);
            navigate('/profile'); // Example navigation
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">AUTH-SITE</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Edit Profile Form */}
            <div className="container mt-4">
                <div className="card p-4">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label">Profile Picture:</label>
                            <input type="file" className="form-control" id="profileImage" name="profileImage" onChange={handleChange} />
                        </div>
                        {/* Other fields... */}
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
