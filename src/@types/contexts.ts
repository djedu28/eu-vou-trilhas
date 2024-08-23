import { IEditorData, IUserData } from '@/@types/data-settings'

export interface IContextData {
  user: IUserData,
  cardData: IEditorData | null
  handleLogin: () => void
  handleLogout: () => void
}
