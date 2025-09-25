export interface Exercise {
  id: string;
  title: string;
  description: string;
  component: string;
  mdxPath: string;
}

export interface Section {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: string;
  sections: Section[];
  locked?: boolean;
}

export interface CourseStructure {
  modules: Module[];
}