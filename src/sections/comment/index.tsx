import { useState } from 'react';

// mui
import { Button, Stack, Typography, Divider } from '@mui/material';

// project-import
import { ITeam } from '@/types/user';
import { IComment } from '@/types/comment';
import CommentList from './comment-list';

export interface ICommentProps {
  team: ITeam | undefined;
  comments: IComment[] | null;
}

export default function Comment({ team, comments }: ICommentProps) {
  const [ableToEdit, setAbleToEdit] = useState<boolean>(false);

  const handleClickSave = () => {
    setAbleToEdit(!ableToEdit);
    // Todo: Should add to save updated data in local
  };

  return (
    <>
      <Stack spacing={{ xs: 1, md: 2 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={1}
          sx={{ px: { xs: 2, md: 4 } }}
        >
          <Stack spacing={1}>
            <Typography variant="h2" color="text.primary">
              {team?.name}
            </Typography>
            <Typography variant="h5" fontWeight="lighter" color="text.primary">
              {team?.description}
            </Typography>
          </Stack>

          <Stack alignItems="flex-start">
            <Button variant="text" onClick={handleClickSave}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ px: 1, borderBottom: 1, borderColor: 'divider' }}
              >
                {ableToEdit ? 'Save' : 'Edit'}
              </Typography>
            </Button>
          </Stack>
        </Stack>

        <Divider />

        <CommentList comments={comments} />
      </Stack>
    </>
  );
}
