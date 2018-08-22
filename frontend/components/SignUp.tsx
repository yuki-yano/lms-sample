import * as React from "react"
import { Formik, FormikProps, Form, Field } from "formik"
import styled from "styled-components"
import axios from "axios"

interface IFormValues {
  email: string
  password: string
  name: string
  nickname: string
}

export default () => (
  <div>
    <h2>SignUp</h2>
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        nickname: ""
      }}
      onSubmit={(values: IFormValues, { setStatus }: any) => {
        axios
          .post("http://localhost:3000/api/auth", {
            email: values.email,
            password: values.password,
            name: values.name,
            nickname: values.nickname,
            confirm_success_url: "http://localhost:3000/comfirmed.html"
          })
          .then(_ => {
            setStatus({
              message: `Send mail to ${values.email}.`,
              errorMessage: ""
            })
          })
          .catch(error => {
            const errorMessage = `${error.response.status} ${
              error.response.statusText
            }. ${error.response.data.errors.full_messages.join(". ")}`
            setStatus({
              message: "",
              errorMessage: errorMessage
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
