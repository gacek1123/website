<script setup lang="ts">
import {
    type BulletedListItemBlockObjectResponse,
    type NumberedListItemBlockObjectResponse,
    type ToDoBlockObjectResponse,

} from "@notionhq/client/build/src/api-endpoints";
import TextRenderer from "./TextRenderer.vue";
import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps<{
    list_item: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse | ToDoBlockObjectResponse
}>();

// @ts-ignore
const rich_text = props.list_item[props.list_item.type].rich_text

</script>

<template>
    <div class="mt-3 text-muted-foreground">
        <div v-if="list_item.type === 'to_do'" class="flex items-center gap-x-2">
            <Checkbox :id="list_item.id" :checked="list_item.to_do.checked"></Checkbox>
            <label :for="list_item.id" :class="{
                'line-through': list_item.to_do.checked
            }">
                <TextRenderer :text="rich_text"></TextRenderer>
            </label>
        </div>


        <div v-else class="list-item list-inside" :class="{
            'list-decimal': list_item.type === 'numbered_list_item',
        }">

            <TextRenderer :text="rich_text"></TextRenderer>
        </div>
    </div>
</template>