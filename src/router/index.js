import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path:"/my",
    name:"my",
    component:()=>import("@/views/my")
  },
  {
    path:"/searchFault",
    name:"searchFault",
    component:()=>import("@/views/searchFault")
  },
  {
    path:"/knowledgeList",
    name:"knowledgeList",
    component:()=>import("@/views/knowledgeList")
  },
  {
    path:"/console",
    name:"console",
    component:()=>import("@/views/console")
  },
  {
    path:"/browse",
    name:"browse",
    component:()=>import("@/views/browse")
  },
  {
    path:"/monitor",
    name:"monitor",
    component:()=>import("@/views/monitor")
  },
  {
    path:"/deviceManager",
    name:"deviceManager",
    component:()=>import("@/views/deviceManager")
  },
  {
    path:"/reportRepair",
    name:"reportRepair",
    component:()=>import("@/views/reportRepair")
  },
  {
    path:"/record",
    name:"record",
    component:()=>import("@/views/record")
  },
  {
    path:"/searchResult",
    name:"searchResult",
    component:()=>import("@/views/searchResult")
  },
  {
    path:"/monitor_detail",
    name:"monitor_detail",
    component:()=>import("@/views/monitor_detail")
  },
  {
    path:"/deviceDetail",
    name:"deviceDetail",
    component:()=>import("@/views/deviceDetail")
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
