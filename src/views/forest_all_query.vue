<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-row>

          <el-col :span="10">

            <el-input v-model="query_enjoy" placeholder="请输入查询主体"></el-input>


          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="load_enjoy(query_enjoy)">查询</el-button>

          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style='padding-top:20px'>

          <el-col :span="10">

            <div style="display: flex;">
              <span style="margin-top: 3px"> 热门查询 </span>
              <el-tag
                  v-for="item in items"
                  :key="item.label"
                  effect="plain"
                  style="margin-left: 7px;float: left"
                  @click.native="change_enjoy(item.label)"
              >
                {{ item.label }}
              </el-tag>
            </div>


          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>


        <el-divider></el-divider>


        <el-row :gutter="20">
          <el-col :span="4">
            <el-radio-group v-model="change_data" size="small" @change="changeData" fill="#66b1ff">>
              <el-radio-button label="StandardData">检索结果</el-radio-button>
              <el-radio-button label="SimilarData">相关享受主体</el-radio-button>
            </el-radio-group>


          </el-col>
          <el-col :span="19">

          </el-col>

        </el-row>
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :xs="20" :sm="19" :md="18" :lg="17" :xl="15" ref="barparent2">
            <div id="mountNode" class="bg-purple_new"></div>
          </el-col>
          <el-col :xs="4" :sm="5" :md="6" :lg="7" :xl="9">

            <div class="grid-content">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <a style="margin-left:8px">{{ currentShowTax.title }}</a>

                </div>

                <el-form :model="currentShowTax" label-position='left'>
                  <el-form-item label="条款详情">

                    <el-tooltip class="item" effect="dark" placement="top">

                      <div slot="content" style="font-size:20px">
                        <pre>{{ currentShowTax.clause_text | next_line }}</pre>
                      </div>

                      <span style="font-size:2px">
                      {{ currentShowTax.clause_text | ellipsis }}
                    </span>
                    </el-tooltip>

                  </el-form-item>

                  <el-form-item label="相关享受主体">
                    <div>
                      <el-tag
                          v-for="item in currentShowTax.enjoys"
                          :key="item"
                          size="small"
                          type="success">
                        {{ item }}
                      </el-tag>
                    </div>

                  </el-form-item>


                  <el-form-item label="类型">
                    <span style="font-size:2px">
                      {{ currentShowTax.type | ellipsis }}
                    </span>
                  </el-form-item>

                  <el-form-item label="文号">
                    <span style="font-size:2px">
                      {{ currentShowTax.textID | replace }}
                    </span>
                  </el-form-item>

                  <el-form-item label="政策类型">

                    <span style="font-size:2px">
                      {{ currentShowTax.policyClassification | ellipsis }}
                    </span>
                  </el-form-item>

                  <el-form-item label="有效期">

                    <span style="font-size:2px">
                      {{ currentShowTax.date | ellipsis }}
                    </span>
                  </el-form-item>

                  <el-form-item label="方式">

                    <span style="font-size:2px">
                      {{ currentShowTax.mode | ellipsis }}
                    </span>
                  </el-form-item>

                  <el-form-item label="涉及税种">
                    <el-tag
                        v-for="item in currentShowTax.taxTypes"
                        :key="item"
                        size="small"
                        type="text">
                      {{ item }}
                    </el-tag>
                    <!--                    <span style="font-size:2px">-->
                    <!--                      {{ currentShowTax.taxType | ellipsis }}-->
                    <!--                    </span>-->
                  </el-form-item>
                </el-form>


              </el-card>

            </div>
          </el-col>

        </el-row>

      </el-col>


    </el-row>
  </div>


</template>
<style>


.bg-purple_new {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, 0.32)
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script>
import G6 from '@antv/g6';

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
    replace(value) {
      if (value == '0') {
        return '无文号'
      } else {
        return value
      }

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
  name: 'forest_all_query',
  data() {
    return {
      items: [
        {label: '个人'},
        {label: '个体工商户'},
        {label: '社会团体'},
        {label: '企业'},
        {label: '事业单位'},
        {label: '下岗失业人员'},
        {label: '幼儿园'}
      ],
      query_enjoy: '纳税人',
      currentShowTax: {},
      currentTaxData: {data: [], relation: []},
      initData: {nodes: [], edges: []},
      taxData: [],
      host_port: '47.105.158.15:9001',

      change_data: 'StandardData',
      graphs: {},
      loadings: {},
      first: true,
      container: {},


      standard_data: {},
      similar_data: {},

      size_one: 30

    }
  },
  async mounted() {

    this.container = document.getElementById("mountNode")
    this.graphs = new G6.Graph({
      container: this.container,
      width: this.$refs.barparent2.$el.offsetWidth - 30,
      height: 600,
      layout: {
        type: 'force',
        // type: 'radial',
        unitRadius: 50,
        preventOverlap: true,
        linkDistance: (d) => {
          switch (d.target.type_m) {
            case 'tax_': {
              // return this.utils.randomNum(200, 400);
              return 70;
            }
            case 'item_': {
              return 70;
            }
          }
        },
        nodeStrength: (d) => {
          if (d.isLeaf) {
            return -350;
          }
          return -70;
        },
        edgeStrength: (d) => {
          switch (d.target.type_m) {
            case 'tax_': {
              return 0.3;
            }
            case 'item_': {
              return 0.9
            }
          }
        },
      },
      defaultNode: {},
      modes: {
        default: ['drag-canvas', "zoom-canvas"],
      },
    });
    // this.graphs = new G6.Graph({
    //   container: this.container,
    //   width: this.$refs.barparent2.$el.offsetWidth - 30,
    //   height: 800,
    //   layout: {
    //     type: 'radial',
    //     unitRadius: 150,
    //     preventOverlap: true,
    //     // maxPreventOverlapIteration: 100,
    //
    //   },
    //
    //   defaultNode: {
    //     size: 20,
    //   },
    //   modes: {
    //     default: ['drag-canvas', "zoom-canvas"],
    //   },
    // });
    this.load_enjoy('纳税人')
  },
  methods: {

    changeData(val) {
      if (val == 'StandardData') {
        this.initG6(this.standard_data)
      } else {
        this.initG6(this.similar_data)
      }
    },

    change_enjoy(input) {
      console.log(input)
      this.query_enjoy = input;
      this.load_enjoy(this.query_enjoy)
    },

    load_enjoy(enjoy_name) {
      this.loadings = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: '加载中',//显示在加载图标下方的加载文案
        spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(78,78,78,0.7)',//遮罩层颜色
        target: document.querySelector('#mountNode')//loadin覆盖的dom元素节点
      });

      this.$http.get('http://47.105.158.15:9001/forest/query?enjoy=' + enjoy_name
      ).then((response) => {
        console.log(response)
        if (response.status == 200) {


          this.standard_data = this.utils.coverData(response.data.standard_data, false, enjoy_name)
          this.similar_data = this.utils.coverData(response.data.similar_data, true, enjoy_name)
          this.initG6(this.standard_data)

          this.loadings.close()

        }

      });
    },
    caSize(text) {
      const size = 40 / (1 + parseInt(text.length * 0.03))
      return size

    },

    async initG6(t_data) {
      const that = this
      this.graphs.data({
        nodes: t_data.nodes,
        edges: t_data.edges.map(function (edge, i) {
          edge.id = 'edge-' + i;
          return Object.assign({}, edge);
        }),
      });

      this.graphs.node((node) => {
        switch (node.type_m) {
          case 'enjoy_': {
            return {
              size: this.size_one * 6,
              labelCfg: {
                offset: 10,
                style: {
                  fill: '#ffffff',
                  fontSize: 30,
                },
              },
              style: {
                fill: '#bae637',
                stroke: '#eaff8f',
                lineWidth: 5,
              }
            }
          }
          case 'tax_': {
            return {
              size: this.size_one * 4,
              type_m: 'tax_',
              type: 'circle',
              style: {
                fill: '#fde743',
                stroke: '#efdba8',
                lineWidth: 5,
              },
              labelCfg: {
                offset: 10,
                style: {
                  fontSize: 20,

                  fill: '#555454',
                },
              },
            }
          }
          case 'item_': {
            return {
              size: this.size_one,
              type: 'circle',
              style: {
                fill: 'rgba(219,95,56,0.87)',
                stroke: 'rgba(227,92,45,0.17)',
                lineWidth: 5,
              },
            }
          }
        }

      });

      this.graphs.render();
      this.graphs.on('node:dragstart', function (e) {
        that.graphs.layout();
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      });
      this.graphs.on('node:drag', function (e) {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      });
      this.graphs.on('node:dragend', function (e) {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });


      this.graphs.on('node:click', (e) => {

        switch (e.item._cfg.model.type_m) {
          case 'tax_': {
            return
          }
          case 'item_': {
            this.currentShowTax = e.item._cfg.model.data
            this.currentShowTax.enjoys = this.currentShowTax.enjoy.split(',')
            this.currentShowTax.taxTypes = this.currentShowTax.taxType.split(',')
          }
        }

      });


      if (typeof window !== "undefined") {
        const that = this
        window.onresize = () => {

          if (!that.graphs || that.graphs.get("destroyed")) return;
          if (!that.container || !that.container.scrollWidth || !that.container.scrollHeight)
            return;

          console.log('this.$refs.barparent.$el.offsetWidth', that.$refs.barparent2.$el.offsetWidth) //宽度
          console.log('this.$refs.barparent.offsetHeight', that.$refs.barparent2.$el.offsetHeight) //高度

          that.graphs.changeSize(that.$refs.barparent2.$el.offsetWidth - 30, 800);
        };
      }
    },


  },


}
</script>

<style scoped>

</style>
