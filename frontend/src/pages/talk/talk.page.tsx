import { useState, useCallback, useEffect, memo } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { Pen, Check } from 'lucide-react';
import { Page } from '../../components/page/page.component';
import { useFetchTalk } from '../../api/talk.api';
import { useFetchCycle } from '../../api/cycle.api';
import { sliceUrl } from '../../utils/strings';
import { ContentViewer } from '../../components/content-viewer';
import { Button } from '../../ui/button';
import { useIsAdmin } from '../../hooks/auth';
import { Title } from '../../components/page/page.component';
import { Editor } from '../../ui/editor';
import { IconButton } from '../../ui/icon-button';
import { Input } from '../../ui/input';
import TgSvg from '../../assets/icons/tg.svg?react';

const STitle = styled(Title)`
  & > *:last-child {
    margin-left: 12px;
  }
`;

export const TalkPage = memo(() => {
  const { id, cycleId } = useParams();
  const isAdmin = useIsAdmin();
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const [editorState, setEditorState] = useState(null);
  const { data, isLoading, error } = useFetchTalk(id);
  console.log('data:', data);
  const {
    data: cycleData,
    isLoading: isCycleDataLoading,
    error: cycleError,
  } = useFetchCycle(cycleId);

  useEffect(() => {
    setEditorState(cycleData);
  }, [setEditorState, cycleData]);

  const { pathname } = useLocation();
  const onChange = useCallback((value: string) => {
    console.log('value', value);
  }, []);

  return (
    <Page
      title={
        <STitle>
          {data?.title}
          <IconButton onClick={toggleEdit} type='contained'>
            {isEdit ? <Check /> : <Pen />}
          </IconButton>
        </STitle>
      }
      description={data?.description}
      direction='column'
      drawer={{
        title: cycleData?.title,
        to: sliceUrl(pathname, 2),
        items: cycleData?.talks?.map((talk) => ({
          title: talk.title,
          to: `${pathname.substring(0, pathname.lastIndexOf('/'))}/${talk.id}`,
          selected: id === talk.id,
        })),
      }}
    >
      {error && <span>Не удалось загрузить беседу</span>}
      {isEdit ? (
        <Editor state={data?.content} onChange={onChange} />
      ) : (
        <ContentViewer content={data?.content} />
      )}
      {isEdit ? (
        <Input placeholder='Ссылка на обсуждение в telegram' />
      ) : (
        <Button icon={<TgSvg />}>обсудить</Button>
      )}
    </Page>
  );
});
