export interface Discussion {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewDiscussion {
  title: string;
  content: string;
}
