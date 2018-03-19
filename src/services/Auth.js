import axios from 'axios';

export function LoginService(params) {
  return axios.post(
    'http://localhost:4000/api/v1/oauth/token',
    params
  );
}

export function SignUpService(params) {
  return axios.post(
    'http://localhost:4000/api/v1/users',
    params
  );
}

export function LogoutService(params) {
  return axios.post(
    'http://localhost:4000/api/v1/oauth/revoke',
    params
  );
}

export function ConfirmationService(params) {
  return axios.get(
    'http://localhost:4000/api/v1/users/confirmation?confirmation_token=' +
    params['confirmation_token']
  );
}

