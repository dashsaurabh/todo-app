import React from 'react';
import './LoginOptions.css';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GoogleSignIn from './GoogleSignIn';

export default function () {
    return (
        <Container className="login-class">
            <Card className="login-card">
                <CardContent>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Sign In
                    </Typography>
                    <GoogleSignIn />
                </CardContent>
            </Card>
        </Container>

    )
}