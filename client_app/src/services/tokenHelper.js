// services/tokenHelper.js
import { getAccessToken, setAccessToken, refreshAccessToken } from './api';
import { jwtDecode } from 'jwt-decode';

let refreshPromise = null;

export async function ensureAccessToken() {
  let token = getAccessToken();
  if (!token) return null;

  let exp;
  try {
    exp = jwtDecode(token).exp;
  } catch {
    logout();
    return null;
  }

  const now = Math.floor(Date.now() / 1000);

  // التوكن مازال صالح
  if (exp - now > 120) {
    return token;
  }

  // لو فيه refresh شغال → نستنو فيه
  if (refreshPromise) {
    return refreshPromise;
  }

  // نبدأ refresh جديد (مرة وحدة فقط)
  refreshPromise = refreshAccessToken()
    .then(res => {
      const newToken = res.data.accessToken;
      setAccessToken(newToken, res.data.refreshToken);
      refreshPromise = null;
      return newToken;
    })
    .catch(() => {
      refreshPromise = null;
      logout();
      return null;
    });

  return refreshPromise;
}

function logout() {
  setAccessToken(null, null);
  window.location.href = '/';
}
