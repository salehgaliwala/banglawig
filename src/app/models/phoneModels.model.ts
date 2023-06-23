export interface PhoneModel {
  id: number;
  name: string;
  type: string;
  mainImage: string;
  created_at: string;
  updated_at: string;
};

export interface PhoneModelRes {
  success: boolean;
  data: {
    count: number;
    perPage: number;
    prevPage: number;
    nextPage: number;
    totalPage: number;
    data: PhoneModel[];
  };
  message: string;
};
