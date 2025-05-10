export enum NotificationDest {
  PROPOSAL = 'PROPOSAL',
  CONTRACT = 'CONTRACT',
  COMMUNITY_PROFILE = 'COMMUNITY_PROFILE',
  COMMUNITY_JOBS_AND_TALENTS = 'COMMUNITY_JOBS_AND_TALENTS',
  COMMUNITY_POSTS = 'COMMUNITY_POSTS',
  COMMUNITY_SETTINGS = 'COMMUNITY_SETTINGS',
  CONTRACT_COMMUNITY = 'CONTRACT_COMMUNITY',
}

export interface NotificationResponseDTO {
  notificationId: string;
  content: string;
  read: boolean;
  type: NotificationDest;
  routeId: string;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PaginatedNotificationResponse {
  content: NotificationResponseDTO[];
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

export interface NotificationWebSocketDTO {
  notification: NotificationResponseDTO;
  newNotificationsCount: number;
}
