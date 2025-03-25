import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CirclePlus, Trash2, Pen } from 'lucide-react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { RoundedButton } from '../../ui/rounded-button';
import { IconButton } from '../../ui/icon-button';
import { PopConfirm } from '../../ui/pop-confirm';
import { Page } from '../../components/page/page.component';
import { Card } from '../../ui/card';
import { useFetchProject, useFetchProjects } from '../../api/project.api';
import { useDeleteCycle } from '../../api/cycle.api';
import { useIsAdmin } from '../../hooks/auth';
import { sliceText } from '../../utils/strings';

const StyledCard = styled(Card)`
  width: 270px;
  height: 170px;
  text-align: center;
`;

export const ProjectPage = () => {
  const projectId = useParams()?.id;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const [cycleToRemove, setCycleToRemove] = useState(null);

  const { data: project, error } = useFetchProject(projectId);
  const { data: projects } = useFetchProjects();

  const { mutate: deleteCycle, error: errorDeleteCycle } =
    useDeleteCycle(projectId);

  /* modal */
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    if (isOpen && cycleToRemove) setCycleToRemove(null);
    setOpen(!isOpen);
  }, [isOpen, setOpen, cycleToRemove]);

  const onSubmit = useCallback(() => {
    deleteCycle(cycleToRemove);
  }, [cycleToRemove, deleteCycle]);

  return (
    <Page
      title={project?.title}
      description={project?.description}
      drawer={{
        title: 'Проекты',
        items: projects?.map((project) => ({
          title: project.title,
          to: `/projects/${project.id}`,
          selected: projectId === project.id,
        })),
      }}
      menu={
        isAdmin && (
          <RoundedButton
            to={`/projects/${projectId}/cycles/add`}
            title='Создать новый цикл'
          >
            <CirclePlus />
          </RoundedButton>
        )
      }
    >
      <PopConfirm
        question='Вы уверены, что хотите удалить цикл?'
        tip='Удалённый цикл восстановлению не подлежит'
        isOpen={isOpen}
        onCancel={toggleOpen}
        onSubmit={onSubmit}
      />
      {error && <span>Не удалось загрузить циклы</span>}
      {project?.cycles?.map(({ id, title, description }) => (
        <StyledCard
          key={id}
          title={title}
          to={`${pathname}/cycles/${id}`}
          menu={
            <>
              <IconButton
                onClick={() => {
                  setCycleToRemove(id);
                  toggleOpen();
                }}
                color='danger'
              >
                <Trash2 />
              </IconButton>
              <IconButton
                onClick={() =>
                  navigate(`/projects/${projectId}/cycles/${id}/edit`)
                }
              >
                <Pen />
              </IconButton>
            </>
          }
        >
          {sliceText({ text: description, symbols: 125 })}
        </StyledCard>
      ))}
    </Page>
  );
};
