import { useEffect, useState } from 'react';

// mui
import { Button, Stack, Typography, Divider, TextField } from '@mui/material';

// antd
import { SendOutlined } from '@ant-design/icons';

// project-import
import { ITeam } from '@/types/user';
import { ICase } from '@/types/case';
import { IComment } from '@/types/comment';
import { ILocalComment } from '@/redux/types/comment';
import CommentList from './comment-list';
import IconButton from '@/components/@extended/IconButton';

// third-party
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// redux
import { useDispatch } from '@/redux/store';
import { setLocalComment } from '@/redux/slices/comment';

export interface ICommentProps {
  team: ITeam | undefined;
  comments: IComment[] | null;
  case: ICase | null;
}

export default function Comment({ team, comments, case: selectedCase }: ICommentProps) {
  const dispatch = useDispatch();
  const [ableToEdit, setAbleToEdit] = useState<boolean>(false);

  type InitialValueType = {
    newComment: string;
    comments: IComment[] | null;
    ableToEdits: boolean[];
  };

  const initialValues: InitialValueType = {
    newComment: '',
    comments: comments,
    ableToEdits: [],
  };

  const validationSchema = Yup.object().shape({
    newComment: Yup.string().required('Please input comment'),
    comments: Yup.array().required(),
    ableToEdits: Yup.array().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const { values, setValues, setFieldValue, errors, touched } = formik;

  useEffect(() => {
    if (comments) {
      setValues({ ...values, comments: comments, ableToEdits: comments.map((_) => false) });
    }
  }, [comments]);

  const handleChangeComment = (comment: string, id: number) => {
    let tempValues: InitialValueType = JSON.parse(JSON.stringify(values));
    const index = tempValues.comments?.findIndex((_comment) => _comment.id == id);
    if (index != undefined && index != -1 && tempValues.comments) {
      tempValues.comments[index].comment = comment;
    }
    setValues({ ...tempValues });
  };

  const handleChangeEdit = (ableToEdit: boolean, id: number) => {
    let tempValues: InitialValueType = JSON.parse(JSON.stringify(values));
    const index = tempValues.comments?.findIndex((_comment) => _comment.id == id);
    if (index != undefined && index != -1 && tempValues.comments) {
      tempValues.ableToEdits[index] = ableToEdit;
    }
    setValues({ ...tempValues });
  };

  const handleClickSave = () => {
    setAbleToEdit(!ableToEdit);
    // Todo: Should add to save updated data in local
    if (selectedCase && values.comments) {
      const payload: ILocalComment[] = values.comments.map((comment) => ({
        id: comment.id,
        author: comment.author.id,
        case: Number(selectedCase.id),
        comment: comment.comment,
      }));
      dispatch(setLocalComment(payload));
    }
  };

  const handleAddComment = () => {
    let tempValues: InitialValueType = JSON.parse(JSON.stringify(values));
    if (selectedCase && selectedCase?.authority && values.newComment) {
      tempValues.comments?.push({
        id: -1,
        author: selectedCase?.authority,
        case: selectedCase,
        comment: values.newComment,
        createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
        updatedAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
      });
    }
    setValues({ ...tempValues, newComment: '' });
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

        <CommentList
          comments={values.comments}
          ableToEdits={values.ableToEdits}
          canEditFromParent={ableToEdit}
          onChangeEdit={handleChangeEdit}
          onChangeComment={handleChangeComment}
        />

        <Stack direction="row" alignItems="center" sx={{ px: { xs: 2, md: 4 } }} spacing={1}>
          <TextField
            fullWidth
            placeholder="Type Comment Here"
            disabled={!ableToEdit}
            value={values.newComment}
            onChange={(event) => setFieldValue('newComment', event.target.value)}
          />

          <IconButton
            onClick={handleAddComment}
            disabled={!ableToEdit}
            color={touched.newComment && errors && !!errors.newComment ? 'error' : 'primary'}
          >
            <SendOutlined />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
