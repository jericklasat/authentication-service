export interface _TGenerate {
  generate: (payload: _TGeneratePayload, expiration?: string) => string;
}

export interface _TGeneratePayload {
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[];
}