<template>
  <div id="mountNode2">
    <el-table :data="meta_data" border style="margin: 15px;">
      <!--      <el-table-column label="内容">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ scope.row.clause_text }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column label="内容">
        <template slot-scope="scope">
          <el-input v-show="scope.row.show" v-model="scope.row.text"
                    placeholder="请输入内容"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"

          />
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style="font-size:20px">
              <pre>{{ scope.row.clause_text | next_line }}</pre>
            </div>


            <span v-show="!scope.row.show">
                  {{ scope.row.clause_text | ellipsis }}
                </span>
          </el-tooltip>

        </template>
      </el-table-column>


      <el-table-column label="享受主体">
        <template slot-scope="scope">
          <el-tag
              :key="tag" v-for="tag in scope.row.enjoys_Arr"
          >{{ tag }}
          </el-tag>
        </template>

      </el-table-column>
      <el-table-column label="公告标题">
        <template slot-scope="scope">

          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文号" width="140px">
        <template slot-scope="scope">

          <span>{{ scope.row.textID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方式" width="60px">
        <template slot-scope="scope">

          <span>{{ scope.row.mode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="政策类型" width="90px">
        <template slot-scope="scope">

          <span>{{ scope.row.policyClassification }}</span>
        </template>
      </el-table-column>
      <el-table-column label="减免类型" width="60px">
        <template slot-scope="scope">

          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税种">
        <template slot-scope="scope">
          <el-tag
              :key="tag" v-for="tag in scope.row.taxTypeArr"
          >{{ tag }}
          </el-tag>
        </template>

      </el-table-column>

      <el-table-column label="有效期限" width="140px">
        <template slot-scope="scope">

          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :total="total"
        :page-size="page_sizes"
        :pager-count="pager_counts"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "showTotal",
  filters: {
    ellipsis(value) {
      const num = 40
      if (!value) return "";
      if (value.length > num) {
        return value.slice(0, num) + "...";
      }
      return value;
    },
    next_line(line, num_pre_line) {
      num_pre_line = 30
      if (!line) return "";
      const len = line.length
      let re_line = ""
      for (let i = 0; i < len / num_pre_line; i++) {
        re_line += line.slice(i * num_pre_line, (i + 1) * num_pre_line) + '\n'
      }

      return re_line;
    }
  },
  data() {
    return {
      meta_data: [],
      host_port: '47.105.158.15:9001',
      loadings: {},
      total: 200,
      pager_counts: 11,
      page_sizes: 8,
      curPage: 0
    }
  },
  mounted() {

    this.load_data()
  },

  methods: {

    load_data() {
      this.loadings = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: '加载中',//显示在加载图标下方的加载文案
        spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(78,78,78,0.7)',//遮罩层颜色
        target: document.querySelector('#mountNode2')
      });

      this.$http.get('http://47.105.158.15:9001/show_data?query=true' + '&per=' + this.page_sizes + '&num=' + this.pager_counts, {}
      ).then((response) => {
        console.log(response.data.count)
        this.total = response.data.count
        this.meta_data = []
        for (const meta of response.data.data) {
          var lables = meta.taxType.split(",")
          var lables_new = []

          for (const lable of lables) {
            if (lable != '') {
              lables_new.push(lable)
            }

          }
          meta.taxTypeArr = lables_new

          var enjoys = meta.enjoy.split(",")
          var enjoys_new = []

          for (const lable of enjoys) {
            if (lable != '') {
              enjoys_new.push(lable)
            }
          }
          meta.enjoys_Arr = enjoys_new
          this.meta_data.push(meta)
        }


        this.loadings.close()

      });
    },

    handleCurrentChange(val) {
      this.pager_counts = val
      this.load_data()
      console.log(`当前页: ${val}`);
    }
  }

}
</script>

<style scoped>

</style>
