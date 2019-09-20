# aws-cognito-attributes

## AUTHENTICATION DEMO
## Authentication with AWS Cognito using Vue.js
### This is a boilerplate project for Vuejs applications using AWS cognito

### Live Demo:
http://auth-cognito-attributes.s3-website-ap-southeast-1.amazonaws.com

let me know if you have some questions:
http://sonabstudios.com/

### Features
1. Sign Up
   - [x] register with email and password
   - [x] Confirmation code sent to email
   - [ ] Resend confirmation code to email -- ongoing development for v1.1
   - [x] Confirmation code verification
   - [ ] Custom workflow (via lambda)
   - [ ] SMS verification option
2. Sign In
   - [x] Authentication for verified users
   - [x] Auto sign on browser refresh or reopen
   - [ ] Refresh token periodically
   - [ ] Custom workflow (via lambda)
3. Sign Out
   - [x] invalidate session
4. Password Update
   - [x] reset or change password
5. Attributes (User Profile)
   - [x] default: name, email, phone, etc.
   - [x] custom: custom addresses, personal information, etc.
   - [ ] profile picture: crop, resized and upload to S3 -- ongoing development for v1.1
   - [ ] phone number attribute with verification
6. Access Control
   - [ ] API Gateway
7. User Pool
   - [ ] Administrators
   - [ ] User Management -- ongoing development for v1.1
   - [ ] User Groups
   - [ ] User Migration


## Build Setup

add src/config.js file to contain the following:
const poolData = { UserPoolId: <UserPoolId>, ClientId: <ClientId> }
export default {
  poolData
}

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
