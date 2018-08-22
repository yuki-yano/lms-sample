import * as React from "react"

export default class extends React.Component {
  componentDidMount() {
    localStorage.setItem("access-token", "")
    localStorage.setItem("client", "")
    localStorage.setItem("uid", "")
    location.href = "http://localhost:8080/"
  }

    render() {
      return <p>SignOut</p>
    }
}
