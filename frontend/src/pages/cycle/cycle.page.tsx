import styled from 'styled-components';
import { CirclePlus } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import { Page } from '../../components/page/page.component';
import { Card } from '../../ui/card';
import { RoundedButton } from '../../ui/rounded-button';
import { useFetchCycle } from '../../api/cycle.api';
import { useFetchProject } from '../../api/project.api';
import { useIsAdmin } from '../../hooks/auth';
import { sliceText, sliceUrl } from '../../utils/strings';

const StyledCard = styled(Card)`
  width: 800px;
  height: 100px;

  h3 {
    margin: 0 0 8px 0;
  }
`;

export const CyclePage = () => {
  const { id, projectId } = useParams();
  const isAdmin = useIsAdmin();

  const { data, isLoading, error } = useFetchCycle(id);
  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: projectError,
  } = useFetchProject(projectId);

  const { pathname } = useLocation();

  return (
    <Page
      title={data?.title}
      description={data?.description}
      drawer={{
        title: projectData?.title,
        to: sliceUrl(pathname, 2),
        items: projectData?.cycles?.map((cycle) => ({
          title: cycle.title,
          to: `${pathname.substring(0, pathname.lastIndexOf('/'))}/${cycle.id}`,
          selected: id === cycle.id,
        })),
      }}
      menu={
        isAdmin && (
          <RoundedButton to='/projects/add' title='Создать новый проект'>
            <CirclePlus />
          </RoundedButton>
        )
      }
    >
      {error && <span>Не удалось загрузить циклы</span>}
      {data?.talks?.map(({ id, title, description }) => (
        <StyledCard title={title} to={`${pathname}/talks/${id}`}>
          {sliceText({ text: description, symbols: 270 })}
        </StyledCard>
      ))}
    </Page>
  );
};
