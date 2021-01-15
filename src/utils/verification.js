// 自定义表单验证
// 手机号验证
export function MobileNumberValidator (e) {
  const idcardReg = /^1(3|4|5|6|7|8|9)\d{9}$/
  if (e.target.value && !idcardReg.test(e.target.value)) {
    const arr = [{
      message: '请输入正确的手机号码格式',
      field: 'projectLeaderPhone'
    }]
    this.form.setFields({ projectLeaderPhone: { value: e.target.value, errors: arr } })
  }
}
