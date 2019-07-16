
```
<script type="text/javascript">
    var xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    xhr.ontimeout = function (event) {
        alert("请求超时！");
    }
    var formData = new FormData();
    formData.append('tel', '18217767969');
    formData.append('psw', '111111');
    xhr.open('POST', 'http://www.test.com:8000/login');
    xhr.send(formData);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
        else {
            alert(xhr.statusText);
        }
    }
</script>
```
使用XMLHttpRequest (XHR)对象可以与服务器交互。您可以从URL获取数据，而无需让整个的页面刷新。这使得Web页面可以只更新页面的局部，而不影响用户的操作。XMLHttpRequest在 Ajax 编程中被大量使用。

* xhr.readyState：XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。
* xhr.status：服务器返回的状态码，等于200表示一切正常。
* xhr.responseText：服务器返回的文本数据
* xhr.responseXML：服务器返回的XML格式的数据
* xhr.statusText：服务器返回的状态文本。