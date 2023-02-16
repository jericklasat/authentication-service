export interface _TTokenService {
  generate: (payload: _TGeneratePayload, expiration?: string) => string;
  invalidate: (refreshToken: string) => Promise<boolean>;
  save: (userId: string, refreshToken: string) => void;
  refresh: (refreshToken?: string) => Promise<null | {
    accessToken?: string,
    refreshToken?: string,
    errorMessage?: string,
  }>;
}

export interface _TGeneratePayload {
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[];
  type?: string;
}