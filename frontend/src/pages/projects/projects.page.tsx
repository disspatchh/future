import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CirclePlus, Pen, Trash2 } from 'lucide-react';
import { Page, Title } from '../../components/page/page.component';
import { Button } from '../../ui/button';
import { RoundedButton } from '../../ui/rounded-button';
import { IconButton } from '../../ui/icon-button';
import { Card } from '../../ui/card';
import { useFetchProjects, useDeleteProject } from '../../api/project.api';
import { Links } from '../../components/links';
import { sliceText } from '../../utils/strings';
import { useIsAdmin } from '../../hooks/auth';
import { PopConfirm } from '../../ui/pop-confirm';
import Svg from '../../assets/icons/placeholder.svg?react';

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  position: relative;
  width: 270px;
  height: 290px;
  text-align: center;
`;

export const ProjectsPage = () => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const { data: projects, isLoading, error } = useFetchProjects();
  const {
    mutate: deleteProject,
    isLoading: isLoadingDeleteProject,
    error: errorDeleteProject,
  } = useDeleteProject();

  /* modal */
  const [projectToRemove, setProjectToRemove] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    if (isOpen && projectToRemove) setProjectToRemove(null);
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  const onSubmit = useCallback(() => {
    deleteProject(projectToRemove);
  }, [projectToRemove, deleteProject]);

  return (
    <Page
      title={
        <TitleBox>
          <Title>Проекты</Title>
          <Button style={{ marginLeft: '25px' }}>Поддержать</Button>
        </TitleBox>
      }
      menu={
        isAdmin && (
          <RoundedButton to='/projects/add' title='Создать новый проект'>
            <CirclePlus />
          </RoundedButton>
        )
      }
    >
      <PopConfirm
        question='Вы уверены, что хотите удалить проект?'
        tip='Удалённый проект восстановлению не подлежит'
        isOpen={isOpen}
        onCancel={toggleOpen}
        onSubmit={onSubmit}
      />
      {error && <span>Не удалось загрузить проекты</span>}
      {projects?.map(({ id, title, description }) => (
        <StyledCard
          key={id}
          to={`/projects/${id}`}
          title={title}
          prefix={<Svg />}
          menu={
            <>
              <IconButton
                onClick={() => {
                  setProjectToRemove(id);
                  toggleOpen();
                }}
                color='danger'
              >
                <Trash2 />
              </IconButton>
              <IconButton onClick={() => navigate(`/projects/${id}/edit`)}>
                <Pen />
              </IconButton>
            </>
          }
        >
          {sliceText({ text: description, symbols: 125 })}
        </StyledCard>
      ))}
      <Links />
    </Page>
  );
};
