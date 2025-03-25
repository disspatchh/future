import { useCallback, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Page } from '../../components/page';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { TextArea } from '../../ui/text-area';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import { useFetchProjects } from '../../api/project.api';
import {
  ICycleBody,
  useAddCycle,
  useFetchCycle,
  useEditCycle,
} from '../../api/cycle.api';

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

export const CycleForm = (props: IProjectFormProps) => {
  const { projectId, id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const {
    data: projects,
    isLoading: isProjectsLoading,
    error: errorProjects,
  } = useFetchProjects();

  const { mutate, isLoading, error } = useAddCycle(() =>
    navigate(`/projects/${projectId}`)
  );

  const { mutate: mutateCycle, error: editCycleError } = useEditCycle(id, () =>
    navigate(`/projects/${projectId}`)
  );

  // TODO: fetch cycle
  const {
    data: cycle,
    isLoading: isCycleLoading,
    error: cycleError,
  } = useFetchCycle(id);

  useEffect(() => {
    if (cycle && projects) {
      reset({
        projectId: cycle.projectId,
        title: cycle.title,
        description: cycle.description,
      });
    } else {
      reset({
        projectId,
      });
    }
  }, [cycle]);

  const isEdit = !!cycle;

  const submit = async (data: FieldValues) => {
    const body = data as ICycleBody;
    if (isEdit) {
      mutateCycle(body);
    } else {
      mutate(body);
    }
  };

  return (
    <Page
      title={isEdit ? cycle.title : 'Новый цикл'}
      direction='column'
      align='center'
      menu={null}
    >
      <Form onSubmit={handleSubmit((data) => submit(data))}>
        <Select
          name='projectId'
          required
          control={control}
          placeholder='Проект'
          options={projects?.map(({ id, title }) => ({
            label: title,
            value: id,
          }))}
          //   error={errors?.projectId?.type as string}
        />

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
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            Отмена
          </Button>
          <Button type='submit'>{isEdit ? 'Редактировать' : 'Создать'}</Button>
        </ButtonContainer>
      </Form>
    </Page>
  );
};
