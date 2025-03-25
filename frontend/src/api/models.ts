export type TTalk = {
  id: string;
  title: string;
  description?: string;
  content?: string;
};

export type TCycle = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  talks?: TTalk[];
};

export interface TProject {
  id: string;
  title: string;
  description: string;
  cycles?: TCycle[];
}
