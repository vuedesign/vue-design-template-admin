<template>
    <div class="operate-activity-list">
        <vue-design-filter>
            <ul class="left">
                <li><el-button type="primary" :size="FORM.SIZE" @click="handleAddClick">新增</el-button></li>
            </ul>
            <ul class="right">
                <li><el-input type="text" :size="FORM.SIZE" /></li>
            </ul>
        </vue-design-filter>
        <el-table
            :size="FORM.SIZE"
            :data="data"
            style="width: 100%; border-radius: 3px;">
            <el-table-column prop="name" label="姓名" min-width="100" />
            <el-table-column prop="birthday" label="生日" min-width="120" />
            <el-table-column prop="email" label="E-mail" min-width="120" />
            <el-table-column prop="address" label="地址" min-width="180"/>
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="handleViewClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <vue-design-pagination>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </vue-design-pagination>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters('users/user', [
            'filters',
            'data',
            'total'
        ])
    },
    created() {
        this.$store.dispatch('users/user/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'users-user-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'users-user-edit', params: { id } });
        },
        handleDelClick({ id }) {
            // this.$router.push({ name: 'users-user-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'users-user-view', params: { id } });
        }
    }
};
</script>

<style lang="scss">

</style>
