<template>
  <view class="template-job tn-safe-area-inset-bottom">
    <!-- 搜索框 -->
    <view
      class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center"
    >
      <view
        class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left tn-color-gray--dark tn-bg-gray--light"
      >
        <view class="custom-nav__search__icon tn-icon-search"></view>
        <view class="custom-nav__search__text tn-padding-left-xs"
          >好想搜点什么</view
        >
      </view>
    </view>

    <view
      class="tn-margin-top"
      :style="{ paddingTop: vuex_custom_bar_height + 'px' }"
    >
      <tn-swiper
        :list="banner"
        :height="350"
        :effect3d="true"
        mode="round"
      ></tn-swiper>
    </view>

    <view class="create-btn">
      <button @click="toCreateQuiz">创建答题</button>
    </view>

    <view class="hot-test-wrap">
      <view
        class="test-item"
        v-for="item in hot_list"
        :key="item.id"
        @click="toQuizDetail(item.id)"
      >
        <view class="info-wrap">
          <view class="title">{{ item.title }}</view>
          <view class="desc">已答题{{ item.record_count }}次</view>
        </view>
        <cover :title="item.title" :src="item.cover" width="270rpx"></cover>
      </view>
    </view>
  </view>
</template>

<script>
import index from "./indexJs.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
