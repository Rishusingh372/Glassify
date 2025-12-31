
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../../services/authService";
import { adminLogin } from "../../services/adminService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, isAdmin = false }) => {
    if (isAdmin) {
      return await adminLogin({ email, password });
    } else {
      return await loginUser({ email, password });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data) => {
    return await signupUser(data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null, // 'user' or 'admin'
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user || action.payload.admin;
        state.token = action.payload.token;
        state.role = action.payload.user?.role || action.payload.admin?.role || 'user';
        
        // Store in localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", state.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = 'user';
        
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", 'user');
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
