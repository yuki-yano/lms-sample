import * as React from "react"
import styled from "styled-components"

import { IUser } from "types/user"

export default (props: Props) => {
  const { users } = props

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>email</Th>
            <Th>name</Th>
            <Th>nickname</Th>
            <Th>invitation_sent_at</Th>
            <Th>invitation_accepted_at</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.email}>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
                <Td>{user.nickname}</Td>
                <Td>{user.invitationSentAt}</Td>
                <Td>{user.invitationAcceptedAt}</Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

interface Props {
  users: Array<IUser>
}

const Table = styled.table`
  border: 1px black solid;
  border-collapse: collapse;
`

const Th = styled.th`
  border: 1px black solid;
  padding: 0.4rem;
`

const Td = styled.td`
  border: 1px black solid;
  padding: 0.4rem;
`
