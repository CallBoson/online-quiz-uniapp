<template>
	<view class="m-container">
		<view class="content-wrap">
			<!-- 搜索框 -->
			<input class="search-wrap" placeholder="输入题库关键字搜搜" />

			<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 15px;">
				<view class="question-count">题库数：{{ myQuestionBankList.length }}</view>
				<tn-button backgroundColor="tn-bg-blue" fontColor="tn-color-white" @click="toCreate">新建</tn-button>
			</view>

			<tn-empty v-if="myQuestionBankList.length === 0" mode="data" style="padding-top: 300rpx;"></tn-empty>
			<view v-else class="question-bank-list">
				<view class="question-bank-item" v-for="item in myQuestionBankList" :key="item.id" @click="toDetail(item)">
					<view v-if="!item.cover" class="cover-wrap">{{ item.name }}</view>
					<image v-else class="cover-wrap" :src="item.cover" mode="aspectFill"></image>
					<view class="info-wrap">
						<view class="name">{{item.name}}</view>
						<view class="bottom-wrap">
							<view class="count">总题数：{{item.questionCount}}</view>
							<view class="more" @click.stop="showMore(item)">更多操作></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import my_question_bank from './my_question_bank';
export default my_question_bank;
</script>

<style lang="scss">
@import './my_question_bank.scss';
</style>
