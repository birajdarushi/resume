import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
    const handleSuccess = async (credentialResponse) => {
        console.log('Google Token:', credentialResponse.credential);
        
        // Fetch user profile information
        const userProfile = await fetchUserProfile(credentialResponse.credential);
        console.log('User Profile:', userProfile);
    };

    const handleFailure = (error) => {
        console.error('Login failed:', error);
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data; // Return user profile data
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <div>
            <h1>Login with Google</h1>
            <GoogleLogin
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                logo="https://upload.wikimedia.org/wikipedia/commons/4/4b/Google_2015_logo.svg" // Optional logo
            />
        </div>
    );
};

export default GoogleLoginComponent;
