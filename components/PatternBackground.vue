<template>
    <div :class="cn(
        patternBackgroundVariants({ variant, size }),
        ` ${animate ? 'move move-' + direction : ''} `,
        props.class,
    )
        ">
        <div :class="cn(
            'absolute pointer-events-none inset-0 flex items-center justify-center',
            patternBackgroundMaskVariants({ mask }),
        )
            "></div>
        <slot />
    </div>
</template>

<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";

import type { ObjectValues } from "../lib/utils";

export const PATTERN_BACKGROUND_DIRECTION = {
    Top: "top",
    Bottom: "bottom",
    Left: "left",
    Right: "right",
    TopLeft: "top-left",
    TopRight: "top-right",
    BottomLeft: "bottom-left",
    BottomRight: "bottom-right",
} as const;

export type PatternBackgroundDirection = ObjectValues<typeof PATTERN_BACKGROUND_DIRECTION>;

export interface BaseProps {
    class?: HTMLAttributes["class"];
    animate?: boolean;
    direction?: PatternBackgroundDirection;
    variant?: PatternBackgroundVariants["variant"];
    size?: PatternBackgroundVariants["size"];
    mask?: PatternBackgroundMaskVariants["mask"];
    speed?: ObjectValues<typeof PATTERN_BACKGROUND_SPEED>;
}

export { default as PatternBackground } from "./PatternBackground.vue";

export const PATTERN_BACKGROUND_VARIANT = {
    Grid: "grid",
    Dot: "dot",
    BigDot: "big-dot",
} as const;

export const PATTERN_BACKGROUND_SPEED = {
    Default: 10000,
    Slow: 25000,
    Fast: 5000,
} as const;

export const patternBackgroundVariants = cva("relative text-clip", {
    variants: {
        variant: {
            [PATTERN_BACKGROUND_VARIANT.Grid]:
                "bg-[linear-gradient(to_right,hsl(var(--foreground)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.3)_1px,transparent_1px)]",
            [PATTERN_BACKGROUND_VARIANT.Dot]:
                "bg-[radial-gradient(hsl(var(--foreground)/0.3)_1px,transparent_1px)]",
            [PATTERN_BACKGROUND_VARIANT.BigDot]:
                "bg-[radial-gradient(hsl(var(--foreground)/0.3)_3px,transparent_3px)]",
        },
        size: {
            xs: "bg-[size:8px_8px]",
            sm: "bg-[size:16px_16px]",
            md: "bg-[size:24px_24px]",
            lg: "bg-[size:32px_32px]",
        },
    },
    defaultVariants: {
        variant: "grid",
        size: "md",
    },
});

export type PatternBackgroundVariants = VariantProps<typeof patternBackgroundVariants>;

export const PATTERN_BACKGROUND_MASK = {
    Ellipse: "ellipse",
    EllipseTop: "ellipse-top",
} as const;

export const patternBackgroundMaskVariants = cva("bg-background", {
    variants: {
        mask: {
            [PATTERN_BACKGROUND_MASK.Ellipse]:
                "[mask-image:radial-gradient(ellipse_at_center,transparent,black_80%)]",
            [PATTERN_BACKGROUND_MASK.EllipseTop]:
                "[mask-image:radial-gradient(ellipse_at_top,transparent,black_80%)]",
        },
    },
    defaultVariants: {
        mask: "ellipse",
    },
});

export type PatternBackgroundMaskVariants = VariantProps<typeof patternBackgroundMaskVariants>;
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<BaseProps>(), {
    direction: () => PATTERN_BACKGROUND_DIRECTION.Top,
    variant: () => PATTERN_BACKGROUND_VARIANT.Grid,
    speed: () => PATTERN_BACKGROUND_SPEED.Default,
    size: undefined,
    mask: undefined,
});

const durationFormSpeed = computed(() => `${props.speed}ms`);
</script>

<style scoped>
@keyframes to-top {
    0% {
        background-position: 0 100%;
    }

    100% {
        background-position: 0 0;
    }
}

@keyframes to-bottom {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 100%;
    }
}

@keyframes to-right {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% 0;
    }
}

@keyframes to-left {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: 0 0;
    }
}

@keyframes to-top-right {
    0% {
        background-position: 0 100%;
    }

    100% {
        background-position: 100% 0;
    }
}

@keyframes to-top-left {
    0% {
        background-position: 100% 100%;
    }

    100% {
        background-position: 0 0;
    }
}

@keyframes to-bottom-right {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% 100%;
    }
}

@keyframes to-bottom-left {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: 0 100%;
    }
}

.move {
    animation-duration: v-bind(durationFormSpeed);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.move-top {
    animation-name: to-top;
}

.move-bottom {
    animation-name: to-bottom;
}

.move-right {
    animation-name: to-right;
}

.move-left {
    animation-name: to-left;
}

.move-top-right {
    animation-name: to-top-right;
}

.move-top-left {
    animation-name: to-top-left;
}

.move-bottom-right {
    animation-name: to-bottom-right;
}

.move-bottom-left {
    animation-name: to-bottom-left;
}
</style>