import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import http from '../http';
function Discussions() {
    const [discussionsList, setDiscussionsList] = useState([]);

    useEffect(() => {
        http.get('/discussion').then((res) => {
            console.log(res.data);
            setDiscussionsList(res.data);
        });
    }, []);
    return (
        <Box>
            <Typography variant="h5" color="white" sx={{ my: 2 }}>
                Discussions
            </Typography>

            <Grid container spacing={2}>
                {
                    discussionsList.map((discussion, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {discussion.title}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {discussion.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }

            </Grid>


        </Box>
    )
}
export default Discussions;


