<template>
  <div class="searchFault">
    <mt-header fixed title="故障搜索">
      <div slot="left">
        <mt-button @click="back" icon="back"></mt-button>
      </div>
      <div slot="right">
        <!-- <span>
          <img src="@/assets/img/peoplelist.png" alt="" />
        </span>
        <span>
          <img src="@/assets/img/add.png" alt="" />
        </span> -->
      </div>
    </mt-header>

    <div class="search">
      <mt-search
        @keyup.enter.native="search($event.target.innerText)"
        cancel-text="取消"
        placeholder="搜索"
        v-model="searchVal"
      ></mt-search>
      <span class="searchBtn" @click="searchOfClick"  style="color:#26a2ff" >搜一下</span>
    </div>

    <div class="sort">
      <span @click="sort">
        排序
        <img v-show="sortBool" src="@/assets/img/dropdown.png" />
        <img v-show="!sortBool" src="@/assets/img/dropup.png" />

        <span @click="choosesortid"> 排序字段：{{ sortid }} </span>
      </span>

      <span> 共{{ data.length }}条 </span>
    </div>

    <div class="searchList">
      <div class="nodata" v-if="data.length == 0">抱歉，暂无相关结果, 您可以尝试搜索“气缸脱落”</div>
      <div
        v-else
        v-for="(item, index) in data"
        :key="item.record_id"
        @click="gorecord(data, index)"
      >
        <p class="title">
          维修记录 - {{ item.record_id }}
          <img src="@/assets/img/back.png" alt="" />
        </p>
        <p>
          <span>设备号：{{ item.device_id }}</span>
          <span>设备名称：{{ item.device_name }}</span>
        </p>
        <p>
          <span>型号：{{ item.model_no }}</span>
          <span>故障描述：{{ item.fault_description }}</span>
        </p>
      </div>
    </div>

    <mt-popup v-model="popupVisible">
      <mt-radio
        title="单选框列表"
        v-model="sortid"
        :options="['序号', '设备号', '相关度']"
      >
      </mt-radio>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "searchResult",
  data() {
    return {
      data: this.$route.params.data || [],
      history: this.$route.params.history || [],
      sortBool: true,
      sortid: "序号",
      popupVisible: false,
      sortval: { 序号: "record_id", 设备号: "device_id", 相关度: "score" },
      searchVal:""
    };
  },
  watch: {},
  methods: {
    searchOfClick() {
      console.log(this.searchVal); //sy-log
      this.search(this.searchVal);
    },
    choosesortid() {
      this.popupVisible = true;
    },
    back() {
      this.$router.back(-1);
    },
    search(val) {
      this.$axios
        .post("http://39.105.232.15:3150/query", {
          text: `${this.searchVal}`,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.length > 0) {
            this.data = resp.data;
          } else {
            this.data = [];
          }
        });
    },
    gorecord(data, index) {
      this.$router.push({
        name: "record",
        params: {
          data: data,
          index: index,
        },
      });
    },
    sort() {
      var sortOfId = this.sortval[this.sortid];
      this.sortBool
        ? this.data.sort((a, b) => a[sortOfId] - b[sortOfId])
        : this.data.sort((a, b) => b[sortOfId] - a[sortOfId]);
      this.sortBool = !this.sortBool;
      console.log(this.data); //sy-log
    },
  },
  activated(){

    console.log('activated')
    if (this.$route.params.data) {
      this.data = this.$route.params.data;
      this.history = this.$route.params.history;
    } else {
      if (sessionStorage.getItem("datas")) {
        this.data = JSON.parse(sessionStorage.getItem("datas"));
      }
    }
  },
  mounted() {
    console.log('mounted')
    if (this.$route.params.data) {
      this.data = this.$route.params.data;
      this.history = this.$route.params.history;
    } else {
      if (sessionStorage.getItem("datas")) {
        this.data = JSON.parse(sessionStorage.getItem("datas"));
      }
    }
  },
};
</script>

<style lang="less" scoped>
.searchFault {
  background: #fafafa;
  box-sizing: border-box;
  min-height: ~"calc(100vh - 120px)";
}

.nodata {
  text-align: center;
  height: 100px;
  line-height: 100px;
}

.mint-header {
  background: white;
  color: #333;
  font-size: 16px;

  /deep/ .mint-header-title {
    font-weight: bold;
  }

  .is-right {
    img {
      width: 30px;
      height: 30px;
    }
  }
}

.search {
  .mint-search {
    height: initial;
    width: ~"calc(100% - 50px)";
    display: inline-block;
  }
  .searchBtn {
    width: 50px;
    height: 52px;
    display: inline-block;
    vertical-align: top;
    line-height: 52px;
    text-align: center;
    background: white;
  }

  /deep/ .mint-search-list {
    display: none;
  }

  /deep/ .mint-searchbar {
    background: white;

    .mint-searchbar-inner {
      border-radius: 50px;
      background-color: #f6f6f6;
    }

    .mint-searchbar-core {
      background: transparent;
      margin-left: 10px;
    }
  }
}

.searchList {
  padding: 0 10px;

  > div {
    background: white;
    box-shadow: 0 0 4px gainsboro;
    margin-top: 12px;
    padding: 12px;

    p {
      display: flex;
      justify-content: space-between;
      color: #666666;
      height: 30px;
      line-height: 30px;

      span:first-child {
        display: inline-block;
        width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span:last-child {
        display: inline-block;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .title {
      font-weight: bold;
      font-size: 16px;
      color: black;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}

.sort {
  background: white;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 48px;
  line-height: 48px;
}
</style>