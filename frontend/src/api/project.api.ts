import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TProject } from './models';
import { URL } from './constants';

const CONTEXT = 'projects';

export const fetchProject = async (id: string) => {
  const res = await fetch(`${URL}/${CONTEXT}/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const project: TProject = await res.json();
  return project;
};

export const fetchProjects = async () => {
  const res = await fetch(`${URL}/${CONTEXT}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const projects: TProject[] = await res.json();
  return projects;
};

export interface IProjectBody {
  title: string;
  description?: string;
}

export const addProject = async (body: IProjectBody) => {
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
  const project: TProject = await res.json();
  return project;
};

export interface IEditProjectBody {
  id: string;
  body: IProjectBody;
}

export const editProject = async ({ id, body }: IEditProjectBody) => {
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
  const project: TProject = await res.json();
  return project;
};

export const deleteProject = async (id: string) => {
  const res = await fetch(`${URL}/${CONTEXT}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const project: TProject = await res.json();
  return project;
};

/* Hooks */

export const useFetchProjects = () => {
  return useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
};

export const useFetchProject = (id?: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id),
    enabled: !!id,
  });
};

interface IUseAddProjectOptions {
  onSuccess?: () => void;
}

export const useAddProject = ({ onSuccess }: IUseAddProjectOptions) => {
  return useMutation({
    mutationFn: (body: IProjectBody) => addProject(body),
    onSuccess,
  });
};

interface IUseEditProjectOptions {
  onSuccess?: () => void;
}

export const useEditProject = (
  id: string,
  { onSuccess }: IUseEditProjectOptions
) => {
  return useMutation({
    mutationFn: (body: IEditProjectBody) => editProject(body),
    onSuccess,
  });
};

export const useDeleteProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_, id: string) => {
      // refetch the projects
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      onSuccess && onSuccess();
    },
  });
};
