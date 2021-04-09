const initialState = {
  auth: false,
  id: "",
  name: "",
  userPhoto: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      let myState = { ...state };
      myState.auth = true;
      myState.id = action.id;
      myState.name = action.name;
      myState.userPhoto = action.photo;

      return myState;
    }

    case "LOGOUT": {
      localStorage.removeItem("placesUser");
      let myState = { ...state };
      myState.auth = false;
      myState.id = "";
      myState.name = "";
      myState.userPhoto = "";
      return myState;
    }
    default:
      return state;
  }
};

export default reducer;
