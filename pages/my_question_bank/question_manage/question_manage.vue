<template>
	<view class="container">
		<view class="header-wrap">
			<view class="question-bank-name">{{ question_bank_name }}</view>
			<view class="info-wrap">
				<view class="owner">出题人：
					<text class="owner-name">{{ owner_info.username }}</text>
				</view>
				<view class="question-count">总题数：{{ questions.length }}题</view>
			</view>
			<input class="search-wrap" placeholder="输入题库关键字搜搜" />
			<view class="type-wrap">
				<view class="type-select" @click="showTypeSelect = true">
					{{ currentSelectType ? currentSelectType.label : '全部类型' }}
					<text class="tn-icon-down"></text>
				</view>
				<view class="unfold" @click="isShowDetail = !isShowDetail">
					<text class="tn-icon-eye"></text>
					{{ isShowDetail ? '收起' : '展开' }}详情
				</view>
			</view>
		</view>

		<view class="content-wrap">
			<tn-empty v-if="questions.length === 0" mode="list" style="margin-top: 100rpx;"></tn-empty>
			<view v-else class="question-list">
				<view v-for="(item, index) in questions" :key="item.id" class="question-item">
					<!-- 题目类型 -->
					<view class="question-info-wrap">
						<view class="question-type">{{ item.type | questionTypeFilter }}</view>
						<view class="icons-wrap">
							<text class="tn-icon-edit" @click="editQuestion(item)"></text>
							<text class="tn-icon-delete" @click="deleteQuestion(item)"></text>
						</view>
					</view>
					<!-- 题目 -->
					<view class="question-content-wrap">{{ index + 1 }}.{{ item.question.content }}</view>
					<!-- 题目详情 -->
					<view class="question-detail" v-if="isShowDetail">
						<view class="options-wrap">
							<view class="option-item" v-for="(option, index) in getOptions(item)" :key="option.id">
								<view class="option-index">{{ String.fromCharCode(65 + index) }}.</view>
								<view class="option-content">{{ option.content }}</view>
							</view>
						</view>
						<text class="question-answer">
							<text style="color: darkgray;margin-right: 10rpx;">[答案]</text>
							{{ getAnswerText(item) }}
						</text>
						<view v-if="item.analysis" class="question-analysis">
							<text style="color: darkgray;margin-right: 10rpx;">[解析]</text>
							{{ item.analysis.content }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-wrap">
			<view class="btn-wrap">
				<!-- <tn-button width="320rpx" height="80rpx" :fontSize="32">批量整理</tn-button> -->
				<tn-button @click="showMore" width="500rpx" height="80rpx" :fontSize="32" backgroundColor="#5fa3fb" fontColor="#FFF">添加题目</tn-button>
			</view>
		</view>

		<!-- 选择题型 -->
		<tn-select v-model="showTypeSelect" @cancel="resetSelectType" mode="single" cancelText="重置" :list="typeList" @confirm="confirmTypeSelect"></tn-select>
	</view>
</template>

<script>
import question_manage from './question_manage'
export default question_manage
</script>

<style lang="scss">
@import './question_manage.scss';
</style>
