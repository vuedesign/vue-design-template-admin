<template>
    <div class="operate-activity-list">
        <vue-design-filter>
            <ul class="left">
                <li><el-button type="primary" :size="FORM.SIZE"  @click="handleAddClick">新增</el-button></li>
            </ul>
            <ul class="right">
                <li>
                    <el-select style="width: 110px" v-model="region" placeholder="请选择" :size="FORM.SIZE">
                        <el-option
                            v-for="(item, index) in regionList"
                            :label="item.label"
                            :value="item.value"
                            :key="index"
                        />
                    </el-select>
                </li>
                <li><el-input v-model="name" type="text" :size="FORM.SIZE"  /></li>
            </ul>
        </vue-design-filter>
        <el-table
            :size="FORM.SIZE"
            :data="list"
            style="width: 100%; border-radius: 3px;">
            <el-table-column label="缩略图" min-width="84" >
                <template slot-scope="scope">
                    <span class="thumb"><img :src="scope.row.thumb" /></span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="活动名称" min-width="160" />
            <el-table-column prop="region" label="活动区域" min-width="80">
                <template slot-scope="scope">
                    {{ regionMap[scope.row.region] }}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="活动时间" min-width="180">
                <template slot-scope="scope">
                    {{ scope.row.date }} {{ scope.row.time }}
                </template>
            </el-table-column>
            <el-table-column prop="delivery" label="即时配送">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.delivery" disabled />
                </template>
            </el-table-column>
            <el-table-column prop="type" label="活动性质" min-width="260">
                <template slot-scope="scope">
                    {{ scope.row.type.map(item => typeMap[item]).join(',') }}
                </template>
            </el-table-column>
            <el-table-column prop="resource" label="特殊资源"></el-table-column>
            <el-table-column prop="desc" label="活动形式"></el-table-column>
            <el-table-column fixed="right" label="操作" width="140" align="center">
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
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                :current-page="filters.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="filters.size"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </vue-design-pagination>
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { filtersCommit } from 'vue-design-core';
import {
    regionList,
    regionMap,
    typeList,
    typeMap
} from '../constants';

export default {
    name: 'activity-list',
    data() {
        return {
            regionList,
            regionMap,
            typeList,
            typeMap,
            params: this.$route.params
        };
    },
    computed: {
        ...mapGetters('operate/activity', [
            'filters',
            'list',
            'total'
        ]),
        name: filtersCommit('operate/activity', 'name'),
        region: filtersCommit('operate/activity', 'region')
    },
    watch: {
        filters: {
            handler(nv, ov) {
                console.log(nv, ov);
                this.$store.dispatch('operate/activity/find');
            },
            deep: true
        }
    },
    created() {
        this.$store.commit('users/group/FILTERS', {
            page: Number(this.params.page)
        });
        this.$store.dispatch('operate/activity/find');
    },
    methods: {
        handleAddClick() {
            this.$router.push({ name: 'operate-activity-add' });
        },
        handleEditClick({ id }) {
            this.$router.push({ name: 'operate-activity-edit', params: { id } });
        },
        handleDelClick({ id }) {
            console.log(id);
            // this.$router.push({ name: 'operate-activity-update' });
        },
        handleViewClick({ id }) {
            this.$router.push({ name: 'operate-activity-view', params: { id } });
        },
        handleSizeChange(size) {
            const page = 1;
            this.$store.commit('operate/activity/FILTERS', { size, page });
            this.$router.push({
                name: 'operate-activity',
                params: {
                    page
                }
            });
        },
        handlePageChange(page) {
            this.$store.commit('operate/activity/FILTERS', { page });
            this.$router.push({
                name: 'operate-activity',
                params: {
                    page
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .thumb{
        display: block;
        img{
            display: block;
        }
    }
</style>
