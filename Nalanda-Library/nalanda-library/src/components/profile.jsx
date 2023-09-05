import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { getUserDetails, editUserDetails } from '../services/user';

function Profile() {
    const [user, setUser] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the user being edited

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await getUserDetails();
            if (response['status'] === 'success') {
                setUser(response['data']);
            } else {
                toast.error('Error while calling get /user api');
            }
        } catch (error) {
            console.error('Error while loading profile:', error);
            toast.error('An error occurred while loading details.');
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleSave = async (index) => {
        try {
            const updatedUser = user[index]; // Assuming user data is stored in the user state
            const response = await editUserDetails(updatedUser);
            
            if (response['status'] === 'success') {
                // Update the user data in the state
                const updatedUserData = [...user];
                updatedUserData[index] = updatedUser;
                setUser(updatedUserData);
                
                setEditingIndex(-1); // Clear editing mode
                toast.success('User details updated successfully');
            } else {
                toast.error('Error while updating user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            toast.error('An error occurred while updating user details.');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: 10 }}>Profile</h1>
            <div className='row' style={{ marginTop: 50 }}>
                {user.map((profile, index) => (
                    <div key={profile.uName} className='col-md-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-text' style={{ marginTop: 20 }}>
                                    Name: {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={profile.uName}
                                            onChange={(e) => {
                                                const updatedUser = [...user];
                                                updatedUser[index].uName = e.target.value;
                                                setUser(updatedUser);
                                            }}
                                        />
                                    ) : (
                                        profile.uName
                                    )}
                                </p>
                                <p className='card-text'>
                                    Email: {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={profile.uEmail}
                                            onChange={(e) => {
                                                const updatedUser = [...user];
                                                updatedUser[index].uEmail = e.target.value;
                                                setUser(updatedUser);
                                            }}
                                        />
                                    ) : (
                                        profile.uEmail
                                    )}
                                </p>
                                <p className='card-text'>
                                    Contact: {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={profile.uContact}
                                            onChange={(e) => {
                                                const updatedUser = [...user];
                                                updatedUser[index].uContact = e.target.value;
                                                setUser(updatedUser);
                                            }}
                                        />
                                    ) : (
                                        profile.uContact
                                    )}
                                </p>
                                {editingIndex === index ? (
                                    <button onClick={() => handleSave(index)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
