<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click=""
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <Visitor
          @click=""
          v-for="user in userArr"
          class="item"
          :user="user"
          :index="user.id"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期: {{ docInfo.workDate }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院: {{ docInfo.param?.hosname }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室: {{ docInfo.param?.depname }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名: {{ docInfo.docname }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:{{ docInfo.title }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:{{ docInfo.skill }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生服务器: <span style="color: red">{{ docInfo.amount }}</span>
            </div>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        :disabled="currentIndex == -1 ? true : false"
        @click=""
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Visitor from "@/pages/hospital/appointment_register/visitor.vue";
import { User } from "@element-plus/icons-vue";
//引入获取就诊人信息接口
import { reqHospitalVisitors, reqHospitalDoctorInfo } from "@/api/hospital";
import type {
  UserResponseData,
  UserArr,
  DoctorData,
  DoctorInfo,
} from "@/api/hospital/type";
import {} from "@/api/user";
import type {} from "@/api/user/type";
import { onMounted, ref } from "vue";

import { useRoute } from "vue-router";
//@ts-ignore
import { ElMessage } from "element-plus";
//获取路由对象
let $route = useRoute();

//存储医生的信息
let docInfo = ref({} as DoctorInfo);
//获取路由器对象
// let $router = useRouter();

//存储用户确定就诊人索引值
let currentIndex = ref<number>(-1);
//存储全部就诊人信息

//组件挂载完毕获取数据
onMounted(() => {
  getVisitors();
  getDoctorInfo();
});

let userArr = ref([] as UserArr);
const getVisitors = async () => {
  let res: UserResponseData = await reqHospitalVisitors();
  if ((res.code = 200)) {
    userArr.value = res.data;
  }
};
const getDoctorInfo = async () => {
  let result: DoctorData = await reqHospitalDoctorInfo(
    $route.query.docId as string
  );
  if ((result.code = 200)) {
    docInfo.value = result.data;
  }
};
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
