<template>
  <el-row :gutter="20" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }" class="parame">
    <el-col :span="14" :offset="4">
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="rule-form">
        <el-form-item label="logo" prop="logo">
          <el-input v-model="formData.logo"></el-input>
        </el-form-item>
        <el-form-item label="是否门户" prop="isGateway">
          <el-select v-model="formData.isGateway" class="db">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题风格" prop="themeStyle">
          <el-select v-model="formData.themeStyle" class="db">
            <el-option
              v-for="item in skins"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {sysParameSkin, sysParameList} from 'js/api/system/parame'
import clonedeep from 'lodash/clonedeep'
export default {
  name: 'kParame',
  data () {
    return {
      formData: {
        logo: '',
        isGateway: '',
        themeStyle: ''
      },
      rules: {
        logo: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        isGateway: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        themeStyle: [
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      },
      skins: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    }
  },
  methods: {
    init () {
      this.getData()
      this.getSkin()
    },
    onSubmit () {
      let data = clonedeep(this.formData)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!', data)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    getSkin () {
      sysParameSkin().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.skins = res.data
        }
      })
    },
    getData () {
      sysParameList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          console.log(res)
          for (let key in this.formData) {
            this.formData[key] = res.data[key]
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parame {
  .el-select, .el-cascader {
    width: 100%;
  }
}
</style>
