import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Button, ButtonGroup } from '@mui/material';

// project-import
import MainCard from '@/components/MainCard';

// redux
import { useDispatch, useSelector } from '@/redux/store';
import { getCase } from '@/redux/slices/case';
import dayjs from 'dayjs';

const enum TAB {
  HIGH_RISK = 'high-risk',
  AREA_CONTROL = 'area-control',
}

export default function CaseReview() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, case: selectedCase } = useSelector((store) => store.case);
  const { case: caseId } = router.query;
  const [tab, setTab] = useState<TAB>(TAB.HIGH_RISK);

  useEffect(() => {
    dispatch(getCase(Number(caseId)));
  }, [caseId]);

  return (
    <Stack alignItems="center" justifyContent="flex-start" sx={{ height: '100vh' }}>
      <MainCard
        content={false}
        sx={{
          width: '100%',
          maxWidth: { xs: '360px', md: '640px', lg: '1024px' },
          m: { xs: 2, md: 4, lg: 9 },
          p: { xs: 2, md: 4, lg: 6 },
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} spacing={{ xs: 3, md: 6, lg: 9 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h2" color="text.primary">
                  {selectedCase?.caseReview?.status?.name || '-'}
                </Typography>
                <Typography variant="h5" color="text.primary">
                  Case ID: # {caseId || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated {dayjs(selectedCase?.updatedAt).format('MMM DD, YYYY HH:mm A') || '-'}
                </Typography>
              </Stack>

              <ButtonGroup
                disableElevation
                sx={{ width: 'fit-content', boxShadow: theme.customShadows.z1 }}
              >
                <Button
                  key="one"
                  variant={tab == TAB.HIGH_RISK ? 'contained' : 'text'}
                  color="error"
                  sx={{
                    px: { xs: 3, md: 6 },
                  }}
                  onClick={() => setTab(TAB.HIGH_RISK)}
                >
                  <Typography
                    variant="body1"
                    color={tab == TAB.HIGH_RISK ? 'white' : 'text.primary'}
                    noWrap
                  >
                    High Risk
                  </Typography>
                </Button>
                <Button
                  key="two"
                  variant={tab == TAB.AREA_CONTROL ? 'contained' : 'text'}
                  color="error"
                  sx={{ px: { xs: 3, md: 6 } }}
                  onClick={() => setTab(TAB.AREA_CONTROL)}
                >
                  <Typography
                    variant="body1"
                    color={tab == TAB.AREA_CONTROL ? 'white' : 'text.primary'}
                    noWrap
                  >
                    Area Control
                  </Typography>
                </Button>
              </ButtonGroup>

              <Stack>
                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Alert
                  </Typography>
                  <Typography variant="body1" color="error.main">
                    {selectedCase?.alert?.alertType?.name || '-'}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Time
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {dayjs(selectedCase?.alert?.updatedAt).format('MMM DD, YYYY HH:mm A') || '-'}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Zone
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {selectedCase?.alert?.zone || '-'}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Camera
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {selectedCase?.alert?.camera || '-'}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Authority
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {selectedCase?.authority?.name || '-'}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight="bolder"
                    color="text.primary"
                    sx={{ width: { xs: '120px', md: '180px' } }}
                  >
                    Status
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {selectedCase?.status?.name || '-'}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: { xs: 2, md: 4 },
                backgroundColor: theme.palette.grey[200],
              }}
            ></Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            {/*Case Review Module*/}
          </Grid>

          <Grid item xs={12} md={6}>
            {/*Comment Module*/}
          </Grid>

          <Grid item xs={12} md={6}>
            {/*Operation Button Group*/}
          </Grid>

          <Grid item xs={12} md={6}>
            {/*Submit Button*/}
          </Grid>
        </Grid>
      </MainCard>
    </Stack>
  );
}
