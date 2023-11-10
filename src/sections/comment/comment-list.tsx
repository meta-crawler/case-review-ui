// mui
import { Stack, Typography, Button } from '@mui/material';

// project import
import MainCard from '@/components/MainCard';
import { IComment } from '@/types/comment';
import EmptyData from '@/components/EmptyData';

function renderRow(index: number) {
  return <></>;
}

export interface ICommentListProps {
  comments: IComment[] | null;
}

export default function CommentList({ comments }: ICommentListProps) {
  return (
    <MainCard content={false} border={false}>
      {!comments || !comments?.length ? (
        <EmptyData msg="No Comments" height={180} />
      ) : (
        <Stack height={400} spacing={1} sx={{ overflowY: 'auto' }}>
          {Array.from({ length: 10 }, (_, index) => renderRow(index))}
        </Stack>
      )}
    </MainCard>
  );
}
