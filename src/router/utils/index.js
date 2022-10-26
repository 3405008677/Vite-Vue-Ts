import router from "@/router";


/**
 * 修改Url添加参数
 * url：当前路由地址
 * key：参数key
 * keyVal：参数value
 */
export const changeURL = (url, key, keyVal) => {
  let pattern = key + "=([^&]*)";
  let replaceText = key + "=" + keyVal;
  if (url.match(pattern)) {
    let tmp = "/(" + key + "=)([^&]*)/gi";
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match("[?]")) {
      return url + "&" + replaceText;
    } else {
      return url + "?" + replaceText;
    }
  }
};
