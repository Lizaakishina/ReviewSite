import { JWT } from './constants';
const BASE_URL = 'http://127.0.0.1';

const checkAnswer = (res) => {
  if(res.ok) {
    return res.json();
  }

  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  })
}

export const register = async ({ email, password, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher })
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const login = async ({ username, password }) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch(`${BASE_URL}/auth/jwt/login`, {
      method: 'POST',
      body: formData
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getUser = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateUser = async ({name, email}) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT)}`
      },
      body: JSON.stringify({name, email})
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
