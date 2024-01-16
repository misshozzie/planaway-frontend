// //tbc not quite sure about this part....

// const BASE_URL = "http://localhost:3000/users";
//import apis from"../
import {createAsyncThunk} from "@reduxjs/toolkit";

/*=== USER APIS ===*/
const userLogin = createAsyncThunk("Users Login", async (body) => apis.authLogin(body));
const getProfile = createAsyncThunk("Get Profile", async (id) => apis.getProfile(id));

const reduxApis = {userLogin, getProfile}

export default reduxApis;