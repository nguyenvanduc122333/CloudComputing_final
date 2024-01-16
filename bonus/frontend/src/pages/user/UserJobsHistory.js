import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardElement from '../../component/CardElement'
import jobApi from '../../api/jobApi'
const { getHistoryApplicants } = jobApi;

const UserJobsHistory = () => {
   
    const [applyHistory, setApplyHistory] = useState([]);

    const handleGetHistoryApplicants = async () => {
      const applicants = await getHistoryApplicants();
      console.log(applicants)
      setApplyHistory(applicants);
    };
    useEffect(() => {
      handleGetHistoryApplicants();
    }, []);
    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Jobs History</Typography>
                <Box>
                    {
                        applyHistory.map((history, i) => (
                            <CardElement
                                key={i}
                                id={history.jobId._id}
                                jobTitle={history.jobId.title}
                                description={history.jobId.description}
                                category=''
                                location={history.jobId.location}
                                status={history.applicationStatus}
                            />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

export default UserJobsHistory