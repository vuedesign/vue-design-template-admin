<style lang="scss">
</style>

<template>
    <div class="users-group-add">
        <el-dialog
            title="提示"
            :visible="true"
            width="60%"
            :before-close="handleClose">
            <el-form ref="form" :model="formData" :label-width="FORM.LABEL_WIDTH" :size="FORM.SIZE">
                <el-form-item label="活动名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formData.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="formData.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="formData.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="formData.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel" :size="FORM.SIZE">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" :size="FORM.SIZE">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'users-group-add',
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
