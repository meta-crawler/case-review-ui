import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

// mui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Button, ButtonGroup } from '@mui/material';

// project-import
import { IUpdateCase } from '@/redux/types/case';
import MainCard from '@/components/MainCard';
import CaseReview from '@/sections/case-review';
import Comment from '@/sections/comment';
import IconButton from '@/components/@extended/IconButton';

// third-party
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined, RollbackOutlined } from '@ant-design/icons';

// redux
import { useDispatch, useSelector } from '@/redux/store';
import { getCase, getCasesByAuthority, updateCase, updateCaseReview } from '@/redux/slices/case';
import { getCommentsByCase, updateComments } from '@/redux/slices/comment';
import { CaseStatus } from '@/lib/constants/case-review';

const enum TAB {
  HIGH_RISK = 'high-risk',
  AREA_CONTROL = 'area-control',
}

const enum NAVIGATION {
  PREV = 'prev',
  NEXT = 'next',
}

export default function Case() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, case: selectedCase, cases, localCase } = useSelector((store) => store.case);
  const { comments, localComment } = useSelector((store) => store.comment);
  const { case: caseId } = router.query;
  const [tab, setTab] = useState<TAB>(TAB.HIGH_RISK);
  const [caseReviewAbleToEdit, setCaseReviewAbleToEdit] = useState<boolean>(false);
  const [commentsAbleToEdit, setCommentsAbleToEdit] = useState<boolean>(false);

  useEffect(() => {
    if (caseId) {
      dispatch(getCase(Number(caseId)));
      dispatch(getCommentsByCase(Number(caseId)));
    }
  }, [caseId]);

  useEffect(() => {
    if (selectedCase) {
      dispatch(getCasesByAuthority(selectedCase.authority.id));
    }
  }, [selectedCase]);

  const prevPageButtonDisabled = useMemo(() => {
    if (!cases || cases.length < 1) {
      return true;
    }
    if (Number(caseId) <= 1) {
      return true;
    }
    return false;
  }, [caseId, cases]);

  const nextPageButtonDisabled = useMemo(() => {
    if (!cases || cases.length < 1) {
      return true;
    }
    if (cases && Number(caseId) > cases.length - 1) {
      return true;
    }
    return false;
  }, [caseId, cases]);

  const handleNavigation = (moveMode: NAVIGATION, currentId: number) => {
    switch (moveMode) {
      case NAVIGATION.PREV:
        if (!prevPageButtonDisabled) {
          router.push('/case-review/[case]', `/case-review/${Math.max(currentId - 1, 1)}`);
        }
        break;
      case NAVIGATION.NEXT:
        if (!nextPageButtonDisabled && cases) {
          router.push(
            '/case-review/[case]',
            `/case-review/${Math.min(currentId + 1, Math.max(...cases.map((_) => _.id)))}`,
          );
        }
        break;
    }
  };

  const handleSubmit = async () => {
    if (localCase) {
      await dispatch(updateCaseReview(localCase.caseReview));
    }
    if (localComment) {
      await dispatch(updateComments(localComment.comments));
    }
    if (selectedCase) {
      const updatedCase: IUpdateCase = {
        id: selectedCase.id,
        alert: selectedCase.alert.id,
        status: CaseStatus.REVIEW_SUBMITTED,
        authority: selectedCase.authority.id,
        caseReview: selectedCase.caseReview.id,
      };
      await dispatch(updateCase(updatedCase));
      router.reload();
    }
  };

  return (
    <Stack alignItems="center" justifyContent="flex-start" sx={{ height: '100vh' }}>
      <MainCard
        content={false}
        sx={{
          width: '100%',
          maxWidth: { xs: '360px', md: '640px', lg: '1024px' },
          mx: { xs: 2, md: 4, lg: 6 },
          my: { xs: 1, md: 2, lg: 3 },
          p: { xs: 2, md: 4, lg: 6 },
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={{ xs: 3, md: 6, lg: 9 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h2" color="text.primary">
                  {selectedCase?.status?.name || '-'}
                </Typography>
                <Typography variant="h5" color="text.primary">
                  Case ID: # {caseId?.toString().padStart(4, '0') || '-'}
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

              <Stack spacing={1}>
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
            <CaseReview
              caseReview={selectedCase?.caseReview}
              ableToEdit={caseReviewAbleToEdit}
              onChangeAbleToEdit={(ableToEdit: boolean) => setCaseReviewAbleToEdit(ableToEdit)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Comment
              team={selectedCase?.authority?.team}
              comments={comments}
              case={selectedCase}
              ableToEdit={commentsAbleToEdit}
              onChangeAbleToEdit={(ableToEdit: boolean) => setCommentsAbleToEdit(ableToEdit)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="space-between">
              <IconButton onClick={() => router.push('/')}>
                <RollbackOutlined />
              </IconButton>

              <ButtonGroup
                disableElevation
                sx={{ width: 'fit-content', boxShadow: theme.customShadows.z1 }}
              >
                <IconButton
                  onClick={() => handleNavigation(NAVIGATION.PREV, Number(caseId))}
                  disabled={prevPageButtonDisabled}
                >
                  <LeftOutlined />
                </IconButton>
                <IconButton
                  onClick={() => handleNavigation(NAVIGATION.NEXT, Number(caseId))}
                  disabled={nextPageButtonDisabled}
                >
                  <RightOutlined />
                </IconButton>
              </ButtonGroup>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="shadow"
              size="large"
              onClick={handleSubmit}
              disabled={caseReviewAbleToEdit || commentsAbleToEdit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </MainCard>
    </Stack>
  );
}
