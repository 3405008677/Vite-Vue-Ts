const httpsRE = /^https:\/\//;

export function createProxy(list) {
  const ret = {};
  list = JSON.parse(list)
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
