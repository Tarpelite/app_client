<template>
  <div class="reportRepair">
    <mt-header fixed title="维修上报">
      <div slot="left">
        <mt-button @click="$router.back(-1)" icon="back"></mt-button>
      </div>
      <div slot="right">
        <mt-button type="primary" size="small" @click="submit">上传记录
        </mt-button>
       
      </div>
    </mt-header>

    

    <div class="form">
      <mt-field placeholder="设备现象描述">
        
        <mt-button type="primary" size="small" style="">识别</mt-button>
      </mt-field>
      <mt-field label="设备号" placeholder="279"></mt-field>
      <mt-field label="设备名称" placeholder="小巨人加工中心"></mt-field>
      <mt-field label="设备型号" placeholder="VTC-160A-2PC"></mt-field>
      <mt-field label="故障描述" placeholder="加工中掉刀"></mt-field>
      <mt-field label="故障原因" placeholder="松刀时刀夹过紧"></mt-field>
      <mt-field label="解决方案" placeholder="需要调松刀夹"></mt-field>
      <span style="display: inline-block;
      width: 104px;
      font-size: 16px;
      vertical-align: top;padding: 0 10px;
    margin-top: 16px;"> 是否解决 </span>
      <mt-radio
                label="是否解决"
                v-model="value"
                :options="['已解决', '未解决']">
              </mt-radio>
      <div class="photo">
        <span>故障照片</span>
        <div class="photo">
          <img src="@/assets/img/problem1.jpg" width="40" height="40" alt="" />
        </div>
        <mt-button type="primary" size="small">添加照片</mt-button>
      </div>
    </div>

    <div class="chart">
      <p class="title">原因分析</p>
      <div id="viz" class="network" style="height: 300px">
        <!-- <img src="@/assets/img/eg.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"KG",
  components:{},
  props:{
    popupVisible:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    sleep (time){
       var startTime = new Date().getTime() + parseInt(time, 10);
       while(new Date().getTime() < startTime) {}
    },

    submit(){
     let instance = this.$toast(
       {
         message: "上传成功",
         iconClass: "icon icon-success"
       }
     )
     
    }
  },
  mounted() {
    // this.drawLine();
    var viz;
    function draw() {
    var config = {
        container_id: "viz",
        server_url: "bolt://39.105.232.15:7687",
        server_user: "neo4j",
        server_password: "123456",
        labels: {
            "Description": {
              "caption":"name",
              "size":1.0

            },
            "Device": {
              "caption":"name",
              "size":1.0
              
            },
            "Reason":{
              "caption":"name",
              //  "size":1.0,
              },
            "Solution":{
              "caption":"name",
              // "size":1.0
              
            }
            ,

        },
        relationships: {
            "ReasonOf": {
                "caption": false
            },
            "Solutionof":{
                "caption":true
            },
            "malfunctionof":{
                "caption":false
            },
            "methodsof":{
                "caption":false
            }
        },
        initial_cypher: "MATCH p=(r:Reason)-->(n:Description) where n.name = \"掉刀\" RETURN p  LIMIT 5"
    };

    viz = new NeoVis.default(config);
    viz.render();
    }
    draw();
  },
};
</script>

<style lang="less" scoped>
.reportRepair {
  padding: 0 10px;
  min-height: ~"calc(100vh - 120px)";
}

.mint-header {
  background: white;
  color: #333;
  font-size: 16px;

  /deep/ .mint-header-title {
    font-weight: bold;
  }

  .is-right {
    .mint-button {
      background: #4969ff;
      float: right;
      color: white;
      font-size: 12px;
      padding: 0 8px;
      height: 26px;
      line-height: 26px;

      img {
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
}

.form {

  .mint-cell {
    border-bottom: 1px solid #eeeeee;
    text-decoration: none;

    .mint-button {
      background: #4969ff;

      input {
        text-decoration: none;
      }
    }
   
  }

  .photo {
    padding: 0 10px;
    margin-top: 16px;

    > * {
      display: inline-block;
    }
    > span {
      display: inline-block;
      width: 104px;
      font-size: 16px;
      vertical-align: top;
    }

    .photo {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .mint-button {
      float: right;
      background: #4969ff;
    }
  }
}

.title {
  font-weight: bold;
  font-size: 16px;
  margin: 14px 0;
}

.chart {
  margin-top: 20px;

  > div {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>