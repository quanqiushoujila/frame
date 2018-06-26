export default {
  methods: {
    storeState (name) {
      return this.$store.state[name]
    },
    storeMutation (module, name, val) {
      return this.$store.commit(`${module}/${name}`, val)
    }
  }
}
