export interface AddressRes {
    success: boolean;
    data: {
      count: number;
      perPage: number;
      prevPage: number;
      nextPage: number;
      totalPage: number;
      data: AddressSingle[];
    };
    message: string;
}
export interface AddressSingle {
    id: number;
    customerId: boolean;
    name: string;
    phone: string;
    email: string;
    address: string;
    division: string;
    city: string;
    area: string;
    additional: string;
    type: string;
    default: string;
    created_at: string;
    updated_at: string;
}
export interface AddressSingleRes {
    success: boolean;
    data: AddressSingle;
    message: string;
}
export interface AddressAdd {
    name: string;
    phone: string;
    email: string;
    address: string;
    division: string;
    city: string;
    area: string;
    additional: string;
    type: string;
    default: string;
}


export interface DivisionRes {
  success: boolean;
  data: Division[];
  message: string;
};

export interface DistrictRes {
  success: boolean;
  data: Division[];
  message: string;
};

export interface AreaRes {
  success: boolean;
  data: Area[];
  message: string;
};

export interface Division {
  id: number;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
  created_at: string;
  updated_at: string;
};

export interface Area {
  id: number;
  district_id: number;
  name: string;
  bn_name: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingCostRes {
  success: boolean;
  data: number;
  message: string;
}
export interface ParamShippingCost {
  city: string;
  area: string;
}


