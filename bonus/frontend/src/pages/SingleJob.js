import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import { jobLoadSingleAction } from "../redux/actions/jobAction";
import Button from "@mui/material/Button";
import { userApplyJobAction } from "../redux/actions/userAction";
import { useTheme } from "@emotion/react";

const SingleJob = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const [file, setFile] = useState();
  const [isApply, setIsApply] = useState(false);
  const [loadingState, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);
  const applyForAJob = async () => {
    setLoading(true);
    const res = await dispatch(
      userApplyJobAction({
        jobId: id,
        file,
      })
    );
    if (res) {
      setIsApply(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa" }}>
        <Navbar />
        <Box sx={{ height: "calc(100vh - 140px)" }}>
          <Container sx={{ pt: "30px" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 4, p: 2 }}>
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Card sx={{ bgcolor: palette.primary.white }}>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        {singleJob && singleJob.title}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Salary
                        </Box>
                        : ${singleJob && singleJob.salary}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Category
                        </Box>
                        :{" "}
                        {singleJob && singleJob.jobType
                          ? singleJob.jobType.jobTypeName
                          : "No category"}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Location
                        </Box>
                        : {singleJob && singleJob.location}
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 2 }}>
                        <h3>Job description:</h3>
                        {singleJob && singleJob.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                  {singleJob?.isApply || isApply ? (
                    <></>
                  ) : (
                    <Typography>
                      <Typography style={{ textAlign: "center" }}>
                        Only support PDF file
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        style={{
                          marginBottom: 20,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        Upload Your CV
                        <input
                          type="file"
                          hidden
                          accept="application/pdf"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </Button>
                      <Typography style={{ textAlign: "center" }}>
                        {file ? file.name : ""}
                      </Typography>
                    </Typography>
                  )}

                  <LoadingButton
                    onClick={applyForAJob}
                    loading={loadingState}
                    sx={{ fontSize: "13px" }}
                    variant="contained"
                    disabled={singleJob?.isApply || !file || isApply}
                  >
                    {singleJob?.isApply || isApply
                      ? "You already apply"
                      : "Applied for this Job"}
                  </LoadingButton>
                </Card>
              </Box>
            </Stack>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
