import React from 'react';
import GoogleButton from 'react-google-button';

export default function () {
    return (
        <div style={{ marginLeft: 55, marginTop: 20 }}>
            <a href="/auth/google" style={{ textDecoration: 'none' }}>
                <GoogleButton />
            </a>
        </div>
    )
}