import { JSX } from 'react';
import { TitlePage } from '../pages/title';
import { ProjectsPage } from '../pages/projects';
import { ProjectPage } from '../pages/project';
import { ProjectForm } from '../pages/project-form';
import { CyclePage } from '../pages/cycle';
import { CycleForm } from '../pages/cycle-form';
import { TalkPage } from '../pages/talk';
import { NotFoundPage } from '../pages/not-found';
import { Dashboard } from '../remotes/dashboard';

export interface IRoute {
  name?: string;
  path: string;
  Component: (...args: any[]) => JSX.Element;
  subroutes?: IRoute[];
}

export const flattenSubroutes = (routes: IRoute[]): IRoute[] => {
  return routes.reduce((acc: IRoute[], current: IRoute) => {
    const newRoute: IRoute = { ...current }; // Создаем копию текущего объекта

    if (newRoute.subroutes) {
      const flattenedSubroutes = flattenSubroutes(newRoute.subroutes);
      newRoute.subroutes = undefined; // Обнуляем ссылку на вложенные подмаршруты
      acc.push(newRoute, ...flattenedSubroutes);
    } else {
      acc.push(newRoute);
    }

    return acc;
  }, []);
};

export const routes: IRoute[] = [
  {
    // главная
    path: '/',
    Component: TitlePage,
  },
  {
    name: 'проекты',
    path: '/projects',
    Component: ProjectsPage,
  },
  // создать новый проект
  {
    path: '/projects/add',
    Component: ProjectForm,
  },
  {
    // конкретный проект
    path: '/projects/:id',
    Component: ProjectPage,
  },
  {
    // редактировать проект
    path: '/projects/:id/edit',
    Component: ProjectForm,
  },
  {
    // конкретный цикл
    path: '/projects/:projectId/cycles/:id',
    Component: CyclePage,
  },
  {
    // создать новый цикл
    path: '/projects/:projectId/cycles/add',
    Component: CycleForm,
  },
  {
    // редактирование цикла
    path: '/projects/:projectId/cycles/:id/edit',
    Component: CycleForm,
  },
  {
    // конкретная беседа
    path: '/projects/:projectId/cycles/:cycleId/talks/:id',
    Component: TalkPage,
  },
  {
    name: 'библиотека',
    path: '/library',
    Component: () => <div>библиотека</div>,
  },
  {
    name: 'теория',
    path: '/theory',
    Component: () => <div>теория</div>,
    subroutes: [
      {
        name: 'Метафизика',
        path: '/theory/one',
        Component: () => <div>Метафизика</div>,
      },
      {
        name: 'Ещё что-то',
        path: '/theory/two',
        Component: () => <div>Ещё что-то</div>,
      },
      {
        name: 'Ещё что-то подлиннее тут',
        path: '/theory/three',
        Component: () => <div>Ещё что-то подлиннее для теста</div>,
      },
      {
        name: 'Ещё что-то подлиннее здесь',
        path: '/theory/four',
        Component: () => <div>Ещё что-то подлиннее для теста</div>,
      },
    ],
  },
  {
    name: 'откровение',
    path: '/revelation',
    Component: () => <div>откровение</div>,
  },
  {
    name: 'о нас',
    path: '/about-us',
    Component: () => <div>о нас</div>,
  },

  /* remotes */
  {
    // dashboard
    path: '/dash',
    Component: Dashboard,
  },

  /* 404 */
  {
    path: '*',
    Component: NotFoundPage,
  },
];
