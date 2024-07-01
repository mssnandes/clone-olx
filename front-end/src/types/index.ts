export interface ILogin {
  name?: string;
  email: string;
  password: string;
  state?: string;
  token?: string;
}

export interface StateListItem {
  id: number;
  name: string;
}
export interface CategoryList {
  id: number;
  name: string;
  img: string;
  slug: string;
}
export interface OptionsQueryAds {
  sort?: string;
  offset?: number;
  limit?: number;
  q?: string;
  category?: string;
  state?: string;
  token?: string;
}

export interface AdInfoList {
  id?: number;
  title?: string;
  price?: number;
  priceNegotiable?: boolean;
  description?: string;
  dateCreated?: string;
  views?: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  userInfo?: {
    name: string;
    email: string;
  };
  images?: []
}

export interface PropsAdItem {
  id: number;
  title: string;
  state: string;
  price: number;
  priceNegotiable: boolean;
  image: string;
  dateCreated: string;
}

export interface CarouselProps {
  adInfo: AdInfoList;
}

export interface StateList {
  id: string;
  name: string;
}

export interface UserInfo {
  name: string;
  email: string;
  state: string;
  image: string;
}