const {createSlice} = require('@reduxjs/toolkit');

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      // on vérifie l'existance de l'élément favoris
      const isInFavorite =
        state.findIndex(film => film.id === action.payload.id) !== -1;
      //   élément est déjà en favoris alors on le rétire, sinon on l'ajoute
      if (!isInFavorite) {
        state.push(action.payload);
      } else {
        state = state.filter(film => film.id !== action.payload.id);
        return state;
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;

export default favoritesSlice;
