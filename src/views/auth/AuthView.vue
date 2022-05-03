<template>
  <el-form :model="ruleForm"
           label-width="120px"
           ref="ruleFormRef"
           :rules="rules"
           :size="formSize"
  >
    <el-form-item label="邮箱：" prop="mail">
      <el-input v-model="ruleForm.mail" />
    </el-form-item>
    <el-form-item label="验证码" prop="code" >
      <el-input v-model="ruleForm.code" />
    </el-form-item>
    <el-button @click="onSendMail" :loading-icon="Eleme" :loading="isLoading" :disabled="formDisable">发送验证码</el-button>
    <el-form-item>
      <el-button type="primary" :loading-icon="Eleme" @click="onSubmit" :loading="isSubmitting" :disabled="codeDisable">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import {defineComponent, reactive, ref} from "vue";
import {AuthSendMailCode,AuthByEmailCode,AuthBaseRegisterReq} from "@/api/auth";
import {FormInstance, FormItemInstance, FormRules} from "element-plus";
import { Eleme } from '@element-plus/icons-vue'

export default defineComponent({
  name: "AuthView",
  setup() {

    const ruleFormRef = ref<FormInstance>();
    const formSize = ref('default');

    const ruleForm = reactive({
      mail: '',
      code: '',
    });
    const rules = reactive<FormRules>({
      mail: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      ],
      code: [
        {required: true, message: '请输入验证码', trigger: 'blur'},
        {len: 6, message: '验证码不能少于6位', trigger: 'blur' },
      ]
    });

    const validForm = async (formRef: FormInstance) => {
      if (formRef) {
        return await formRef.validate((valid) => {
            return valid;
        });
      }
      return false;
    };

    const validCode = async (formRef: FormInstance) => {
      if (formRef) {
        return await formRef.validateField("mail", (valid) => {
          return valid;
        });
      }
      return false;
    };

    const sendMail = async ()=> {
      return await AuthSendMailCode(ruleForm.mail)
    };

    const authByCode = async ()=> {
      return await AuthByEmailCode(new AuthBaseRegisterReq(ruleForm.mail, ruleForm.code))
    };
    return {
      validCode,
      validForm,
      Eleme,
      formSize,
      ruleFormRef,
      rules,
      ruleForm,
      sendMail,
      authByCode
    }
  },
  data(){
    return {
      isSubmitting: false,
      isLoading: false,
    }
  },
  methods: {
    onSubmit(){

      if (this.ruleFormRef) {
        this.validForm(this.ruleFormRef).then(val => {
          if (val) {
            this.$log.info("满足提交条件");
            this.isSubmitting = true;
            this.authByCode().then(val=> {
              this.$log.info(val.data);
            }).finally(()=>{
              this.isSubmitting = false;
            });
          }
        });
      }
    },

    onSendMail(){
      if (this.ruleFormRef) {
        this.validCode(this.ruleFormRef).then(val => {
          if(val) {
            this.$log.info("满足发送验证码条件");
            this.isLoading = true;
            this.sendMail().then(val => {
              this.$log.info(val.data);
            }).finally(()=>{
              this.isLoading = false;
            });
          }
        });
      }
    }
  }
})
</script>

<style scoped>

</style>