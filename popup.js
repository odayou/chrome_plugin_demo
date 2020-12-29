var fullurlObj = document.getElementById('fullurl')
var copyUrlObj = document.getElementById('copyUrl')
var createUrlText = document.getElementById('createUrlText')
var tip = document.getElementById('tips')
var btn = document.getElementById('createUrl')
var pageTypes = document.getElementsByName('pageType')
window.onload = function () {
  btn && btn.addEventListener('click', function () {
    createAndCopy()
  })

  copyUrlObj && copyUrlObj.addEventListener('click', function () {
    createAndCopy()
  })

  for (el of pageTypes) {
    el.addEventListener("change", function() {
      createAndCopy()
    })
  }
}
function createAndCopy() {
  if (fullurlObj.value == '') {
    showError('请输入链接')
    return
  }
  var urlType = getSelectUrlType()
  if (!urlType) {
    return showError('请选择链接投放渠道类型')
  }
  createUrlText.innerHTML = createUrl(fullurlObj.value, urlType)
  copyUrl()
}
function getSelectUrlType() {
  for( i = 0; i < pageTypes.length; i++) {
    if(pageTypes[i].checked) {
      return   pageTypes[i].value;
    }
  }
  return 0
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
function createUrl (url, urlType) {
  var miniUrl = ''
  switch (urlType) {
    case '1':
      miniUrl = '/pages/view/view'
      break;
    case '2':
      miniUrl = '/pages/index/index'
      break;
    default:
      miniUrl = '/pages/view/view'
  }
  // 小程序webview页面会自动补齐项目基础路径部分，因此这里截取掉那部分
  return miniUrl + '?url=' + encodeURIComponent(url.replace('https://x.xx.com/xx', ''))
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
