[SQL快速参考](http://www.w3school.com.cn/sql/sql_quickref.asp)

# SQL DML 和 DDL
可以把 SQL 分为两个部分：数据操作语言 (DML) 和 数据定义语言 (DDL)。
SQL (结构化查询语言)是用于执行查询的语法。但是 SQL 语言也包含用于更新、插入和删除记录的语法。

## 查询和更新指令构成了 SQL 的 DML 部分：

SELECT - 从数据库表中获取数据
UPDATE - 更新数据库表中的数据
DELETE - 从数据库表中删除数据
INSERT INTO - 向数据库表中插入数据

## SQL 的数据定义语言 (DDL) 部分使我们有能力创建或删除表格。我们也可以定义索引（键），规定表之间的链接，以及施加表间的约束。

SQL 中最重要的 DDL 语句:

CREATE DATABASE - 创建新数据库
ALTER DATABASE - 修改数据库
CREATE TABLE - 创建新表
ALTER TABLE - 变更（改变）数据库表
DROP TABLE - 删除表
CREATE INDEX - 创建索引（搜索键）
DROP INDEX - 删除索引

EG: 

1.SELECT 列名称 FROM 表名称
SELECT * FROM 表名


```
SELECT LastName,FirstName FROM Persons
```


2.SELECT DISTINCT 列名称 FROM 表名称
关键词 DISTINCT 用于返回唯一不同的值。

3.SELECT 列名称 FROM 表名称 WHERE 列 运算符 值


```
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'
SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William')
AND LastName='Carter'
```


4.

```
SELECT Company, OrderNumber FROM Orders ORDER BY Company
SELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC
```


5.INSERT INTO 表名称 VALUES (值1, 值2,....)
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)

6.
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

```
UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 
UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing'
WHERE LastName = 'Wilson'
```
7.DELETE FROM 表名称 WHERE 列名称 = 值

```
DELETE FROM Person WHERE LastName = 'Wilson'
DELETE FROM table_name
DELETE * FROM table_name
```
8.TOP 子句用于规定要返回的记录的数目。

```
// SQL Server
SELECT TOP number|percent column_name(s)
FROM table_name

SELECT TOP 50 PERCENT * FROM Persons

// MySQL 语法
SELECT column_name(s)
FROM table_name
LIMIT number

// Oracle 语法
SELECT column_name(s)
FROM table_name
WHERE ROWNUM <= number
```

9.

```
SELECT * FROM Persons
WHERE City LIKE 'N%'
```
提示："%" 可用于定义通配符（模式中缺少的字母）。

通配符: 
% : 替代一个或多个字符;
_ : 仅替代一个字符;
[charlist] : 字符列中的任何单一字符;
[^charlist]或者[!charlist] : 不在字符列中的任何单一字符;

10.

```
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1,value2,...)
```
11.
操作符 BETWEEN ... AND 会选取介于两个值之间的数据范围。这些值可以是数值、文本或者日期。
```
ELECT column_name(s)
FROM table_name
WHERE column_name
BETWEEN value1 AND value2
```

12.通过使用 SQL，可以为列名称和表名称指定别名（Alias）。
```
SELECT column_name(s)
FROM table_name
AS alias_name
```
我们可以使用下面的 SELECT 语句：
```
SELECT po.OrderID, p.LastName, p.FirstName
FROM Persons AS p, Product_Orders AS po
WHERE p.LastName='Adams' AND p.FirstName='John'
```
不使用别名的 SELECT 语句：
```
SELECT Product_Orders.OrderID, Persons.LastName, Persons.FirstName
FROM Persons, Product_Orders
WHERE Persons.LastName='Adams' AND Persons.FirstName='John'
```

```
SELECT LastName AS Family, FirstName AS Name
FROM Persons
```

13.

```
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons, Orders
WHERE Persons.Id_P = Orders.Id_P
```

```
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
// (内连)
INNER JOIN Orders
ON Persons.Id_P = Orders.Id_P
ORDER BY Persons.LastName
```
下面列出了您可以使用的 JOIN 类型，以及它们之间的差异。
JOIN: 如果表中有至少一个匹配，则返回行
LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
FULL JOIN: 只要其中一个表中存在匹配，就返回行

==注释：INNER JOIN 与 JOIN 是相同的。==

```
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
INNER JOIN Orders
ON Persons.Id_P=Orders.Id_P
ORDER BY Persons.LastName
```
14.UNION 操作符用于合并两个或多个 SELECT 语句的结果集（去重）。

```
SELECT column_name(s) FROM table_name1
UNION
SELECT column_name(s) FROM table_name2
```
UNION ALL 命令和 UNION 命令几乎是等效的，不过 UNION ALL 命令会列出所有的值。

15.SQL SELECT INTO 语句可用于创建表的备份复件。

SELECT INTO 语句从一个表中选取数据，然后把数据插入另一个表中。

SELECT INTO 语句常用于创建表的备份复件或者用于对记录进行存档。
```
SELECT *
INTO Persons_backup
FROM Persons
```
```
SELECT *
INTO Persons IN 'Backup.mdb'
FROM Persons
```
```
SELECT LastName,FirstName
INTO Persons_backup
FROM Persons
```
16.CREATE DATABASE database_name
17.
CREATE TABLE Persons
(
Id_P int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
约束用于限制加入表的数据的类型。可以在创建表时规定约束（通过 CREATE TABLE 语句），或者在表创建之后也可以（通过 ALTER TABLE 语句）。
我们将主要探讨以下几种约束：
NOT NULL
UNIQUE
PRIMARY KEY
FOREIGN KEY
CHECK
DEFAULT


```
CREATE TABLE Persons
(
Id_P int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
```

```
CREATE TABLE Persons
(
Id_P int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
UNIQUE (Id_P)
)
```
...

18.CREATE INDEX 语句用于在表中创建索引。
在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。

19.通过使用 DROP 语句，可以轻松地删除索引、表和数据库。

20.ALTER TABLE 语句用于在已有的表中添加、修改或删除列。
```
ALTER TABLE table_name
ADD column_name datatype
```
```
ALTER TABLE table_name 
DROP COLUMN column_name
```
```
ALTER TABLE table_name
ALTER COLUMN column_name datatype
```


