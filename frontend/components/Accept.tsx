import * as React from "react"
import { Formik, FormikProps, Form, Field } from "formik"
import axios from "axios"
import styled from "styled-components"

interface IFormValues {
  password: string
  name: string
  nickname: string
}

export default () => (
  <div>
    <h1>Invitation Entry Form</h1>
    <Formik
      initialValues={{
        password: "",
        name: "",
        nickname: ""
      }}
      onSubmit={(values: IFormValues, { setStatus }: any) => {
        const token = new URLSearchParams(location.search.slice(1)).get(
          "invitation_token"
        )
        const params = { ...values, invitation_token: token }

        console.log(params)
        axios
          .patch("http://localhost:3000/api/auth/invitation", params)
          .then(_ => {
            console.log(_)
            setStatus({
              message: "Registration is completed",
              errorMessage: ""
            })
          })
          .catch(_ => {
            setStatus({
              message: "",
              errorMessage: "Registration Failed"
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
              Password:
              <Input type="password" name="password" />
            </Label>
            <Label>
              Name:
              <Input type="text" name="name" />
            </Label>
            <Label>
              Nickname:
              <Input type="text" name="nickname" />
            </Label>
            <Submit
              type="submit"
              value="SignUp"
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
