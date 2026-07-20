import request from './api';

export function registerLearner(formData) {
  return request('/learners/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export function loginLearner(credentials) {
  return request('/learners/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}