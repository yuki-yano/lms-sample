import * as React from "react"
import { Formik, FormikProps, Form, Field } from "formik"
import styled from "styled-components"
import axios from "axios"

interface IFormValues {
  email: string
  password: string
}

export default () => (
  <div>
    <h2>SignIn</h2>
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        nickname: ""
      }}
      onSubmit={(values: IFormValues, { setStatus }: any) => {
        axios
          .post("http://localhost:3000/api/auth/sign_in", {
            email: values.email,
            password: values.password
          })
          .then(response => {
            localStorage.setItem(
              "access-token",
              response.headers["access-token"]
            )
            localStorage.setItem("client", response.headers["client"])
            localStorage.setItem("uid", response.headers["uid"])
            setStatus({
              message: "SignIn succeeded",
              errorMessage: ""
            })
            location.reload()
          })
          .catch(_ => {
            setStatus({
              message: "",
              errorMessage: "SignIn Failed"
            })
          })
      }}
      render={({ status }: FormikProps<IFormValues>) => (
        <div>
          {status &&
            status.message !== "" && <Message>{status.message}</Message>}
          {status &&
            status.errorMessage !== "" && (
              <ErrorMessage>{status.errorMessage}</ErrorMessage>
            )}
          <Form>
            <Label>
              Email:
              <Input type="text" name="email" />
            </Label>
            <Label>
              Password:
              <Input type="password" name="password" />
            </Label>
            <Submit
              type="submit"
              value="SignIn"
              disabled={status && status.message ? true : false}
            />
          </Form>
        </div>
      )}
    />
  </div>
)

const Label = styled.label`
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  display: block;
`

const Input = styled(Field)`
  font-size: 1rem;
  padding: 0.2rem;
`

const Submit = styled.input`
  font-size: 1rem;
  padding: 0.2rem;
`

const Message = styled.p``

const ErrorMessage = styled.p`
  color: red;
`
