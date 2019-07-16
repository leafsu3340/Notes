
```
/* js */
function jsonHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'json__number';

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json__key';
      } else {
        cls = 'json__string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json__boolean';
    } else if (/null/.test(match)) {
      cls = 'json__null';
    }

    return `<span class="${cls}">${match}</span>`;
  });
}

/* html */
<pre class="query-view__json-pretty" v-html="jsonHtml"></pre>

/* style */
.query-view__json-pretty {
    outline: none;
    background-color: #fff;
    border: none;
    .json__string { color: green; }
    .json__number { color: darkorange; }
    .json__boolean { color: blue; }
    .json__null { color: magenta; }
    .json__key { color: red; }
  }
```

