<template>
  <div class="deviceDetail">
    <mt-header fixed title="设备管理详情">
        <div slot="left">
        <mt-button @click="$router.back(-1)" icon="back"></mt-button>
      </div>
    </mt-header>
    
    <p class="title" style="margin-left:10px">小巨人加工中心</p>
    <div class="chart">
      <p class="title" style="margin-left:10px">监控预警</p>
      <div id="chart1">
        <!-- <img src="@/assets/img/eg.png" alt="" /> -->
      </div>
    </div>

  </div>
</template>

<script>
// import NeoVis from "neovis.js";
export default {
    methods:{
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      myChart.setOption({
        grid: {
          left: "5%",
          top: "5%",
          containLabel: true
        },
        legend:{
          data:["日均故障严重程度"]
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
         
        series: [
          {
            name:"日均故障严重程度",
            data: [56, 47, 22, 23, 12, 32, 47],
            type: "line",
            smooth: true,
           
          },
        ],
      });
    },
  },
  mounted() {
    this.drawLine();
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
