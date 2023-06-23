export interface PageRes{
  success: boolean;
  result: Page;
  message: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
