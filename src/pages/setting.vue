<style lang="scss">
@include b(page-setting) {
  $sidebarWidth: 260px;
  @extend .absolute-parent;
  @include e(sidebar) {
    width: $sidebarWidth;
    @extend .absolute-left;
  }
  @include e(main) {
    left: $sidebarWidth;
    @extend .absolute-right;
  }
  @include e(main-content) {
    max-width: 600px;
  }
}
</style>

<route>
{
  "meta": {
    "sdk": true,
    "title": "设置",
    "icon": "mdi-tune",
    "sort": 6
  }
}
</route>

<template>
  <div class="app-page-setting">
    <div class="app-page-setting__sidebar">
      <app-scroll-group class="white">
        <v-list flat>
          <v-subheader>设置</v-subheader>
          <v-list-item-group
            :value="active"
            color="primary">
            <v-list-item
              v-for="menu of menus"
              :key="menu.value"
              :value="menu.value"
              @click="onClick(menu.value)">
              <v-list-item-icon>
                <v-icon>
                  {{ menu.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ menu.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </app-scroll-group>
    </div>
    <div class="app-page-setting__main">
      <app-scroll-group>
        <div class="app-page-setting__main-content mx-auto my-5">
          <router-view/>
        </div>
      </app-scroll-group>
    </div>
  </div>
</template>

<script>
import { menus } from '@/router.js'

export default {
  data () {
    return {
      menus: menus.setting
    }
  },
  computed: {
    active () {
      return this.$route.name
    }
  },
  methods: {
    onClick (name) {
      this.$router.push({ name })
    }
  }
}
</script>
