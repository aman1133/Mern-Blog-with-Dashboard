import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk for creating a Tag
export const createTag = createAsyncThunk(
  "tags/createTag",
  async ({ title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/tags",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle any error from the API
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for deleting a Tag
export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async ({ categoryId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/tags/delete",
        { id: categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle any error from the API
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for fetching all tags
export const fetchTags = createAsyncThunk(
  "tags/fetchtags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tags");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for fetching tags by authenticated user
export const fetchTagsByUser = createAsyncThunk(
  "tags/fetchTagsByUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tags/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for editing a tag
export const editTag = createAsyncThunk(
  "tags/editTag",
  async ({ id, title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/tags/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Initial state for categories slice
const initialState = {
  tags: [],
  loading: false,
  error: null,
  success: null,
};

// Create the categories slice
// Create the categories slice
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    // Add other synchronous actions if needed, e.g., clearing errors
    resetSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Tag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Add the new category to the state
        state.success = "Category created successfully!";
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
      })
      // Delete Tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg.categoryId // Filter out the deleted tag
        );
        state.success = "Category deleted successfully!";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete tag";
      })
      // Fetch all tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tag";
      })
      // Fetch Tag by Auth User
      .addCase(fetchTagsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTagsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user tags";
      })
      // Edit Category
      .addCase(editTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTag.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the tag in the state
        }
        state.success = "tag updated successfully!";
      })
      .addCase(editTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit tag";
      });
  },
});

// Export the actions
export const { resetSuccess } = tagsSlice.actions;

// Export the reducer
export default tagsSlice.reducer;
