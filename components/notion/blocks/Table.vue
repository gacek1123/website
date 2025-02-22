<script setup lang="ts">
import { type BlockObjectResponse, type ListBlockChildrenResponse, type TableBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { isFullBlock } from "@notionhq/client";
import { isType } from '~/lib/notion';
import Text from "./Text.vue";

const props = defineProps<{ table: TableBlockObjectResponse }>();

const { data } = useFetch('/api/notion/blocks/' + props.table.id, {
    transform: (input: ListBlockChildrenResponse) => {
        return input.results.filter(isFullBlock).filter(res => isType(res, 'table_row'))
    }
})
</script>

<template>
    <Table v-if="data">
        <TableHeader v-if="props.table.table.has_row_header">
            <TableRow>
                <TableHead v-for="cell in data[0].table_row.cells">
                    <Text v-for="text in cell" :text="text"></Text>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="row in data.slice(1)">
                <TableCell v-for="cell in row.table_row.cells">
                    <Text v-for="text in cell" :text="text"></Text>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

</template>