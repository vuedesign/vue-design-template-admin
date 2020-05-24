
<template>
    <div class="users-group-list">
        <vue-design-filter>
            <ul class="left">
                <li>
                    <el-button type="primary" :size="FORM.SIZE" @click="handleAddClick">新增</el-button>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <el-input type="text" v-model="filters.name" :size="FORM.SIZE"></el-input>
                </li>
                <li>
                    <el-select style="width: 110px" v-model="filters.type" placeholder="请选择" :size="FORM.SIZE">
                        <el-option
                            v-for="(item, index) in typeList"
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                        />
                    </el-select>
                </li>
            </ul>
        </vue-design-filter>
        <el-table :data="data" style="width: 100%;">
            <el-table-column prop="name" label="用户组" width="180">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="180">
                <template slot-scope="scope">{{ typeMap[scope.row.type] }}</template>
            </el-table-column>
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="handleViewClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
            <div slot="empty" class="table-empty"></div>
        </el-table>
        <vue-design-pagination>
            <pagination
                @current-change="handleCurrentChange"
                :current-page="filters.page"
                :total="total"
            ></pagination>
        </vue-design-pagination>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
    typeList,
    typeMap
} from '../constants';

export default {
    name: 'users-group',
    data() {
        return {
            typeList,
            typeMap,
            filters: {
                page: Number(this.$route.params.page),
                name: '',
                type: -1
            }
        };
    },
    computed: {
        ...mapGetters('users/group', [
            'data',
            'total',
            'loading'
        ])
    },
    watch: {
        filters: {
            handler(nv, ov) {
                console.log('nv', nv, ov);
                if (ov && nv.page === ov.page) {
                    Object.assign(nv, { page: 1 });
                }
                this.$store.dispatch('users/group/find', nv);
            },
            deep: true
        }
    },
    created() {
        this.$store.dispatch('users/group/find', this.filters);
    },
    mounted() {
        // console.log('list data:', this.data);
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'users-group-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'users-group-edit', params: { id } });
        },
        handleDelClick({ id }) {
            // this.$router.push({ name: 'users-group-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'users-group-view', params: { id } });
        },
        handleCurrentChange(page) {
            this.filters.page = page;
            this.$router.push({
                name: 'users-group',
                params: {
                    page
                }
            });
        }
    }
};
</script>

<style lang="scss">

</style>
