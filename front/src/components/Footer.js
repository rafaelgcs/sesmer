import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Footer extends Component {
    render() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © Sesmer by '}
                <Link color="inherit" href="https://rafaelgcs.github.io/">
                    Rafael Guimarães
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
}