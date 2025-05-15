import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('tokens')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('tokens')).token}`;
  }

  return req;
});

export const createPost = (dataURL) => {
    API.post("http://localhost:5000/posts/createpost", dataURL)
    .then((response) => {
      console.log(response.status, response.data);
    });
};

export const updatePost = (dataURL, id) => {

    API.patch(`http://localhost:5000/posts/updatepost/${id}`, dataURL);
};

export const likePost = (id) => {
  API.patch(`http://localhost:5000/posts/${id}/likepost`).then((response) => {
    console.log(response.status, response.data);
  });
};

export const deletePost = (id) => {
  API.delete(`http://localhost:5000/posts/${id}`).then((response) => {
    console.log(response.status, response.data);
  });
};

export const signin = (formData) => API.post('/user/signin', formData);

export const signup =(formData) => API.post('/user/signup', formData);

