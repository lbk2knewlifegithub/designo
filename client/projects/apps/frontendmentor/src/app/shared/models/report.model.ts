export enum IssueLevel {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface Issue {
  title: string;
  level: IssueLevel;
  context: string;
  help?: string;
}

export interface Report {
  report_id: number;
  a11y: Issue[];
  htmlValidator: Issue[];
  createdAt: string;
}
