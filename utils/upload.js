import config from "./config"

const base_url = config.API_PREFIX

class Upload {
    uploadImage() {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: 1,
                type: 'image',
                success: res => {
                    uni.uploadFile({
                        url: `${base_url}/upload`,
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        success: res => {
                            res = JSON.parse(res.data)
                            if (res.status === 200) {
                                resolve(res)
                            } else {
                                uni.showToast({
                                    title: res.message,
                                    icon: 'none'
                                })
                                reject(res)
                            }
                        },
                        fail: err => {
                            uni.showToast({
                                title: err,
                                icon: 'none'
                            })
                            reject(err)
                        }
                    })
                }
            })
        })
    }

    
}

export default new Upload()