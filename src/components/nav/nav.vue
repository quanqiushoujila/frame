<template>
  <el-submenu
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.menuId + ''">
    <template slot="title">
      <i class="iconfont" :class="item.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list"
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
    <i class="iconfont" :class="item.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from './nav'
export default {
  name: 'sub-menu',
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicMenuRoutes: {
      type: Array,
      required: true
    }
  },
  components: { SubMenu },
  methods: {
    gotoRouteHandle (menu) {
      // var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
      // if (route.length >= 1) {
      //   this.$router.push({ name: route[0].name })
      // }
    }
  }
}
</script>
