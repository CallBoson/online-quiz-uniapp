<template>
	<view class="container">
		<view class="detail-wrap">
			<view class="detail-title">{{ quizDetail.title }}</view>
			<view class="detail-desc">描述：{{ quizDetail.description || '无' }}</view>
			<view class="numbers-wrap">
				<view class="numbers">
					<view class="numbers-item">
						<view class="numbers-item-title">题数</view>
						<view class="numbers-item-num">{{ quizDetail.question_count }}</view>
					</view>
					<view class="numbers-item">
						<view class="numbers-item-title">总分</view>
						<view class="numbers-item-num">{{ quizDetail.total_score }}</view>
					</view>
					<view class="numbers-item">
						<view class="numbers-item-title">限时（分钟）</view>
						<view class="numbers-item-num">{{ quizDetail.countdown_minutes || '无限制' }}</view>
					</view>
				</view>
				<view class="rules">
					<view v-if="quizDetail.date_range" class="rules-item">答题时间段：{{ quizDetail.date_range }}</view>
				</view>
			</view>
			<view class="owner-wrap">
				{{ quizDetail.username }}
				<view class="owner-tag">出题人</view>
			</view>
		</view>

		<view class="records-wrap">
			<view class="records-title">答题记录</view>
			<view class="records-list">
				<view class="records-item" v-for="(item) in quizDetail.records" :key="item.id">
					<view class="records-item-left">
						<view>答对/总题数</view>
						<view class="records-item-num">{{ item.correct_count }}/{{ quizDetail.question_count }}</view>
						<view>{{ `${formatDate(item.start_time)} &nbsp用时：${calcTime(item)}` }}</view>
					</view>
					<view class="records-item-right">
						<view class="records-item-score">{{ item.score }}分</view>
						<view class="records-item-btn" @click="goToResult(item.id)">查看</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-wrap">
			<view class="bottom-btn" @click="goToQuiz">开始答题</view>
		</view>
	</view>
</template>

<script>
import quiz_detail from './quiz_detail'
export default quiz_detail
</script>

<style lang="scss" scoped>
@import './quiz_detail.scss';
</style>
