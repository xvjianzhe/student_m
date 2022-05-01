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
    <el-form-item label="验证码" prop="code">
      <el-input v-model="ruleForm.code" />
    </el-form-item>
    <el-button @click="onSendMail">发送验证码</el-button>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import {defineComponent, reactive, ref} from "vue";
import {AuthSendMailCode,AuthByEmailCode,AuthBaseRegisterReq} from "@/api/auth";
import {FormInstance, FormRules} from "element-plus";
import logger from "@/log/baselog";


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
    })

    const sendMail = async ()=> {
      return await AuthSendMailCode(ruleForm.mail)
    };

    const authByCode = async ()=> {
      return await AuthByEmailCode(new AuthBaseRegisterReq(ruleForm.mail, ruleForm.code))
    };
    return {
      formSize,
      ruleFormRef,
      rules,
      ruleForm,
      sendMail,
      authByCode
    }
  },
  methods: {
    onSubmit(){

      if (this.ruleFormRef) {
        this.ruleFormRef.validate((valid, fields) => {
          if (valid) {
            logger.info('submit!')
            this.authByCode().then(val=> {
              this.$log.info(val.data);
            });
          } else {
            logger.info('error submit!', fields)
          }
        });
      }
    },

    onSendMail(){
      if (this.ruleFormRef) {
        this.ruleFormRef.validateField("mail",(valid, fields) => {
          if (valid) {
            logger.info('submit!');
            this.sendMail().then(val => {
              this.$log.info(val.data);
            });
          } else {
            logger.info('error code!');
            logger.info(fields);
          }
        })
      }
    }
  }
})
</script>

<style scoped>

</style>