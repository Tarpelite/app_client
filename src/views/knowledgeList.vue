<template>
  <div class="knowledgeList">
    <mt-header fixed title="知识图谱">
      <div slot="left">
        <mt-button @click="$router.back(-1)" icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="chooseModel">
      <p class="title">
        选择型号
        <mt-button type="primary" size="small"
          ><img src="@/assets/img/addwhite.png" />添加</mt-button
        >
      </p>
      <div class="content">
        <mt-button type="default" size="small"
          >VTC-160A-2PC<img src="@/assets/img/close.png"
        /></mt-button>
        <mt-button type="default" size="small"
          >VT-200C<img src="@/assets/img/close.png"
        /></mt-button>
      </div>
    </div>

    <div class="chooseFault">
      <p class="title">
        选择故障征兆
        <mt-button type="primary" size="small"
          ><img src="@/assets/img/addwhite.png" />添加</mt-button
        >
      </p>
      <div class="content">
        <mt-button type="default" size="small"
          >防护门故障<img src="@/assets/img/close.png"
        /></mt-button>
        <mt-button type="default" size="small"
          >加工区零件未夹紧<img src="@/assets/img/close.png"
        /></mt-button>
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
              "size":1.5

            },
            "Device": {
              "caption":"name"
            },
            "Reason":{
              "caption":"name"
              },
            "Solution":{
              "caption":"name"
            }
            ,

        },
       relationships: {
            "ReasonOf": {
                "caption": true
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
        initial_cypher: "MATCH p=()-->() RETURN p LIMIT 10"
    };

    viz = new NeoVis.default(config);
    viz.render();
    console.log(viz);

    }
    console.log(NeoVis);
    draw();
  },
};
</script>

<style lang="less" scoped>
.mint-header {
  background: white;
  color: #333;
  font-size: 16px;

  /deep/ .mint-header-title {
    font-weight: bold;
  }
}

.knowledgeList {
  padding: 0 10px;
  min-height: ~"calc(100vh - 120px)";
}

.chooseModel {
}

.title {
  font-weight: bold;
  font-size: 16px;
  margin: 14px 0;

  .mint-button {
      background: #4969FF;
      float: right;

      img{
          margin-right: 4px;
          vertical-align: middle;
      }
  }
}

.content{
    .mint-button {
        margin-right: 10px;

      img{
          margin-left: 4px;
          vertical-align: middle;
      }
  }
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