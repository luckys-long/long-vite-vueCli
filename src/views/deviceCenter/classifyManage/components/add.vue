<template>
  <div class="wrap">
    <MyDialog :show="isShow"  :before-close="handleClosed"  :title="title" >
      <el-alert title="分类名称支持数字，字母，汉字，下划线及破折号，4到30位" type="info" show-icon style="margin-bottom: 10px;"/>
      <MyForm
        :formData="formData"
        :form-columns="formColumns"
        :form-rules="formRules"
      >
      <template #footer="formRef">
        <div class="form-footer">
          <el-button @click="handleClosed" >
            取消
          </el-button>
          <el-button type="primary" @click="handleSubmit(formRef)">
            保存
          </el-button>
        </div>
      </template>
      </MyForm>
    
    </MyDialog> 
  </div>
</template>

<script setup lang="ts">
import MyDialog from "@/components/dialog.vue";
import MyForm from "@/components/Form/index.vue";
import { reactive, ref } from "vue";
import { ElButton,ElAlert } from "element-plus";

type Props = {
  isShow: boolean;
  beforeClose():void
  doAddHandle?: ()=>void,
  title?:string
  name?:string
};

const props=withDefaults(defineProps<Props>(), {
  isShow: false,
  doAddHandle: () => { /* doAddHandle */ },
  title:'新增分类',
  name:''
});

const formData=ref({name:props.name ||''})

const handleClosed=()=>{
  props.beforeClose();
}

const formColumns = [
  {
    prop: "name",
    placeholder: "请输入分类名称",
    label: "分类名称",
    tag: "Input",
    span: 11,
  },

];

const formRules = reactive({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
});

const handleSubmit=(formRef)=>{
  formRef.validate((valid) => {
    if (valid) {
      console.log("===>提交的值",formData.value);
      
      props.doAddHandle();
    } else {
      console.log("error submit!");
      return false;
    }
    return null;
  });

}
</script>

<style lang="scss">
.wrap {
 .el-dialog__footer{
  display: none;
 }
 .form-footer{
  display: flex;
  justify-content: end;
  align-items: center;
 }
}
</style>
