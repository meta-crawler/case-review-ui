import { useEffect } from 'react';
import Link from 'next/link';

// material-ui
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Stack,
} from '@mui/material';

// project-import
import MainCard from '@/components/MainCard';
import Layout from '@/components/layout';
import { useAuthContext } from '@/auth/useAuthContext';

// third-party
import dayjs from 'dayjs';

// sx styles
const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none',
};

// redux
import { useDispatch, useSelector } from '@/redux/store';
import { getCasesByAuthority } from '@/redux/slices/case';

export default function IndexPage() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { isLoading, cases } = useSelector((store) => store.case);

  useEffect(() => {
    if (user) {
      dispatch(getCasesByAuthority(user.id));
    }
  }, [user]);

  return (
    <Layout title="Home | Case Review System">
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
        sx={{ py: { xs: 3, md: 6, lg: 9 }, px: 2 }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="body1">
            User Name:
            <Typography component="span" variant="h5">
              {user?.name || '-'}
            </Typography>
          </Typography>

          <Typography variant="body1">
            Team Name:{' '}
            <Typography component="span" variant="h5">
              {user?.team?.name || '-'}
            </Typography>
          </Typography>
        </Stack>
        <MainCard
          content={false}
          sx={{ minWidth: { xs: '', sm: '360px', md: '480px', lg: '640px' } }}
        >
          <List
            sx={{
              p: 0,
              '& .MuiListItemButton-root': {
                py: 0.5,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' },
              },
            }}
          >
            {cases &&
              cases.map((data, index) => (
                <Link key={data.id} href="/case-review/[case]" as={`/case-review/${data.id}`}>
                  <ListItemButton key={data.id} divider={index !== cases.length - 1}>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {`# ${data.id.toString().padStart(4, '0')}`}{' '}
                          <Typography component="span" variant="h5">
                            {data.alert.alertType.name}
                          </Typography>
                        </Typography>
                      }
                      secondary={<Typography variant="body1">{data.status.name}</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="caption" noWrap>
                        {dayjs(data.updatedAt).format('MM/DD/YYYY HH:mm')}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </Link>
              ))}
          </List>
        </MainCard>
      </Stack>
    </Layout>
  );
}
