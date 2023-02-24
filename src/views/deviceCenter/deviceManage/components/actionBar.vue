<template>
  <div class="action-bar">
    <el-button :icon="Plus">设备</el-button>
    <el-button :icon="Delete">批量删除</el-button>
    <el-button :icon="Setting">批量配置</el-button>
    <el-button :icon="Upload">导出excel</el-button>
    <el-button :icon="Download">导入模板</el-button>
    <el-button type="text">下载模板</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import {
  Plus,
  Delete,
  Setting,
  Download,
  Upload,
} from "@element-plus/icons-vue";
</script>

<style lang="scss">
.action-bar {
  @include flexStart;
  margin-bottom: 15px;
}
</style>
