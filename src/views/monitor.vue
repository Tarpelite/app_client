<template>
  <div class="monitor">
    <mt-header fixed title="故障监测">
      <div slot="left">
        <mt-button @click="$router.back(-1)" icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="page">
        <div class="chart">
      <p class="title" style="margin-left:5px">各型号故障发生率</p>
      <div id="chart1">
        <!-- <img src="@/assets/img/eg.png" alt="" /> -->
      </div>
    </div>

      
    </div>

    <div>
      <p class="title" style="margin-left:5px">按型号查看</p>
      <div class="content" style="margin-left:10px">
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-200C</mt-button>
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-160A-2PC</mt-button>
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-200BN</mt-button>
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-410</mt-button>
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-16A</mt-button>
        <mt-button :plain="true" @click.native="search" type="default" size="small">VTC-20B</mt-button>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  methods: {
    search(val){
      this.$router.push({
        name:"monitor_detail",
        params:{
          "model_no":`${val.target.innerText}`
        }
      }
      )

    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      const names = [
          "VTC-160A",
          "VTC-200CN",
          "VTC-200BN",
          "VTC410",
          "VTC16B"
      ]
    //   const values = [98, 76.77, 55.5, 44, 33, 22]
      const values = [7.98, 6.77, 5.55, 4.42, 3.33, 2.22]
      const myColor = ['#1089E7', '#FF8E4D', '#56D0E3', '#1089E7', '#F57474']
       myChart.setOption({
        grid: {
          left: "2%",
          top: "5%",
          containLabel: true
        },
        // title:{
        //     text:"故障发生率"
        // },
         tooltip: {
          show: false,
          backgroundColor: '#fff',
          textStyle: {
            fontSize: 8,
            color: '#152934',
            lineHeight: 20
          },
          formatter: function (params) {
            return `${params.name} : ${params.data} %`
          }
        },
        xAxis: {
          show:false
        },
         yAxis: [{
          show: true,
          data: names,
          inverse: true,
          axisLine: 'none',
          splitLine: {
            show: false
          },
          axisTick:'none',
          axisLabel: {
            color: '#000000',
            // formatter: (value, index) => {
            //   if (value.length > 10) {   //因为名字过长显示的问题，所以做了截取
            //     return [`{title|${value.slice(0, 7)}...}`].join('')
            //   } else {
            //     // [`{lg|${index + 1}}` + `{title|${value}}`]
            //     return [`{title|${value}}`].join('')
            //   }
            // },
            rich: {
              lg: {
                color: '#000000',
                borderRadius: 15,
                align: 'left',
                width: 8,
                height: 15
              },
              title: {
                color: '#000000',
                width: 50,
                align: 'left',
                borderRadius: 5,
                padding: 5
              }
            }
          }
        }],
        series: [{
          type: 'bar',
          yAxisIndex: 0,
          data: values,
          barWidth: 6,
          barGap: '-100%',
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#000000',
                fontSize: '12'
              },
              formatter: function (value) {
                return value.value + '%'
              }
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: function (params) {
                var num = myColor.length
                return myColor[params.dataIndex % num]
              }
            }
          }
        }]

      });
    },
  },
  mounted() {
    this.drawLine();
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

.title {
  font-weight: bold;
  font-size: 16px;
  margin: 14px 0;
}

.browse {
  padding: 0 10px;
  min-height: ~"calc(100vh - 120px)";

}

.page {

}

.content {
  .mint-button {
    border: none;
    margin-right: 15px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px gainsboro;

  }
}

.content.large {
  .card {
    width: ~"calc(50% - 7.5px)";
    box-shadow: 0 0 4px gainsboro;
    padding: 12px 20px;
    margin-right: 15px;
    display: inline-block;
    text-align: left;
    box-sizing: border-box;

    p:first-child {
      color: #4969ff;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .card:nth-child(2n) {
    margin-right: 0;
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