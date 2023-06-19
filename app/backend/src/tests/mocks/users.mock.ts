const logins = {
  validLogin: {
    email: 'userUser@email.com',
    password: 'senhaUser'
  },
  invalidLogin: {
    withoutAnEmailField: {
      password: 'senhaUser',
    },
    withoutAPasswordField: {
      email: 'userUser@email.com',
    },
    passwordFieldLessThanSixDigits: {
      password: '12345',
      email: 'userUser@email.com',
    }
  }
}

const users = {
  userAdmim: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  userUser: {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
  },
}

export default {
  logins,
  users,
};