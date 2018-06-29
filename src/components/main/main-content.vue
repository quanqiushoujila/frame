<template>
  <div class="main-content">
    <div class="main-wrapper">
      <el-tabs v-model="editableTabsValue" type="card" editable>
        <el-tab-pane
          :key="item.name"
          v-for="item in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <el-card class="box-card">
            {{item.content}}
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainContent',
  data () {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-content {
    position: relative;
    margin-left: $navWidth;
    padding-top: $headerHeight;
    .main-wrapper {
      position: relative;
      padding: 55px 15px 15px;
      background-color: #fff;
      height: 100px;
    }
  }
</style>
