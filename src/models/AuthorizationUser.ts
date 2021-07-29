interface AuthorizationUser {
  email: string;
  id: string;
  jwtToken: string;
  name: string;
  roles: string[];
}

export default AuthorizationUser;