import * as React from "react"
import { Formik, FormikProps, Form, Field } from "formik"
import styled from "styled-components"
import axios from "axios"

interface IFormValues {
  email: string
}

export default () => (
  <div>
    <h2>Invite</h2>
    <Formik
      initialValues={{
        email: ""
      }}
      onSubmit={(values: IFormValues, { setStatus }: any) => {
        const instance = axios.create({
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            uid: localStorage.getItem("uid")
          }
        })

        instance
          .post("http://localhost:3000/api/auth/invitation", {
            email: values.email,
            provider: "email",
            inviatation_token: "11111111"
          })
          .then(response => {
            console.info(response)
            setStatus({
              message: `Sent an invitation email to ${values.email}`,
              errorMessage: ""
            })
          })
          .catch(_ => {
            setStatus({
              message: "",
              errorMessage: "Faild to Invite"
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
            <Submit
              type="submit"
              value="Invite"
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
