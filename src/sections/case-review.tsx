import { useEffect, useState } from 'react';

// mui
import {
  Button,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

// project-import
import { ICaseReview } from '@/types/case-review';
import { CaseReviewStatusOption } from '@/lib/constants/case-review';

// third-party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// redux
import { useDispatch, useSelector } from '@/redux/store';
import { getUserList } from '@/redux/slices/user';
import { IUser } from '@/types/user';

export interface ICaseReviewProps {
  caseReview: ICaseReview | undefined;
}

export default function CaseReview({ caseReview }: ICaseReviewProps) {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((store) => store.user);
  const [ableToEdit, setAbleToEdit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserList());
  }, [caseReview]);

  const handleClickSave = () => {
    setAbleToEdit(!ableToEdit);
    // Todo: Should add to save updated data in local
  };

  const initialValues = {
    authority: caseReview?.authority?.id || '',
    assigner: caseReview?.assigner?.id || '',
    team: caseReview?.authority?.team?.id || '',
    status: caseReview?.status?.id || '',
  };

  const validationSchema = Yup.object().shape({
    authority: Yup.string().required('Authority is required.'),
    assigner: Yup.string().required('Assigner is required.'),
    team: Yup.string().required('Team is required.'),
    status: Yup.string().required('Case Review Status is required.'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const { values, setValues, errors } = formik;

  useEffect(() => {
    if (caseReview) {
      setValues({
        authority: caseReview.authority.id,
        assigner: caseReview.assigner.id,
        team: caseReview.authority.team.id,
        status: caseReview.status.id,
      });
    }
  }, [caseReview]);

  const onChangeValues = (field: string, value: string | number) => {
    setValues({ ...values, [field]: value });
  };

  const getUserName = (id: number, users: IUser[] | null) =>
    users?.find((user) => user.id == id)?.name;

  const getTeamName = (userId: number, users: IUser[] | null) =>
    users?.find((user) => user.id == userId)?.team?.name;

  const getStatusName = (id: number) => CaseReviewStatusOption[id];

  return (
    <Stack spacing={{ xs: 3, md: 6 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h2" color="text.primary">
          Case Review
        </Typography>

        <Button
          variant="text"
          onClick={handleClickSave}
          disabled={errors && Object.values(errors).some((value) => !!value)}
        >
          <Typography
            variant="body1"
            color={
              errors && Object.values(errors).some((value) => !!value)
                ? 'error.main'
                : 'text.secondary'
            }
            sx={{ px: 1, borderBottom: 1, borderColor: 'divider' }}
          >
            {ableToEdit ? 'Save' : 'Edit'}
          </Typography>
        </Button>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bolder"
            color="text.primary"
            sx={{ width: { xs: '120px', md: '180px' } }}
          >
            Authority*
          </Typography>
          <Select
            name="authority"
            value={values.authority as string}
            error={!!errors?.authority}
            onChange={(event: SelectChangeEvent) =>
              onChangeValues('authority', event.target.value as string)
            }
            displayEmpty
            inputProps={{ 'aria-label': 'Without label', readOnly: !ableToEdit }}
            sx={{ flex: 1 }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }}>
              Select Authority
            </MenuItem>
            {users &&
              users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bolder"
            color="text.primary"
            sx={{ width: { xs: '120px', md: '180px' } }}
          >
            Assigned
          </Typography>
          <Select
            name="assigner"
            value={values.assigner as string}
            error={!!errors?.assigner}
            onChange={(event: SelectChangeEvent) =>
              onChangeValues('assigner', event.target.value as string)
            }
            displayEmpty
            inputProps={{ 'aria-label': 'Without label', readOnly: !ableToEdit }}
            sx={{ flex: 1 }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }}>
              Select Assigner
            </MenuItem>
            {users &&
              users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography
            variant="body1"
            fontWeight="bolder"
            color="text.primary"
            sx={{ width: { xs: '120px', md: '180px' } }}
          >
            Team
          </Typography>
          <TextField
            id="team-name"
            variant="standard"
            value={getTeamName(Number(values.authority), users)}
            inputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />
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
          <Select
            value={values.status as string}
            error={!!errors?.status}
            onChange={(event: SelectChangeEvent) =>
              onChangeValues('status', event.target.value as string)
            }
            displayEmpty
            inputProps={{ 'aria-label': 'Without label', readOnly: !ableToEdit }}
            sx={{ flex: 1 }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }}>
              Select Status
            </MenuItem>
            {CaseReviewStatusOption.map((status, index) => (
              <MenuItem key={index} value={index + 1}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
    </Stack>
  );
}
