import apis from "../services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

/*=== USER APIS ===*/

const userLogin = createAsyncThunk("Users Login", async (body) => apis.authLogin(body));
const userSignup = createAsyncThunk("Users SignUp", async (body) => apis.authSignup(body));
const getProfile = createAsyncThunk("Get Profile", async (id) => apis.getProfile(id));

/*=== WALLET REDUX APIS ===*/
// fetching data by ID, manage loading, success, error
const getWallet = createAsyncThunk(
  "Get Wallet Data",
  async (id) => await apis.getWallet(id)
);


const reduxApis = {userSignup, userLogin, getProfile, getWallet}

export default reduxApis;
