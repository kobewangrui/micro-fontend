<template>
  <div class="webOuter">
      <div id="subapp-viewport"></div>
  </div>
</template>
<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from '@/store'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/'
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  },
  methods: {
    goto (item) {
      this.isShowProject = true;
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
  computed: {
    user () {
      return store.getGlobalState('user')
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {
  },
}
</script>

<style lang="scss">
*{
  margin: 0 !important;
  padding: 0;
}
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
.webOuter{
  width: 100%;
  height: 100%;
}
</style>
