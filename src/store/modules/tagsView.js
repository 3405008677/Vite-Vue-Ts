import { defineStore } from "pinia";

export default defineStore("tagsView", {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: [],
    };
  },
  actions: {
    addView(view) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    },
  },
});
