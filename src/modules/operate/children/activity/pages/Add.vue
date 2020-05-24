<template>
    <el-dialog
        title="提示"
        :visible="true"
        width="800px"
        class="operate-activity-add"
        :before-close="handleClose">
        <el-form
            ref="addForm"
            :model="formData"
            :rules="constants.rules"
            :size="FORM.SIZE"
            :label-width="FORM.LABEL_WIDTH">
            <el-form-item label="缩略图">
                <el-upload
                    class="image-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                    <img v-if="formData.thumb" :src="formData.thumb" class="image">
                    <i v-else class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动名称">
                <el-input v-model="formData.name" ></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formData.region"  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="12">
                    <el-date-picker type="date"  placeholder="选择日期" v-model="formData.date" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="1">
                    <span class="line"></span>
                </el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time"  placeholder="选择时间" v-model="formData.time" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch  v-model="formData.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="formData.type" >
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="formData.resource" >
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="formData.desc"  />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel" :size="FORM.SIZE" >取 消</el-button>
            <el-button type="primary" @click="handleSubmit('addForm')" :size="FORM.SIZE">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import * as constants from '../constants';

export default {
    name: 'operate-activity-add',
    data() {
        return {
            constants,
            formData: {
                thumb: '',
                name: '',
                region: '',
                date: '',
                time: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    computed: {
        ...mapGetters('operate/activity', {
        })
    },
    created() {
        this.$store.dispatch('operate/activity/findOne', {
            activityId: 2
        });
    },
    methods: {
        handleClose(done) {
            this.$router.push({ name: 'operate-activity' });
        },
        handleCancel() {
            this.$router.push({ name: 'operate-activity' });
        },
        handleImageSuccess(res, file) {
            this.formData.thumb = URL.createObjectURL(file.raw);
        },
        beforeImageUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                return true;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .line{
        display: inline-block;
        text-align: center;
        height: 1px;
    }
</style>
