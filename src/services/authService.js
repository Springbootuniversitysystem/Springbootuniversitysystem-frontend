import request from './api';

export function registerLearner(formData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export function loginLearner(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}