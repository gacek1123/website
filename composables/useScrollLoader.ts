import { ref, watch, onMounted } from 'vue';

interface UseScrollLoaderOptions {
    rootMargin?: string;
    threshold?: number;
    once?: boolean;
}

interface UseScrollLoaderReturn {
    loadMoreTrigger: Ref<HTMLDivElement | null>;
    setupObserver: (target: HTMLDivElement) => void;
    stopObserver: () => void;
}

export function useScrollLoader(
    fetchMoreData: () => Promise<any>,
    shouldFetchMore: () => boolean,
    options: UseScrollLoaderOptions = {}
): UseScrollLoaderReturn {
    const loadMoreTrigger = ref<HTMLDivElement | null>(null);
    let observer: IntersectionObserver | null = null;

    const setupObserver = (target: HTMLDivElement) => {
        if (!shouldFetchMore()) return;

        observer = new IntersectionObserver(async (entries, obs) => {
            if (entries[0].isIntersecting) {
                await fetchMoreData();
            }

            if (!shouldFetchMore()) {
                obs.disconnect();
            }
        }, {
            rootMargin: options.rootMargin || "200px",
            threshold: options.threshold || 0.1,
        });

        observer.observe(target);
    };

    const stopObserver = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    };

    onMounted(() => {
        watch(loadMoreTrigger, (el) => {
            if (el) setupObserver(el);
        }, { once: options.once || false });
    });

    return { loadMoreTrigger, setupObserver, stopObserver };
}
