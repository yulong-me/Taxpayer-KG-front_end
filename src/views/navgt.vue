<template>
  <el-container style="border: 1px solid #eee">
    <el-header
        style="text-align: right; font-size: 13px;  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-row>
        <el-col :span="8">
          <div>
            <span style='float:left;color:white;font-family: sans-serif;font-size:26px'>税收优惠法规可视化分析系统</span>
          </div>

        </el-col>
        <el-col :span="14">
          <div>
            <span>&nbsp;</span>
          </div>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-question"></i>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-user-solid"></i>
        </el-col>

      </el-row>

    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); height:1000px">
        <el-menu :default-openeds="['1']"
                 :router=true
                 default-active="forest_all_query"
                 background-color="">
          <el-submenu index="1">
            <template slot="title">
              导航
            </template>
            <el-menu-item-group>
              <el-menu-item index='forest_all_query' route="/forest_all_query">
                减免税查询
              </el-menu-item>
              <!--              <el-menu-item index="intro" route="/">-->
              <!--                概览-->
              <!--              </el-menu-item>-->
              <el-menu-item index="extra_data" route="/extra">
                半自动抽取
              </el-menu-item>
              <el-menu-item index='total_meta' route="/total_data">
                元数据浏览
              </el-menu-item>

              <!--              <el-menu-item index='forest_all' route="/forest_all_tax">-->
              <!--                减免税森林-->
              <!--              </el-menu-item>-->

            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "navgt"
}
</script>
<style scoped>
.el-header {
  background-color: rgb(102, 157, 252);
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

i {
  color: rgba(255, 255, 255, 0.66);
  font-size: 20px;
}
</style>
