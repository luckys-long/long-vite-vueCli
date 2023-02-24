<template>
  <div class="wrap">
    <MyDialog :show="isShow" :before-close="handleClosed" title="日志配置">
      <el-form :model="formData" label-width="250px">
        <el-form-item label="ini配置文件上传">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            action="#"
            :http-request="uploadIniConfig"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="ue config文件上传">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            action="#"
            :http-request="uploadConfig"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="检测海思日志文件周期(单位：毫秒)">
          <el-input
            v-model="formData.checkInterval"
            type="number"
            :min="1"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClosed">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </span>
      </template>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import MyDialog from "@/components/dialog.vue";
import { ref } from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElUpload,
  ElInput,
  ElMessage,
} from "element-plus";

const formData = ref({
  checkInterval: 1,
  uploadFile: undefined,
  iniFile: undefined,
  uploadIniFile: undefined,
});

type Props = {
  isShow: boolean;
  beforeClose(): void;
  doAddHandle?: () => void;
  name?: string;
};

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  doAddHandle: () => {
    /* doAddHandle */
  },
});
const handleClosed = () => {
  props.beforeClose();
};

const handleSubmit = () => {
  const fd = new FormData();
  if (formData.value.uploadFile) {
    fd.append("uploadFile", formData.value.uploadFile);
  }
  if (formData.value.uploadIniFile) {
    fd.append("iniFile", formData.value.uploadIniFile);
  }
  fd.append('checkInterval', formData.value.checkInterval)
  
};
const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};
const handlePreview = (file) => {
  console.log(file);
};

const uploadConfig = (item) => {
  formData.value.uploadFile = item.file;
};
const uploadIniConfig = (item) => {
  formData.value.uploadFile.uploadIniFile = item.file;
};

const beforeUpload = (rawFile) =>
  new Promise<void>((resolve, reject) => {
    const size = rawFile.size;
    //不能超过60M
    const maxSize = 62914560;
    if (size >= maxSize) {
      ElMessage({
        message: "总文件大小不能超过60M",
        type: "warning",
      });
      reject();
      return;
    }
    resolve();
    const reader = new FileReader();
    reader.readAsDataURL(rawFile);
  });
</script>

<style lang="scss">
.wrap {
  .dialog-footer {
    @include flexCenter;
  }
  .el-input {
    width: 50%;
  }
}
</style>
