import { Timestamp } from "firebase/firestore";

export interface IUser {
  username: string;
  id: string;
}
export interface Post {
  postText: string;
  userId: string;
  date: Timestamp;
  likes: string[]; //a list of users who liked the post
  postId: string;
}
export interface UserDisplayInfo {
  name: string;
}
