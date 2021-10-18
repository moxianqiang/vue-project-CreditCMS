<template>
  <div class="about">
    <h1>登录页</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <!-- submitForm('ruleForm')传入的ruleForm跟UI框架的表单控件上的‘ :model="ruleForm" ’是绑定的 -->
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// （4）
import { login } from '@/api/http'
import { setToken } from '@/utils/token'

export default {
  name:'login',
  data(){
    return {
       ruleForm: {
          account: 'admin',
          password:'admin@123'
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          //校验成功
          login(this.ruleForm).then(res=>{
            console.log(res);
            let{code , data } = res.data;
            if(code == 20000){
              //token缓存
              setToken(data.token);
              // push('/home')是跳转到整个布局页面，包括：侧边栏+头部+主体内容
              this.$router.push('/home');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  h1 {
    width: 100px;
    margin: auto;
  }

  div.el-form-item {
    width: 500px;
    margin: 20px auto;
  }
</style>