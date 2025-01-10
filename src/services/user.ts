type User = {
  name: string
}
interface IUserService {
  getAllUser(): Promise<User[]>
}

import HttpClient from '@/utils/HttpClient'

export class UserService extends HttpClient implements IUserService {
  constructor() {
    super()
  }
  getAllUser(): Promise<User[]> {
    return this.get('/allUser')
  }
}
