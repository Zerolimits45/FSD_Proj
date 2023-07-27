import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import http from '../../http'
import { useSnackbar } from 'notistack';

const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
const textstyle = { color: '#150039', fontWeight: 'bold' }

