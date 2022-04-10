<template>
  <div style="margin-left: 40px;">
    <div style="padding-top: 20px;"/>
    <div style="margin-right:15px;">
      <el-row>

        <el-col :span="4">
          <el-switch
              v-model="IsAuto"
              active-text="自动构建"
              inactive-text="半自动构建">
          </el-switch>
        </el-col>
        <el-col :span="10">
          <span>&nbsp;</span>
        </el-col>
        <el-col :span="10">
          <span>&nbsp;</span>
        </el-col>
      </el-row>

    </div>


    <el-tabs v-model="activeName" type="card" style="padding-top: 20px; margin-right: 20px;" @tab-click="tab_click">
      <el-tab-pane label="1、输入数据" name="split">
        <div style="padding-top: 20px;display: flex;">
          <el-input
              v-model="input_tax"
              :autosize="{ minRows: 4, maxRows: 20}"
              type="textarea"
              style="width: 80%"
              placeholder="请输入税法条款"
          />
        </div>

        <div style="padding-top: 20px;display: flex;">
          <el-button type="primary" @click="to_split()" style="margin-left: 70px">分割，下一步</el-button>
        </div>

      </el-tab-pane>
      <el-tab-pane label="2、条款分割" name="edit_split">
        <div>
          <el-table :data="split_data" border style="margin: 15px;" v-loading="split_loading">

            <el-table-column label="状态" width="50px" align="center">
              <template slot-scope="scope">
                <i class="el-icon-success" v-show="!scope.row.type" style="color:rgba(234,23,23,0.49);font-size:28px"/>
                <i class="el-icon-success" v-show="scope.row.type" style="color:rgba(38,255,0,0.58);font-size:28px"/>
              </template>
            </el-table-column>


            <el-table-column label="条款">
              <template slot-scope="scope">
                <el-input v-show="scope.row.show" v-model="scope.row.tab1" type="textarea"
                          placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
                />
                <span v-show="!scope.row.show">{{ scope.row.tab1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
              <template slot-scope="scope">

                <div v-show="scope.row.type">
                  <el-button v-show="!scope.row.show" @click="scope.row.show = true">编辑</el-button>
                  <el-button v-show="scope.row.show" @click="scope.row.show =false">保存</el-button>
                  <el-button v-show="scope.row.type" type="danger" @click="delete_split(scope.row)">删除
                  </el-button>
                </div>
                <el-button v-show="!scope.row.type" type="success" @click="to_add_remove(scope.row)">添加
                </el-button>

              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px;" @click="toRelief()"> 确认，下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="3、减免税事件识别" name="edit_relief">
        <div>
          <el-table :data="relief_data" border style="margin: 15px;" v-loading="relief_loading">
            <el-table-column label="状态" width="50px" align="center">
              <template slot-scope="scope">
                <i class="el-icon-success" v-show="!scope.row.type" style="color:rgba(234,23,23,0.49);font-size:28px"/>
                <i class="el-icon-success" v-show="scope.row.type" style="color:rgba(38,255,0,0.58);font-size:28px"/>
              </template>
            </el-table-column>
            <el-table-column label="条款">
              <template slot-scope="scope">
                <el-input v-show="scope.row.show" v-model="scope.row.tab1" type="textarea"
                          placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
                />
                <span v-show="!scope.row.show">{{ scope.row.tab1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              >
              <template slot-scope="scope">
                <el-button v-show="!scope.row.type" type="success" @click="to_add_remove(scope.row)">添加
                </el-button>
                <div style="padding-left: 20px;"/>
                <el-button v-show="scope.row.type" type="danger" @click="to_add_remove(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin: 10px;" @click="to_meta()"> 确认，下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="4、元数据抽取" name="meta_predict">
        <el-table :data="meta_data" border style="margin: 15px;" v-loading="meta_loading">

          <el-table-column label="内容">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.text"
                        placeholder="请输入内容"
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 10}"

              />
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content" style="font-size:20px">
                  <pre>{{ scope.row.text | next_line }}</pre>
                </div>


                <span v-show="!scope.row.show">
                  {{ scope.row.text | ellipsis }}
                </span>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column label="有效期限" width="140px">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.date" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文号" width="140px">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.textID" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.textID }}</span>
            </template>
          </el-table-column>

          <el-table-column label="公告标题">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.title" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="方式" width="60px">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.mode" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.mode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="减免类型" width="60px">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.type" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.type }}</span>
            </template>
          </el-table-column>

          <el-table-column label="税种">
            <template slot-scope="scope">
              <el-tag
                  :key="tag" v-for="tag in scope.row.taxType" closable
                  :disable-transitions="false" @close="handleTaxTypeClose(scope.row,tag)" style="margin-top: 9px">{{
                  tag
                }}
              </el-tag>
              <el-input class="input-new-tag" v-if="scope.row.inputVisibleTaxType" v-model="scope.row.inputValueTaxType"
                        ref="saveTagInputTaxType"
                        size="small"
                        @keyup.enter.native="handleInputConfirmTaxType(scope.row)"
                        @blur="handleInputConfirmTaxType(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showTaxTypeInput(scope.row)"
                         style="margin-top: 9px">
                <i class="el-icon-plus"></i>

              </el-button>

            </template>

          </el-table-column>

          <el-table-column label="享受主体">
            <template slot-scope="scope">
              <el-tag
                  :key="tag" v-for="tag in scope.row.enjoy" closable
                  :disable-transitions="false" @close="handleEnjoyClose(scope.row,tag)" style="margin-top: 9px">{{
                  tag
                }}
              </el-tag>
              <el-input class="input-new-tag" v-if="scope.row.inputVisibleEnjoy" v-model="scope.row.inputValueEnjoy"
                        ref="saveTagInputEnjoy"
                        size="small"
                        @keyup.enter.native="handleInputConfirmEnjoy(scope.row)"
                        @blur="handleInputConfirmEnjoy(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showEnjoyInput(scope.row)"
                         style="margin-top: 9px">
                <i class="el-icon-plus"></i>

              </el-button>
            </template>

          </el-table-column>


          <el-table-column label="政策类型" width="90px">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" v-model="scope.row.policyClassification" type="textarea"
                        placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 5}"
              />
              <span v-show="!scope.row.show">{{ scope.row.policyClassification }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-show="!scope.row.type">


              </div>
              <el-button v-show="!scope.row.show" @click="scope.row.show = true">编辑</el-button>
              <el-button v-show="scope.row.show" @click="scope.row.show =false">保存</el-button>

              <!--              <el-button v-show="scope.row.type" type="danger" @click="delete_meta(scope.row)">删除-->
              <!--              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin: 10px;" @click="to_commit()"> 完成提交</el-button>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>


<script>

export default {
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
  name: 'Home',

  data() {

    return {
      IsAuto: false,

      inputVisible: false,
      inputValue: '',
      relief_loading: false,
      meta_loading: false,
      split_loading: false,
      auto_extract: true,

      input_tax: '',
      activeName: 'split',
      split_data: [],
      relief_data: [],
      meta_data: [],
      host_port: '47.105.158.15:9001',

    }
  },
  mounted() {

  },
  methods: {
    to_commit() {

      for (const data_relief of this.meta_data) {
        data_relief.show = false
      }

      var post_data = []
      for (const data of this.meta_data) {
        console.log(data)
        post_data.push(
            {
              "type": data.type,
              "date": data.date,
              "text": data.text,
              "mode": data.mode,
              "textID": data.textID,
              "taxType": data.taxType,
              "enjoy": data.enjoy,
              "start_end": data.start_end,
              "title": data.title,
              "policyClassification": data.policyClassification,
            }
        )
      }

      this.$http.post('http://47.105.158.15:9001/storage_data', {
            'data': post_data,
            "text": this.input_tax,

          }
      ).then((response) => {
        if (response.status == 200) {
          this.$router.go(0)
        }

      });

    },


    delete_split(row) {
      console.log(row)
      row.type = !row.type
      this.split_data.sort((a, b) => b.type - a.type)
      // delete this.split_data[this.split_data.indexOf(row)]
    },

    handleTaxTypeClose(row, tag) {
      row.taxType.splice(row.taxType.indexOf(tag), 1);
    },

    handleEnjoyClose(row, tag) {
      row.enjoy.splice(row.enjoy.indexOf(tag), 1);
    },

    showTaxTypeInput(row, event) {
      console.log(row, event)
      row.inputVisibleTaxType = true;
      this.$nextTick(_ => {
        console.log(_)
        this.$refs.saveTagInputTaxType.$refs.input.focus();
      });
    },

    showEnjoyInput(row, event) {
      console.log(row, event)
      row.inputVisibleEnjoy = true;
      this.$nextTick(_ => {
        console.log(_)
        this.$refs.saveTagInputEnjoy.$refs.input.focus();
      });
    },


    handleInputConfirmTaxType(row) {

      if (row.inputValueTaxType) {
        row.taxType.push(row.inputValueTaxType)
      }
      row.inputVisibleTaxType = false;
      row.inputValueTaxType = '';
    },
    handleInputConfirmEnjoy(row) {

      if (row.inputValueEnjoy) {
        row.enjoy.push(row.inputValueEnjoy)
      }
      row.inputVisibleEnjoy = false;
      row.inputValueEnjoy = '';
    },

    to_meta() {
      this.meta_loading = true
      this.activeName = 'meta_predict'
      var self = this;

      var post_data = []
      for (const data_relief of this.relief_data) {
        if (data_relief.type) {
          post_data.push(data_relief.tab1)
        }
      }

      this.$http.post('http://47.105.158.15:9001/last_result', {
            'predictReduceList': post_data,
            'text': this.input_tax
          }
      ).then((response) => {

        self.meta_data = []
        for (const meta of response.data) {

          meta.inputVisibleTaxType = false
          meta.inputVisibleEnjoy = false

          meta.inputValue = ''
          meta.show = false
          meta.types = false
          self.meta_data.push(meta)
        }
        self.meta_loading = false
        console.log(self.meta_data)

      });

    },
    tab_click(tab, event) {
      console.log(tab, event)
      return

    },
    to_add_remove(row) {
      console.log(row)
      row.type = !row.type
      this.relief_data.sort((a, b) => b.type - a.type)
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },

    to_split() {


      if (this.input_tax == '') {
        this.$message('输入文本不能为空！');
        return
      }
      this.activeName = 'edit_split'
      this.split_loading = true
      var self = this
      this.$http.get('http://47.105.158.15:9001/split?initialText=' + this.input_tax)
          .then(function (response) {
            console.log(response.data)

            self.split_data = []
            for (const dataKey of response.data) {
              self.split_data.push(
                  {
                    'tab1': dataKey,
                    'show': false,
                    'type': true
                  }
              )
            }
            self.split_loading = false

            if (self.IsAuto) {

              clearTimeout(self.timer);  //清除延迟执行

              self.timer = setTimeout(() => {   //设置延迟执行
                self.toRelief()
              }, 1000);
            }
          })

    },
    toRelief() {

      this.relief_loading = true
      this.activeName = 'edit_relief'
      var self = this;
      var post_data = []
      for (const data_split of this.split_data) {
        if (data_split.type) {
          post_data.push(data_split.tab1)
        }
      }
      console.log(post_data)
      this.$http.post('http://47.105.158.15:9001/reduce_event', {
            'reduceList': post_data
          }
      ).then((response) => {

        console.log(response.data)
        self.relief_data = []
        for (const dataKey of response.data.is) {

          self.relief_data.push(
              {
                'tab1': dataKey,
                type: true
              }
          )
        }

        for (const dataKey of response.data.not) {

          self.relief_data.push(
              {
                'tab1': dataKey,
                type: false

              }
          )
        }

        self.relief_data.sort((a, b) => b.type - a.type)
        self.relief_loading = false

        if (self.IsAuto) {

          clearTimeout(self.timer);  //清除延迟执行

          self.timer = setTimeout(() => {   //设置延迟执行
            self.to_meta()
          }, 1000);
        }

      });
    }
  }
}
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
