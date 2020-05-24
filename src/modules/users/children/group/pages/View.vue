<style lang="scss">
    .detail{
        line-height: 1.5rem;
        dt{
            float: left;
            width: 100px;
        }
        dd{
            overflow: hidden;
        }
    }
</style>

<template>
    <div class="users-group-view">
        <el-dialog
            title="查看"
            width="60%"
            :visible="true"
            :before-close="handleClose">
            <dl class="detail" v-for="(value, key) in formData" :key="key">
                <dt>{{ key }}: </dt>
                <dd>{{ value }}</dd>
            </dl>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'users-group-view',
    data() {
        return {
            formData: {
                address: '',
                date: '',
                id: 0,
                name: '',
                type: 0
            }
        };
    },
    watch: {
        detail: {
            handler(nv, ov) {
                console.log('nv', nv);
                Object.assign(this.formData, nv);
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters('users/group', [
            'detail'
        ])
    },
    created() {
        this.$store.dispatch('users/group/findOne', {
            groupId: this.$route.params.groupId
        });
    },
    methods: {
        handleClose() {
            this.$router.push({ name: 'users-group' });
        },
        handleCancel() {
            this.$router.push({ name: 'users-group' });
        },
        handleSubmit() {
            console.log('submit');
        }
    }
};
</script>
