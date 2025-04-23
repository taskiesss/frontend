export interface CommunityPostsResponse {
  content: PostResponse[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export interface PostResponse {
  postID: string;
  postOwner: Owner;
  postTitle: string;
  postContent: string;
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
  date: string;
}
export interface Owner {
  id: string;
  name: string;
  profilePicture: string;
  role: string;
}
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface CommentResponse {
  content: {
    postOwner: {
      id: string;
      name: string;
      profilePicture: string;
      role: string;
    };
    date: string;
    commentId: string;
    content: string;
  }[];
  last: boolean;
}
