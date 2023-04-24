export default {
    data() {
        return {
            tab_list: [
                { "tab-name": '我加入的' },
                { "tab-name": '我管理的' },
            ],
            current_tab: 0,
            createTitleInput: '', // 创建群组标题
            joinIdInput: '', // 加入群组id
            groupList: [] // 群组列表
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        // 切换tab
        changeTab(e) {
            this.current_tab = e
            this.getList()
        },
        showMore() {
            uni.showActionSheet({
                itemList: ['创建群组', '加入群组'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        this.$refs.createPopup.open()

                    } else {
                        this.$refs.joinPopup.open()
                    }
                }
            })
        },
        getList() {
            uni.post('/group/my_groups', {
                type: this.current_tab == 0 ? 2 : 1
            }).then(res => {
                this.groupList = res.data
            })
        },
        create() {
            uni.post('/group/create', {
                title: this.createTitleInput
            }).then(res => {
                this.$refs.createPopup.close()
                this.createTitleInput = ''
                this.getList()
                uni.showToast({
                    title: '创建成功',
                    icon: 'none'
                })
            })
        },
        join() {
            uni.post('/group/join', {
                group_id: this.joinIdInput
            }).then(res => {
                this.$refs.joinPopup.close()
                this.joinIdInput = ''
                this.getList()
                uni.showToast({
                    title: '加入成功',
                    icon: 'none'
                })
            })
        },
        toDetail(id) {
            uni.navigateTo({
                url: '/pages/group/detail/detail?id=' + id
            })
        }
    }
}
