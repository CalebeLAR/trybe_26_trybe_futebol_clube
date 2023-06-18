const logins = {
  validLogin: {
    email: 'userUser@email.com',
    password: 'senhaUser'
  },
  loginWithOutEmail: {
    email: '',
    password: 'senhaUser',
  },
  loginWithOutPassword: {
    email: 'userUser@email.com',
    password: '',
  }
}

const users = {
  userAdmim: {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  },
  userUser: {
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