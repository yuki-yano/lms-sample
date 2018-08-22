# Mock using Devise for LMS account system

## Overview

It is a mock of account system implemented with Devise.
Mail authentication sign-up and mail invitation etc. are implemented.

**Mail is not actually sent, it is saved in a file and opened in the browser.**

## Technology Stack

- Backend

  - Ruby v2.5.1
  - Rails API v5.2.1
  - devise_token_auth
  - devise_invitable

- Frontend
  - Node v10.9.0
  - TypeScript v3.0
  - React v16

## Setup

### Rails

```text
$ bundle install
$ bin/rails db:ridgepole:migrate
$ bin/rails server
```

### webpack-dev-server

```text
$ yarn install
$ yarn run watch
```

### MySQL

```text
$ docker-compose up
```

### Frontend ScreenShot

![frontend](./doc/images/frontend.png 'frontend')

## API List

**`$ bin/rails routes` is wrong**

### Sign Up

#### URL

`POST http://localhost:3000/api/auth`

#### Params

```json
{
  "name": "string",
  "nickname": "string",
  "email": "string of mail format",
  "password": "string of 8 or more characters",
  "confirm_success_url": "string, URL to redirect after authentication"
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "provider": "email",
    "uid": "email address",
    "allow_password_change": false,
    "name": "string",
    "nickname": "string",
    "email": "email address",
    "created_at": "DateTime",
    "updated_at": "DateTime"
  }
}
```

### Sign In

#### URL

`POST http://localhost:3000/api/auth/sign_in`

#### Params

```json
{
  "email": "mail address",
  "password": "string"
}
```

#### Response

- Header

```
access-token: access token
client: iRve141DIHyB09fAHPfzfw
uid: yuki_yano@dwango.co.jp
...
```

> The client is responsible for keeping track of the changing tokens.
> https://github.com/lynndylanhurley/devise_token_auth/blob/master/lib/generators/devise_token_auth/templates/devise_token_auth.rb#L4

- Body

```json
{
  "data": {
    "id": 1,
    "email": "mail address",
    "provider": "email",
    "uid": "mail address",
    "allow_password_change": false,
    "name": "string",
    "nickname": "string"
  }
}
```

### Edit User

#### URL

`PUT http://localhost:3000/api/auth`

#### Params

- Header

Use information at signin

```text
access-token: access token
client: client
uid: mail address
```

- Body

```
{
  "name": "new name",
  "nickname": "new nickname",
  "email": "new mail address"
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "id": "number",
    "email": "new mail address",
    "name": "new name",
    "nickname": "new nickname",
    "provider": "email",
    "uid": "new mail address",
    "allow_password_change": false,
    "created_at": "DateTime",
    "updated_at": "DateTime"
  }
}
```

### Invite User

#### URL

`POST http://localhost:3000/api/auth/invitation`

#### Params

- Header

```text
access-token: access token
client: client
uid: mail address
```

- Body

```json
{
  "email": "mail address of invited user",
  "invitation_token": "string",
  "provider": "email"
}
```

### Sign up from invitation

#### URL

`PATCH http://localhost:3000/api/auth/invitation`

#### Params

```json
{
  "invitation_token": "The token included in the invitation mail URL",
  "password": "string",
  "password_confirmation": "same password",
  "name": "string",
  "nickname": "string"
}
```

#### Response

```json
{
  "success": {
    "name": "name",
    "nickname": "nickname",
    "id": "number",
    "email": "mail address",
    "provider": "email",
    "uid": "mail address",
    "allow_password_change": false,
    "created_at": "DateTime",
    "updated_at": "DateTime"
  }
}
```
