<style lang="scss">
</style>

<template>
    <div class="users-group-view">
        <el-dialog
            title="查看"
            width="60%"
            :visible="true"
            :before-close="handleClose">
            users-group-view
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
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    computed: {
        ...mapGetters('users/group', {
        })
    },
    created() {
        this.$store.dispatch('users/group/findOne', {
            groupId: 2
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
