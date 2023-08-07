import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper, Card, CardContent, Divider } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import http from '../http'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { differenceInDays } from 'date-fns';

function Staff_Complete() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')

    useEffect(() => {
        http.post(`/user/verifystaff?token=${token}`).then((res) => {
            console.log(res)
            navigate('/')
        });
    }, []);

    return (
        <div>Error</div>
    )
}

export default Staff_Complete