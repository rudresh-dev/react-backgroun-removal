import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  photo: null,
  processedPhoto: null,
  presetImage: null,
  finalImageUrl: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setProcessedPhoto: (state, action) => {
      state.processedPhoto = action.payload;
    },
    setPresetImage: (state, action) => {
      state.presetImage = action.payload;
    },
    setFinalImageUrl: (state, action) => {
      state.finalImageUrl = action.payload;
    },
  },
});

export const { setName, setPhoto, setProcessedPhoto, setPresetImage, setFinalImageUrl } = appSlice.actions;

export default appSlice.reducer;
