<template>
  <div class="deviceManager">
    <mt-header fixed title="设备管理">
        <div slot="left">
        <mt-button @click="$router.back(-1)" icon="back"></mt-button>
      </div>
    </mt-header>
    
    <p class="title" style="margin-left:10px">设备种类</p>
    <div class="nav" style="margin-left:10px">
      <router-link to="/deviceDetail">
        <div class="card">
          <p><img src="@/assets/img/machine.jpg" alt="" /></p>
          <p>小巨人加工中心</p>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
// import NeoVis from "neovis.js";
export default {
  name:"deviceManager",
  methods:{
    godetail(){
      this.$router.push(
        {
          name:"deviceDetail",
          params:{}
        }
      )
    }

  }
 
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
