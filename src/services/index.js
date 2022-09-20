import axios from 'axios'
import $router from '@/router'

let Service = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 1000,
});

Service.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + Auth.getToken();
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => {
    console.log("Interceptor", response);
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      Auth.logout();
      $router.go();
    }
  }
);

// sve za postove
let Posts = {
  Comments: {
    async add(postId, comment) {
      await Service.post(`/posts/${postId}/comments/`, comment);
    },
    async delete(postId, commentId) {
      await Service.delete(`/posts/${postId}/comments/${commentId}`);
    },
  },
  add(post) {
    return Service.post("/posts", post);
  },
  async getOne(id) {
    let response = await Service.get(`/posts/${id}`);

    let doc = response.data;

    return {
      id: doc._id,
      url: doc.source,
      email: doc.createdBy,
      title: doc.title,
      description: doc.description,
      posted_at: Number(doc.postedAt),
      comments: (doc.comments || []).map((c) => {
        c.id = c._id;
        delete c._id;
        return c;
      }),
    };
  },
  async getAll(searchTerm) {
    let options = {};

    if (searchTerm) {
      options.params = {
        _any: searchTerm,
      };
    }

    let response = await Service.get("/posts", options);
    return response.data.map((doc) => {
      return {
        id: doc._id,
        url: doc.source,
        email: doc.createdBy,
        title: doc.title,
        description: doc.description,
        posted_at: Number(doc.postedAt),
      };
    });
  },
};

let Signup = {
  async signup(username, password) {
    let response = await Service.post("/user", {
      username: username,
      password: password,
    });
  },
};

let Auth = {
  async login(username, password) {
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });
    let user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },

  logout() {
    localStorage.removeItem("user");
  },

  getToken() {
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    }
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  authenticated() {
    let user = Auth.getUser();
    if (user && user.username) {
      return true;
    }
    return false;
  },
  state: {
    get user() {
      return Auth.getUser();
    },
    get username() {
      return Auth.getUser().username;
    },
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Service, Signup, Posts, Auth }; // exportamo Service za ručne pozive ili Posts za metode.
