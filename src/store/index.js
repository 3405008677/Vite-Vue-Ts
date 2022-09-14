import app from "./modules/app";
import user from "./modules/user";

import { createPinia } from "pinia";
const pinia = createPinia();
export default pinia;

const appStore = app(pinia),
  userStore = user(pinia);

export { appStore, userStore };