var fullurlObj = document.getElementById('fullurl')
var copyUrlObj = document.getElementById('copyUrl')
var createUrlText = document.getElementById('createUrlText')
var tip = document.getElementById('tips')
var btn = document.getElementById('createUrl')
window.onload = function () {
  btn && btn.addEventListener('click', function () {
    if (fullurlObj.value == '') {
      showError('请输入链接')
      return
    }
    createUrlText.innerHTML = createUrl(fullurlObj.value)
    copyUrl()
  })

  copyUrlObj && copyUrlObj.addEventListener('click', function () {
    if (fullurlObj.value == '') {
      showError('请输入链接')
      return
    }
    copyUrl()
  })
}

function copy_clipper () {
  createUrlText.focus();
  createUrlText.select();
  var result = document.execCommand('copy', true);
  if (result === 'unsuccessful') {
    showTip('复制失败')
  }
  else {
    showTip('复制成功')
  }
}
function copyUrl() {
  copy_clipper()
}
function createUrl (url) {
  // 小程序webview页面会自动补齐项目基础路径部分，因此这里截取掉那部分
  return '/pages/view/view?url=' + encodeURIComponent(url.replace('https://xxxx.com/xxx', ''))
}
function showError (message) {
  showTip(message, '错误')
  tip.style.color = 'red'
}
function showTip (message, title = '通知') {
  tip.style.color = 'green'
  tip.innerHTML = `${title}：${message}`
  tip.style.display = 'block'
  setTimeout(function () {
    tip.style.display = 'none'
  }, 3000)
}
