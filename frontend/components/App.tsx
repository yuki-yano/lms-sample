import * as React from "react"
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import styled from "styled-components"

import Home from "./Home"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Invite from "./Invite"
import SignOut from "./SignOut"
import Accept from "./Accept"

export default () => (
  <Container>
    <h1>Frontend Test</h1>
    {localStorage.getItem("access-token") && (
      <div>Access-Token: {localStorage.getItem("access-token")}</div>
    )}
    {localStorage.getItem("client") && (
      <div>Client: {localStorage.getItem("client")}</div>
    )}
    {localStorage.getItem("uid") && (
      <div>UID: {localStorage.getItem("uid")}</div>
    )}
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/invite">Invite</Link>
          </li>
          <li>
            <Link to="/signout">SignOut</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/invite" component={Invite} />
        <Route path="/signout" component={SignOut} />
        <Route path="/accept" component={Accept} />
      </div>
    </Router>
  </Container>
)

const Container = styled.div`
  width: 100%;
  height: 100%;
`
