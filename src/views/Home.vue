<template>
  <div class="home">
    <mt-header fixed title="首页"></mt-header>
    <div class="title">
      北航 - 清华工业数智 <img src="@/assets/img/logo.png" />
    </div>
    <div class="nav">
      <router-link to="/browse">
        <div class="card">
          <p><img src="@/assets/img/liulan.png" alt="" /></p>
          <p>浏览</p>
        </div>
      </router-link>
      <router-link to="/searchFault">
        <div class="card">
          <p><img src="@/assets/img/guzhangss.png" alt="" /></p>
          <p>故障搜索</p>
        </div>
      </router-link>
      <router-link to="/knowledgeList">
        <div class="card">
          <p><img src="@/assets/img/zhishitp.png" alt="" /></p>
          <p>知识图谱</p>
        </div>
      </router-link>
      <router-link to="/monitor">
        <div class="card">
          <p><img src="@/assets/img/guzhangjc.png" alt="" /></p>
          <p>故障监测</p>
        </div>
      </router-link>
      <router-link to="/deviceManager">
        <div class="card">
          <p><img src="@/assets/img/shebeigl.png" alt="" /></p>
          <p>设备管理</p>
        </div>
      </router-link>
      <router-link to="/reportRepair">
        <div class="card">
          <p><img src="@/assets/img/weixiusb.png" alt="" /></p>
          <p>维修上报</p>
        </div>
      </router-link>
    </div>

    <div class="chart">
      <p>设备维修知识图谱</p>
      <div id="viz" class="network" style="height: 300px"></div>
      <!-- <div id="chart1">
      </div> -->
    </div>

    <div class="chart">
      <p>维修方案增长趋势</p>
      <div id="chart2">
        <!-- <img src="@/assets/img/eg.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import NeoVis from "neovis.js";
export default {
  name: "Home",

  components: {},
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      myChart.setOption({
        grid: {
          left: "13%",
          top: "5%",
          containLabel: true
        },
        legend:{
          data:["新增方案"]
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          // {
          //   name: "方案总数",
          //   data: [597, 598, 600, 604, 612, 615, 618],
          //   type: "line",
          //   smooth: true,
          //   lineStyle:{
          //     color:'blue'
          //   }
          // },
          {
            name: "新增方案",
            data: [1,2,4,3,4,3,2],
            type: "line",
            smooth: true,
            lineStyle:{
              color:'blue'
            }

          }
        ],
      });
    },
  },
  mounted() {
    this.drawLine();
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
        initial_cypher: "MATCH p=()-->() RETURN p LIMIT 25"
    };

    viz = new NeoVis.default(config);
    viz.render();

    }
    draw();
  },
};
</script>

<style lang="less" scoped>
.home {
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

}

.title {
  font-weight: bold;
  color: #333333;
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;

  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
}

.nav {
  .card {
    display: inline-block;
    width: ~"calc(33% - 10px)";
    margin-right: 15px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px gainsboro;
    padding: 8px 0;
    text-align: center;

    img {
      width: 40%;
    }

    p:last-child {
      margin-top: 10px;
    }
  }

  a:nth-child(3n) {
    .card {
      margin-right: 0;
    }
  }

  a:nth-child(n + 4) {
    .card {
      margin-bottom: 0;
    }
  }
}

.chart {
  margin-top: 20px;

  p {
    font-weight: bold;
    font-size: 16px;
  }

  > div {
    height: 200px;
    margin: 10px 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
