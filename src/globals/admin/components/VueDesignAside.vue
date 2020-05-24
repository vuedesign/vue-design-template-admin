<template>
    <div class="vue-design-aside">
        <div class="vue-design-aside-menu">
            <el-menu
                :default-active="asideActive"
                class="vue-design-aside-menu-vertical"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
            >
                <template v-for="(item, key) in asideMenu">
                    <el-submenu
                        v-if="item.children"
                        :index="item.name"
                        :key="key"
                    >
                        <template slot="title">
                            <vue-design-iconfont :type="item.icon" />
                            <span>{{ item.label }}</span>
                        </template>
                        <el-menu-item
                            v-for="(subItem, subKey) in item.children"
                            :key="subKey"
                            :index="subItem.name">
                            <span slot="title">{{ subItem.label }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="item.name" :key="key">
                        <vue-design-iconfont :type="item.icon" />
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="btn-collapse">
            <i :class="collapseIcon" @click="handleCollapseClick"></i>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'vue-design-aside',
    data() {
        return {
            isCollapse: false
        };
    },
    computed: {
        ...mapGetters('admin', [
            'asideMenu',
            'asideActive'
        ]),
        collapseIcon() {
            return this.isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left';
        }
    },
    created() {
        this.$store.commit('admin/ASIDE_ACTIVE', this.$route.name);
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCollapseClick() {
            this.isCollapse = !this.isCollapse;
        },
        handleSelect(index) {
            this.$router.push({
                name: index,
                params: {
                    page: 1
                }
            });
        }
    }
};
</script>

<style lang="scss">
    @import "~@assets/styles/variables.scss";
    .vue-design-aside{
        height: 100%;
    }
    .vue-design-aside-menu-vertical{
        width: 200px;
        &.el-menu,
        .el-menu{
            border: 0;
            background-color: transparent;
        }
        &.el-menu--collapse{
            width: $aside-bar-size;
        }
        .el-menu-item{
            &.is-active {
                font-weight: 700;
                background-color: #dce7f3;
            }
            &:hover{
                color: #409EFF;
            }
        }
        & > .el-menu-item,
        & > .el-submenu > .el-submenu__title{
            height: $aside-bar-size;
            line-height: $aside-bar-size;
            padding: 0 11px !important;
        }
        & > .el-menu-item > .el-tooltip {
            padding: 0 10px !important;
        }
        .el-menu-item{
            height: $aside-bar-size !important;
            line-height: $aside-bar-size !important;
        }
        .el-submenu__title{
            i,
            span{
                display: inline-block;
                height: 16px;
                line-height: 16px;
            }
            span{
                padding-top: 1px;
            }
        }
    }
    .vue-design-aside-menu{
        overflow-x: hidden;
        height: 100%;
    }
    .btn-collapse{
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 32px;
        line-height: 32px;
        border-top: 1px solid #eee;
        text-align: center;
        i{
            cursor: pointer;
            color: #aaa;
        }
    }
</style>
