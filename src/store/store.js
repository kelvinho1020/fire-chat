import { createStore } from "vuex";
import auth from "../store/auth";
import messageCollection from "../store/messageCollection";

export default createStore({
	modules: { auth, messageCollection },
});
