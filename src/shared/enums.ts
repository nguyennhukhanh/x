export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  tokenExpired: number;
};

export type JwtRefreshPayloadType = {
  sessionId: string;
  iat: number;
  exp: number;
};

export enum AuthProvidersEnum {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum SwaggerOperationEnum {
  PUBLIC = 'Public',
  SUPER_ADMIN = 'Router for super admin',
  ADMIN = 'Router for admin',
  USER = 'Router for user',
}

export enum Events {
  PollingError = 'polling_error',
  NewChatMembers = 'new_chat_members',
  LeftChatMember = 'left_chat_member',
  Message = 'message',
}
