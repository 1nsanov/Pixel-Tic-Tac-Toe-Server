export default interface IAuthUser {
  UserId: number
  Nickname: string
  Password: string
  AvatarId: number
  CountFinishedGames: number
  CountWins: number
  CountLosses: number
  Score: number
  StatusOnline: boolean
  DataRegister: string
}