// mui
import { Stack, Typography, Button, TextField } from '@mui/material';

// project import
import MainCard from '@/components/MainCard';
import { IComment } from '@/types/comment';
import EmptyData from '@/components/EmptyData';

// third-party
import dayjs from 'dayjs';

function renderRow(
  comment: IComment,
  ableToEdit: boolean,
  canEditFromParent: boolean = false,
  onChangeComment: (comment: string, id: number) => void,
  onChangeEdit: (ableToEdit: boolean, id: number) => void,
) {
  const handleClickEdit = () => {
    onChangeEdit(!ableToEdit, comment.id);
  };

  const handleChange = (event: any) => {
    onChangeComment(event.target.value, comment.id);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
        <Stack>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {dayjs(comment.updatedAt).format('MMM DD, YYYY HH:mm A')}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {comment.author.name}
          </Typography>
        </Stack>

        <Stack alignItems="flex-start">
          <Button variant="text" onClick={handleClickEdit} disabled={!canEditFromParent}>
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

      {ableToEdit ? (
        <TextField fullWidth multiline rows={5} value={comment.comment} onChange={handleChange} />
      ) : (
        <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
          {comment.comment}
        </Typography>
      )}
    </Stack>
  );
}

export interface ICommentListProps {
  comments: IComment[] | null;
  ableToEdits: boolean[];
  canEditFromParent: boolean;
  onChangeComment: (comment: string, id: number) => void;
  onChangeEdit: (ableToEdit: boolean, id: number) => void;
}

export default function CommentList({
  comments,
  ableToEdits,
  canEditFromParent,
  onChangeComment,
  onChangeEdit,
}: ICommentListProps) {
  return (
    <MainCard content={false} border={false}>
      {!comments || !comments?.length ? (
        <EmptyData msg="No Comments" height={180} />
      ) : (
        <Stack
          spacing={1}
          sx={{ overflowY: 'auto', px: { xs: 2, md: 4 }, height: '100%', maxHeight: 400 }}
        >
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
            <Typography variant="h5" color="text.primary">
              Comments
            </Typography>
            {comments?.length && (
              <Typography variant="subtitle2" color="text.primary">
                Updated{' '}
                {dayjs(comments[comments.length - 1].updatedAt).format('MMM DD, YYYY HH:mm A')}
              </Typography>
            )}
          </Stack>
          {comments.map((comment, index) =>
            renderRow(
              comment,
              ableToEdits[index],
              canEditFromParent,
              onChangeComment,
              onChangeEdit,
            ),
          )}
        </Stack>
      )}
    </MainCard>
  );
}
