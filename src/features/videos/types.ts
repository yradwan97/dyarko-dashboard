import { Filter } from "types/filter";
import { User } from "features/users/types";
import { Like } from "features/videos/likes/types";
import { PaymentOption } from "features/properties";

export type Video = {
  _id: string;
  video_name: string;
  description: string;
  title: string;
  user?: User;
  thumbnail?: string;
  comments?: number;
  like?: Like;
  views?: number;
  video?: File;
  payment_option?: PaymentOption;
};

export interface VideosFilter extends Filter {
  pinned?: boolean;
  comments?: string;
  title?: string;
}
