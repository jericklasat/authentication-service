export default interface _IActiveRefreshTokenRepository {
  create: (userId: string, refreshToken: string) => void
}