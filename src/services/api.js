function getBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return 'http://localhost:8080/api';
}

const BASE_URL = getBaseUrl();

async function request(path, options) {
  if (!options) {
    options = {};
  }

  options.headers = { 'Content-Type': 'application/json' };

  const res = await fetch(BASE_URL + path, options);

  let body = null;
  try {
    body = await res.json();
  } catch (err) {
    body = null;
  }

  if (!res.ok) {
    let message = 'Something went wrong. Please try again.';
    if (body && body.message) {
      message = body.message;
    }
    throw new Error(message);
  }

  return body;
}

export default request;