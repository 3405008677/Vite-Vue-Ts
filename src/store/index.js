import app from "./modules/app";
import user from "./modules/user";

import { createPinia, mapState } from "pinia";
import { computed } from "vue";
const pinia = createPinia();
export default pinia;

const appStore = app(pinia),
  userStore = user(pinia);

const myMapState = (store,state) => {
  const storeStateFns = mapState(store, state);
  console.log(storeStateFns.sidebar());
  const storeState = {};
  Object.keys(storeStateFns).forEach((fnKet) => {
    const fn = storeStateFns[fnKet].bind(store);
    storeState[fnKet] = computed(fn);
  });
  return storeState;
};

export { appStore, userStore, myMapState };
