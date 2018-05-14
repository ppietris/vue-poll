import Poll from './Poll.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-poll', Poll);
  }
};