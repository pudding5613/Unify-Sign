/**
 * 签到配置
 */
const SignConfig = {
  name: 'SignConfig',
  mixins: [mixin_common],
  data () {
    return {
      checked: [],
      configs: {
        supported_signs: [
          {
            name: '蚂蚁积分签到',
            script: 'AntCredits.js',
            enabled: true
          },
          {
            name: '全家签到',
            script: 'Fami.js',
            enabled: true
          },
          {
            name: '京东签到',
            script: 'JingDongBeans.js',
            enabled: false
          },
          {
            name: '米游社-原神签到',
            script: 'MiHoYou.js',
            enabled: true
          }
        ]
      }
    }
  },
  methods: {
    onConfigLoad: function (config) {
      this.checked = this.configs.supported_signs.filter(v => v.enabled).map(v => v.name)
      let self = this
      this.configs.supported_signs.forEach((sign, idx) => {
        $nativeApi.request('checkExecuted', { name: sign.name }).then(resp => {
          sign.executedInfo = resp.success ? '今日已执行 ' + resp.executedTime : '未执行'
          console.log(sign.name + ' 执行状态：' + sign.executedInfo)
          self.$set(self.configs.supported_signs, idx, sign)
        })
      })
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    toggleExecuted (name) {
      let self = this
      let idx = this.configs.supported_signs.map(sign => sign.name).indexOf(name)
      if (idx > -1) {
        let sign = this.configs.supported_signs[idx]
        let targetExecutedStatus = false
        if (!sign.executedInfo || sign.executedInfo === '未执行') {
          targetExecutedStatus = true
        }
        this.$dialog.confirm({
          message: `确定要将${name}标记为${targetExecutedStatus ? '已执行' : '未执行'}吗？`
        }).then(() => {
          let resolver = resp => {
            sign.executedInfo = resp.success ? '今日已执行 ' + resp.executedTime : '未执行'
            self.$set(self.configs.supported_signs, idx, sign)
          }
          if (targetExecutedStatus) {
            sign.executedInfo = '今日已执行'
            $nativeApi.request('setExecuted', { name: name }).then(resolver)
          } else {
            sign.executedInfo = '未执行'
            $nativeApi.request('markNotExecuted', { name: name }).then(resolver)
          }
        })
      }
    }
  },
  watch: {
    enabledSigns: function (v) {
      this.checked = v
    },
    checked: function (v) {
      this.configs.supported_signs.forEach(s => s.enabled = false)
      if (v && v.length > 0) {
        this.configs.supported_signs.filter(s => v.indexOf(s.name) > -1).forEach(s => s.enabled = true)
      }
      console.log(JSON.stringify(this.checked))
    }
  },
  template: `<div>
    <van-divider content-position="left">\
      设置启用的签到\
    </van-divider>\
    <van-checkbox-group v-model="checked">\
      <van-cell-group>\
        <van-swipe-cell v-for="(supportedSign,index) in configs.supported_signs" :key="supportedSign.name" stop-propagation>\
          <van-cell clickable \
            :title="supportedSign.name" @click="toggle(index)" :label="supportedSign.executedInfo">\
            <template #right-icon>\
              <van-checkbox :name="supportedSign.name" ref="checkboxes" />\
            </template>\
          </van-cell>\
          <template #right>\
            <van-button square type="danger" text="切换执行状态" @click="toggleExecuted(supportedSign.name)" style="height: 100%"/>\
          </template>\
        </van-swipe-cell>\
      </van-cell-group>\
    </van-checkbox-group>\
  </div>`
}
