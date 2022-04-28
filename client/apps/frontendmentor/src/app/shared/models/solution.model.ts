export interface Solution {
  solution_id: number;
  title: string;
  repositoryUrl: string;
  liveSiteUrl: string;
  tags: string[];
  isPrivate?: boolean;
  questions: string;
  createdAt: string;
  likes: number;
  comments: number;
  bookmarks: number;
}
