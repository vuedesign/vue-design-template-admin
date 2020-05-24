<style lang="scss">
</style>

<template>
    <div class="operate-activity-view">
        <el-dialog
            title="查看"
            width="60%"
            :visible="true"
            :before-close="handleClose">
            operate-activity-view
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'operate-activity-view',
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
        handleClose(done) {
            this.$router.push({ name: 'operate-activity' });
        },
        handleCancel() {
            this.$router.push({ name: 'operate-activity' });
        },
        handleSubmit() {
            console.log('submit');
        }
    }
};
</script>
