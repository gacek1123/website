import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition && to.name !== 'blog-slug') {
            return savedPosition;
        } else {
            return {
                top: 0
            };
        }
    },
    scrollBehaviorType: 'auto',
};