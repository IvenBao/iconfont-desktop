<route>
{
  "meta": {
    "navigation": true
  }
}
</route>

<style lang="scss">
@include b(page-illustration-detail) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
  @include e(bottombar) {
    z-index: 1;
    @extend .absolute-bottom;
    @extend .backdrop;
  }
}
</style>

<template>
  <div class="app-page-illustration-detail">
    <div class="app-page-illustration-detail__content">
      <app-scroll-group ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        <div slot="footer" :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-list-illustration
          :value="list.data"
          :selected="listMixinSelectedStatus"
          :unique-key="list.setting.uniqueKey"
          @click-item="listMixinTryToggleItemSelect"/>
      </app-scroll-group>
    </div>
    <div ref="topbar" class="app-page-illustration-detail__topbar">
      <v-container class="px-0">
        <v-skeleton-loader
          height="72"
          type="list-item-avatar-two-line"
          :loading="list.status.isSearching"
          transition="fade-transition">
          <div flex="cross:center">
            <app-avatar
              :user-id="creatorId"
              :avatar="creatorAvatar"
              :name="creatorNickname"
              :size="64"
              text-class="text-h4"
              class="mr-4"/>
            <div>
              <div class="text-h6">{{ collectionName }}</div>
              <div class="text-caption">{{ collectionCountIcons }} icons</div>
              <div class="text-caption">{{ creatorNickname }}</div>
            </div>
          </div>
        </v-skeleton-loader>
      </v-container>
    </div>
    <div ref="bottombar" class="app-page-illustration-detail__bottombar">
      <v-container class="px-0">
        <app-list-toolbar
          :is-selected-all="listMixinIsSelectedAll"
          :is-select-active="list.select.active"
          :selected-count="listMixinIsSelectedCount"
          @select-all-change="listMixinOnSelectAllChange"
          @click-selected="onClickSelected"
          @select-active-change="listMixinOnSelectActiveChange"/>
      </v-container>
    </div>
  </div>
</template>

<script>
import bus from '@/bus.js'

import { fromPairs, get, omit } from 'lodash-es'
import { mapState } from 'vuex'

import mixinPageUI from '@/mixins/page-ui.js'
import mixinPageList from '@/mixins/page-list.js'

export default {
  mixins: [
    mixinPageUI,
    mixinPageList
  ],
  data () {
    return {
      list: {
        page: {
          size: 120
        }
      },
      detail: {}
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...fromPairs([
      ['collectionName', 'collection.name', ''],
      ['collectionCountIcons', 'collection.icons_count', 0],
      ['creatorId', 'creator.id', 0],
      ['creatorNickname', 'creator.nickname', ''],
      ['creatorAvatar', 'creator.avatar', '']
    ].map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
  },
  watch: {
    detail: 'uiLoad'
  },
  created () {
    this.listMixinLoad()
  },
  methods: {
    async listMixinLoad () {
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.collectionDetail({
        id: this.$route.query.id,
        illustration: true
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.icons
      this.detail = Object.freeze(omit(result, 'icons'))
    },
    /**
     * @description 列表中的某一项被点击 这个事件只应该在非多选模式时被触发
     */
    onClickItem (item, index) {
      bus.$emit('preview-illustrations', [item])
    },
    /**
     * @description 在多选模式时 触发了查看已选项目详情
     */
    onClickSelected () {
      bus.$emit('preview-illustrations', this.listMixinSelectedData)
    }
  }
}
</script>
