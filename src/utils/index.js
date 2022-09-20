import { isObject } from "lodash";

const lazyRoute = (confirm) =>
  confirm
    ? (file) => () => import("@/views/" + file + ".vue")
    : (file) => require("@/views/" + file + ".vue").default;
export { lazyRoute };
