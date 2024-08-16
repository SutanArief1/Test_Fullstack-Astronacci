// import axios from 'axios';

// // Login
// async function login(email: string, password: string) {
//   const response = await axios.post('http://localhost:3000/auth/login', {
//     email,
//     password
//   });
//   // Menyimpan token ke dalam cookie atau state
//   document.cookie = `jwt=${response.data.token}; path=/`;
//   return response.data;
// }

// // Logout
// async function logout() {
//   await axios.post('http://localhost:3000/auth/logout');
//   // Menghapus cookie
//   document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// }

// // Mendapatkan profil pengguna
// async function getProfile() {
//   const response = await axios.get('http://localhost:3000/auth/profile', {
//     headers: {
//       'Authorization': `Bearer ${getCookie('jwt')}`
//     }
//   });
//   return response.data;
// }

// // Mendapatkan cookie berdasarkan nama
// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()!.split(';').shift();
//   return null;
// }