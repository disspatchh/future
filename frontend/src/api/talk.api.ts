import { useQuery, useMutation } from '@tanstack/react-query';
import { TTalk } from './models';
import { URL } from './constants';

interface ITalkBody {
  title?: string;
  description?: string;
  content?: any;
}

const CONTEXT = 'talks';

export const fetchTalk = async (id: string) => {
  const res = await fetch(`${URL}/${CONTEXT}/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const talk: TTalk = await res.json();
  return talk;
};

export const fetchTalks = async () => {
  const res = await fetch(`${URL}/${CONTEXT}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const talks: TTalk[] = await res.json();
  return talks;
};

export const editTalk = async (id: string, body: ITalkBody) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const res = await fetch(`${URL}/${CONTEXT}/${id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const talk: TTalk = await res.json();
  return talk;
};

/* hooks */

export const useFetchTalks = () => {
  return useQuery({ queryKey: ['talks'], queryFn: fetchTalks });
};

export const useFetchTalk = (id?: string) => {
  if (!id) {
    throw new Error('project id was not provided');
  }

  return useQuery({
    queryKey: ['talk', id],
    queryFn: () => fetchTalk(id),
  });
};

export const useEditTalk = (id: string, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (body: ITalkBody) => editTalk(id, body),
    onSuccess,
  });
};
