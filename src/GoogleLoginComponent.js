import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
    const [user, setUser] = useState(null);

    const handleSuccess = async (credentialResponse) => {
        console.log('Credential Response:', credentialResponse); // Log the entire credential response
        const token = credentialResponse.credential;
        console.log('Google Token:', token); // Log the token

        const userProfile = await fetchUserProfile(token);
        if (userProfile && userProfile.error) {
            console.error('Error fetching user profile:', userProfile.error);
            return;
        }
        console.log('User Profile:', userProfile); // Log the user profile data
        setUser(userProfile); // Set user data after successful login
    };

    const handleFailure = (error) => {
        console.error('Login failed:', error); // Log login failure
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            console.log('Fetch User Profile Response Status:', response.status); // Log the response status
            if (!response.ok) {
                console.error(`Failed to fetch user profile. Status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return { error: error.message };
        }
    };

    return (
        <div>
            <h1>Login with Google</h1>
            <GoogleLogin
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                scope="profile email"
            />

            {user && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Welcome, {user.name}!</h2>
                    <img src={user.picture} alt="Profile" width="100" />
                </div>
            )}
        </div>
    );
};

export default GoogleLoginComponent;
