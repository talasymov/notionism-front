<template>
    <div>
        <my-autocomplete
                v-model="selected"
                :placeholder="label"
                :label="label"
                :options="items"
                value-name="id"/>
    </div>
</template>

<script>
import MyAutocomplete from "~/components/UI/MyAutocomplete.vue";

export default {
    components: {MyAutocomplete},
    props: {
        modelValue: {},
        label: {},
    },
    data: () => ({
        items: []
    }),
    computed: {
        selected: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        }
    },
    methods: {
        async fetchList() {
            this.items = (await useBaseFetch(`integrations/notion/database/list`)).items.map((item) => {
                return {
                    id: item.id,
                    name: item.title
                }
            })
        }
    },
    async mounted() {
        await this.fetchList()
    }
}
</script>

<style scoped>

</style>