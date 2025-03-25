import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Page } from '../../components/page';
import { Input } from '../../ui/input';
import { TextArea } from '../../ui/text-area';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import {
  useAddProject,
  useFetchProject,
  IProjectBody,
  useEditProject,
} from '../../api/project.api';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

type ProjectData = {
  id: string;
  title: string;
  description?: string;
};

interface IProjectFormProps {}

export const ProjectForm = (props: IProjectFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    mutate: addProject,
    isLoading,
    error,
  } = useAddProject({
    onSuccess: () => navigate('/projects'),
  });

  const {
    mutate: editProject,
    isLoading: isEditProjectLoading,
    error: editProjectError,
  } = useEditProject(id, {
    onSuccess: () => navigate('/projects'),
  });

  const {
    data,
    isLoading: isLoadingProject,
    error: projectError,
  } = useFetchProject(id);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

  const isEdit = !!data;

  const submit = async (data: FieldValues) => {
    const body = data as IProjectBody;
    if (isEdit) {
      editProject({ id, body });
    } else {
      addProject(body);
    }
  };

  return (
    <Page
      title={isEdit ? data.title : 'Новый проект'}
      direction='column'
      align='center'
      menu={null}
    >
      <Form onSubmit={handleSubmit((data) => submit(data))}>
        <Input
          {...register('title', { required: true })}
          error={errors?.title?.type as string}
          placeholder='Название'
        />

        <TextArea {...register('description')} placeholder='Описание' />

        <ButtonContainer>
          <Button
            type='button'
            design='secondary'
            onClick={() => navigate('/projects')}
          >
            Отмена
          </Button>
          <Button type='submit'>{isEdit ? 'Редактировать' : 'Создать'}</Button>
        </ButtonContainer>
      </Form>
    </Page>
  );
};
