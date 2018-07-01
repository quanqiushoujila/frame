<template>
  <el-submenu
    v-if="menu.children && menu.children.length >= 1"
    :index="menu.id + ''">
    <template slot="title">
      <i class="iconfont" :class="menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="subMenu in menu.children"
      :key="subMenu.id"
      :menu="subMenu">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" @click="gotoRouteHandle(menu)">
    <i class="iconfont" :class="menu.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from './subMenu'
export default {
  name: 'sub-menu',
  props: {
    menu: {
      type: Object
    }
  },
  components: { SubMenu },
  methods: {
    gotoRouteHandle (menu) {
      this.$router.push({name: menu.filename})
    }
  }
}
</script>
