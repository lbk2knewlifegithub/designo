export interface AddCommentDTO {
  parent_id: number | null;
  replying_to: string | null;
  content: string;
}
