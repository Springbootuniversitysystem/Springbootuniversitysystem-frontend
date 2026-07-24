import request from './api';

export function registerLearner(formData) {
  return request('/learners/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

/*
export function loginLearner(credentials) {
  return request('/learners/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}*/

export async function loginLearner(credentials) {
  const response = await request('/learners/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  localStorage.setItem("token", response.data.token);

  return response;
}