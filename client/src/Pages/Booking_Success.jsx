import React, { useEffect } from 'react'
import http from '../http'
import { useNavigate, useLocation } from 'react-router-dom'

function Booking_Success() {
    const navigate = useNavigate();

    useEffect(() => {
        http.post('/booking')
            .then((res) => {
                console.log(res.data)
                navigate("/")
            })
    }, []);

    return (
        <div>Booking_Success</div>
    )
}

export default Booking_Success