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
    async add(comment) {
      await Service.post(`/comments/`, comment);
    },
    async getAllForPost(postId) {
      await Service.post(`/comments/${postId}`, comment);
    },
    async delete(commentId) {
      await Service.delete(`/comments/${commentId}`);
    },
  },
  add(post) {
    return Service.post("/posts", post);
  },
  async getOne(id) {
    let response = await Service.get(`/selectedrecipe/${id}`);

    let doc = response.data;

    return {
      id: doc._id,
      imageData: doc.imageData,
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
        imageData: doc.imageData,
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
  account() {
    let user = Auth.getUser()
    if (user) {
      return user
    }
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
