<template>
    <div class="vue-design-breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs"
                :key="index"
            >{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'vue-design-breadcrumb',
    data() {
        return {
            breadcrumbs: []
        };
    },
    watch: {
        $route: {
            handler(to) {
                this.updateBreadcrumb(to);
            },
            immediate: true
        }
    },
    methods: {
        updateBreadcrumb(to) {
            const { matched } = to;
            const breadcrumbs = [];
            matched.forEach((item) => {
                breadcrumbs.push({
                    name: item.name,
                    label: item.meta.label
                });
            });
            this.breadcrumbs = breadcrumbs;
        }
    }
};
</script>

<style lang="scss">
    .vue-design-breadcrumb{
        width: 100%;
        padding: 13px 16px;
        .el-breadcrumb__inner{
            color: #eee;
        }
        .el-breadcrumb__item:last-child{
            .el-breadcrumb__inner{
                color: #fff;
            }
        }
    }
</style>
