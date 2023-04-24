<template>
	<view class="container">
		<tn-tabs
			:height="80"
			:list="tab_list"
			:isScroll="false"
			:current="current_tab"
			name="tab-name"
			@change="changeTab">
		</tn-tabs>

		<view class="quiz-list">
			<view
				class="quiz-item"
				v-for="item in quizList"
				:key="item.id"
				@click="toQuizDetail(item.id)">
				<cover :title="item.title" :src="item.cover" />
				<view class="info-wrap">
					<view class="quiz-title">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import my_quiz from './my_quiz'
export default my_quiz
</script>

<style lang="scss" scoped>
@import './my_quiz.scss';
</style>
