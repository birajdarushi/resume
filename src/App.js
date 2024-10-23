import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent from './GoogleLoginComponent';

const App = () => {
    return (
        <GoogleOAuthProvider clientId="1019312549037-56auqv0k0bg4oc9uodahvfi9macfk6rb.apps.googleusercontent.com"> {/* Replace with your Client ID */}
            <div className="App">
                <GoogleLoginComponent />
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;
