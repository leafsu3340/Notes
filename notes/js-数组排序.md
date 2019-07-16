#### 1.数组排序

```
sortByLevel() {
        this.isSortByLevel = !this.isSortByLevel
        this.Exlist.sort((v1, v2) => {
          if (this.isSortByLevel) {
            return Number.parseInt(v2[0].ainfo.level, 10) - Number.parseInt(v1[0].ainfo.level, 10)
          }
          return Number.parseInt(v1[0].ainfo.level, 10) - Number.parseInt(v2[0].ainfo.level, 10)
        })
      }
```



#### 2.js(数据映射)

```
sortByLevel() {
      let data = [['紧急', 1], ['重要', 2], ['一般', 3]]
      let mapData = new Map(data)
      this.isSortByLevel = !this.isSortByLevel
      this.EventList.sort((v1, v2) => {
        if (this.isSortByLevel) {
          return mapData.get(v2[0].eventrecord.level) - mapData.get(v1[0].eventrecord.level)
        }
        return mapData.get(v1[0].eventrecord.level) - mapData.get(v2[0].eventrecord.level)
      })
    }
```