import { Like } from "features/videos/likes/types";
import { User } from "features/users/types";
import { Filter } from "types/filter";

export interface VideoComment {
  _id?: string;
  like?: Like;
  comment_body: string;
  user?: User;
  video: string;
}

export interface CommentsFilter extends Filter {}
