<template>
  <div class="echarts">
    <div id="main"></div>
  </div>
</template>
<script>
// import echarts from 'echarts'
export default {
  name: 'charts',
  data () {
    return {
      option: {
        title: {
          text: 'Google Trends',
          link: 'http://www.google.com/trends/hottrends'
        },
        tooltip: {
          show: true
        },
        series: {
          name: 'Google Trends',
          type: 'wordCloud',
          size: ['80%', '80%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 14
          },
          data: []
        }
      }
    }
  },
  computed: {
    data () {
      return [
        {
          name: 'Sam S Club',
          value: 10000,
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          name: 'Macys',
          value: 6181,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Amy Schumer',
          value: 4386,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Jurassic World',
          value: 4055,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Charter Communications',
          value: 2467,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Chick Fil A',
          value: 2244,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Planet Fitness',
          value: 1898,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Pitch Perfect',
          value: 1484,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Express',
          value: 1112,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Home',
          value: 965,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Johnny Depp',
          value: 847,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Lena Dunham',
          value: 582,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Lewis Hamilton',
          value: 555,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'KXAN',
          value: 550,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Mary Ellen Mark',
          value: 462,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Farrah Abraham',
          value: 366,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Rita Ora',
          value: 360,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Serena Williams',
          value: 282,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'NCAA baseball tournament',
          value: 273,
          itemStyle: this.createRandomItemStyle()
        },
        {
          name: 'Point Break',
          value: 265,
          itemStyle: this.createRandomItemStyle()
        }
      ]
    }
  },
  mounted () {
    this.option.data = this.data
    this.$nextTick(() => {
      this.charts()
    })
  },
  methods: {
    createRandomItemStyle () {
      return {
        normal: {
          color: 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        }
      }
    },
    charts () {
      // let myChart = echarts.init(document.getElementById('main'));
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
