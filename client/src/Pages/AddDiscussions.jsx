import { Container, Typography } from "@mui/material";
import React from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'

function AddDiscussions(){
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: yup.object().shape({
            title: yup.string().trim().required('Title is required.'),
            description: yup.string().trim().required('Description is required.'),
        }),
        onSubmit: (data) => {
            data.title = data.title.trim();
            data.description = data.description.trim();
        }
    })
    return(
        <Container maxWidth='x1'>
            <Box>
                <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                    Create your Discussion here:
                </Typography>


            </Box>

        </Container>
    )
   
}
export default AddDiscussions;