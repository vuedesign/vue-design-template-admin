<template>
    <div class="vue-design-header">
        <div class="vue-design-logo">
            <h1 @click="handleLogo">VueDesign Admin</h1>
        </div>
        <div class="vue-design-header-left">
            <vue-design-breadcrumb slot="breadcrumb" />
        </div>
        <div class="vue-design-header-right">
            <ul class="vue-design-header-nav">
                <li v-for="(item, index) in menuHeader"
                    :index="item.name"
                    :key="index"
                    @click="handleHeaderNav(item, index)"
                >
                    <el-popover
                        v-if="item.children && item.children.length > 0"
                        placement="bottom"
                        width="200"
                        trigger="click">
                        <div class="vue-design-header-right-more">
                            <dl v-for="(citem, cindex) in item.children"
                                :key="cindex"
                            >
                                <dt><vue-design-iconfont :type="citem.icon" /></dt>
                                <dd>{{ citem.label }}</dd>
                            </dl>
                        </div>
                        <span class="menu-btn" slot="reference"><vue-design-iconfont type="menu-more" /></span>
                    </el-popover>
                    <el-tooltip
                        v-else
                        class="item"
                        effect="dark"
                        :content="item.label"
                        placement="bottom"
                    >
                        <span class="menu-btn">
                            <vue-design-iconfont :type="item.icon" />
                        </span>
                    </el-tooltip>
                </li>
                <li>
                    <el-popover
                        placement="bottom"
                        title="消息"
                        width="200"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        <span class="menu-btn" slot="reference"><vue-design-iconfont type="message" /></span>
                    </el-popover>
                </li>
            </ul>
            <div class="vue-design-user">
                <el-popover
                    placement="bottom"
                    width="240"
                    trigger="click"
                >
                    <span class="avatar" slot="reference"></span>
                    <div class="vue-design-user-popover">
                        <dl>
                            <dt><span class="avatar-big"></span></dt>
                            <dd>
                                <h4>n.see</h4>
                                <p>n.see@qq.com</p>
                            </dd>
                        </dl>
                        <ul>
                            <li class="setting" @click="handleSetting">
                                <vue-design-iconfont type="setting" />
                                <span>设置</span>
                            </li>
                            <li class="exit" @click="handleExit">
                                <vue-design-iconfont type="exit" />
                                <span>退出</span>
                            </li>
                        </ul>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from 'vue-design-core';
import VueDesignBreadcrumb from './VueDesignBreadcrumb';

export default {
    name: 'vue-design-header',
    components: {
        VueDesignBreadcrumb
    },
    data() {
        return {
            menuHeader: config('menuHeader.json')
        };
    },
    methods: {
        handleExit() {
            this.$message('click exit');
        },
        handleSetting() {
            this.$message('click setting');
        },
        handleLogo() {
            this.$router.push({
                path: '/'
            });
        },
        handleHeaderNav(item, index) {
            this.$message('click on more item', item, index);
        }
    }
};
</script>

<style lang="scss">
    @import "~@assets/styles/variables.scss";
    .vue-design-header{
        height: 100%;
        background-color: #409EFF;
    }
    .vue-design-logo{
        height: 100%;
        float: left;
        text-align: center;
        min-width: 200px;
        h1{
            margin: 0;
            display: inline-block;
            font-size: 20px;
            padding: 9px 16px 0 16px;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
        }
    }
    .vue-design-header-nav,
    .vue-design-header-left ul{
        float: left;
        line-height: $header-bar-size;
        height: $header-bar-size;
        li{
            cursor: pointer;
            float: left;
            padding: 0 11px;
        }
    }
    .vue-design-user{
        float: right;
        margin-left: 10px;
        padding: 6px 6px 6px 16px;
        cursor: pointer;
        > span{
            display: block;
            height: 28px;
            line-height: 28px;
        };
        .avatar{
            display: block;
            vertical-align: middle;
            width: 28px;
            height: 28px;
            background-color: #ddd;
            border-radius: 50%;
            cursor: pointer;
        }
        .name{
            height: 24px;
            line-height: 24px;
            color: #fff;
            margin-left: 4px;
        }
    }
    .vue-design-user-popover{
        dl,
        ul{
            &:after{
                content: '';
                display: block;
                clear: both;
                width: 100%;
                height: 0;
            }
        }
        dt{
            float: left;
            margin-right: 10px;
            .avatar-big{
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        dd{
            h4{
                font-size: 18px;
            }
            p{
                color: #999;
            }
        }
        ul{
            padding-top: 10px;
            border-top: 1px solid #f9f9f9;
            margin-top: 10px;
        }
        li{
            float: left;
            cursor: pointer;
            i,
            span{
                display: inline-block;
                vertical-align: middle;
                color: #999;
            }
            &:hover{
                i,
                span{
                    color: #409EFF;
                }
            }
            &.exit{
                float: right;
            }
            &.setting{
                float: left;
            }
        }
    }
    .vue-design-header-right-more{
        &:after{
            content: '';
            display: block;
            width: 100%;
            height: 0;
            clear: both;
        }
        dl{
            width: 50%;
            float: left;
            cursor: pointer;
            text-align: center;
            border: 1px solid transparent;
            padding: 10px 0;
            border-radius: 3px;
            &:hover{
                border: 1px solid #eee;
            }
        }
        dt{
            i.iconfont{
                font-size: 32px;
            }
        }
    }
    .vue-design-header-right{
        float: right;
        line-height: 40px;
        height: 40px;
        li{
            float: left;
            padding: 0 11px;
            span.menu-btn{
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                width: 26px;
                height: 26px;
                line-height: 26px;
                border-radius: 50%;
                text-align: center;
                margin-left: 0;
                & > i{
                    display: block;
                    vertical-align: middle;
                    color: #fff;
                }
                &:hover{
                    background-color: #2c8eff;
                }
            }
        }
    }
    .vue-design-header-left{
        float: left;
    }
</style>
