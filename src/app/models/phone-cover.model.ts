export interface PhoneCover {
  id: number;
  type: string;
  price: number;
  gender: string;
  phoneModel: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface PhoneCoverRes {
    success: true;
    data: {
        count: number;
        perPage: number;
        prevPage: number;
        nextPage: number;
        totalPage: number;
        data: PhoneCover[];
    };
    message: string;
}
