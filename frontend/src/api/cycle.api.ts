import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { TCycle } from './models';
import { URL } from './constants';

const CONTEXT = 'cycles';

export const fetchCycle = async (id: string) => {
  const res = await fetch(`${URL}/${CONTEXT}/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const cycle: TCycle = await res.json();
  return cycle;
};

export const fetchCycles = async () => {
  const res = await fetch(`${URL}/${CONTEXT}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const cycles: TCycle[] = await res.json();
  return cycles;
};

export interface ICycleBody {
  title: string;
  projectId?: string; // required when editing
  description?: string;
}

export const addCycle = async (body: ICycleBody) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const res = await fetch(`${URL}/${CONTEXT}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const project: TCycle = await res.json();
  return project;
};

export const editCycle = async (id: string, body: ICycleBody) => {
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
  const cycle: TCycle = await res.json();
  return cycle;
};

export const deleteCycle = async (id: string) => {
  const res = await fetch(`${URL}/${CONTEXT}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const cycle: TCycle = await res.json();
  return cycle;
};

/* hooks */

export const useFetchCycles = () => {
  return useQuery({ queryKey: ['cycles'], queryFn: fetchCycles });
};

export const useFetchCycle = (id?: string) => {
  return useQuery({
    queryKey: ['cycle', id],
    queryFn: () => fetchCycle(id),
    enabled: !!id,
  });
};

export const useAddCycle = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (body: ICycleBody) => addCycle(body),
    onSuccess,
  });
};

export const useEditCycle = (id: string, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (body: ICycleBody) => editCycle(id, body),
    onSuccess,
  });
};

export const useDeleteCycle = (projectId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCycle(id),
    onSuccess: (_, id: string) => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });

      onSuccess && onSuccess();
    },
  });
};
