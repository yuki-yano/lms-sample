import axios from "axios"
import * as React from "react"

import Users from "./Users"

import { IUser } from "types/user"

interface IUsers {
  users: Array<IUser>
}

export default class Home extends React.Component<{}, IUsers> {
  constructor(props: IUsers) {
    super(props)

    this.state = {
      users: []
    }

    this.fetchUsers()
  }

  public render() {
    return (
      <div>
        <h2>Users</h2>
        <Users users={this.state.users} />
      </div>
    )
  }

  private fetchUsers = (): void => {
    axios.get("http://localhost:3000/api/users").then(response => {
      const data: Array<any> = JSON.parse(response.data.users)

      const state: IUsers = {
        users: data.map(user => {
          return {
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            invitationSentAt: user.invitation_sent_at,
            invitationAcceptedAt: user.invitation_accepted_at
          }
        })
      }

      this.setState(state)
    })
  }
}
