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
    const accessToken = data.access_token;

    localStorage.setItem('accessToken', accessToken);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/auth/jwt/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
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

export const getUser = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateUser = async ({password, email, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher}) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({password, email, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher})
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createCourse = async ({ id, name, teacher_id }) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/course/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ id, name, teacher_id })
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getCourse = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/course/`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createTask = async ({ course_id, name, text, language }) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/tasks/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ course_id, name, text, language })
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}