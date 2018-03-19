import axios from 'axios';

export function LoginService(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'api/v1/oauth/token',
    params
  );
}

export function SignUpService(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'api/v1/users',
    params
  );
}

export function LogoutService(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'api/v1/oauth/revoke',
    params
  );
}

export function ConfirmationService(params) {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'api/v1/users/confirmation?confirmation_token=' +
    params['confirmation_token']
  );
}

