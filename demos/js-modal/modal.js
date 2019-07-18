(function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  function Dialog(option) {
    var opt = option || {};
    this.title = opt.title || '标题';
    this.okText = opt.okText || '确定';
    this.cancelText = opt.cancelText || '取消';
    this.elem = null;
    this.id = guid();

    var htmStr = '<div class="modal">' +
      '<div class="footer">' +
      '<div class="title">' + this.title + '</div>' +
      '<button class="confirm btn">' + this.okText + '</button>' +
      '<button class="cancel btn" value="' + this.id + '" onclick="closeModal(this)">' + this.cancelText + '</button>' +
      '</div>' +
      '</div>';
    var node = document.createElement('div');
    node.className = 'modal-container';
    node.innerHTML = htmStr;
    node.id = this.id;
    document.getElementsByTagName('body')[0].appendChild(node);
    this.elem = node;


    this.show = function () {
      this.elem.dispatchEvent(new Event('show'));
    }

    this.on = function (name, callback) {
      this.elem.addEventListener(name, function () {
        callback();
      })
    }
  };
  window.Dialog = Dialog;
  window.closeModal = function (e) {
    var id = e.value;
    document.getElementById(id).dispatchEvent(new Event('off'));
    document.getElementById(id).remove();
  }
})(window);