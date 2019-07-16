以npm安装msbuild为例：
npm install msbuild:

会把msbuild包安装到node_modules目录中
不会修改package.json
之后运行npm install命令时，不会自动安装msbuild
npm install --save:

会把msbuild包安装到node_modules目录中
会在package.json的dependencies属性下添加msbuild
之后运行npm install命令时，会自动安装msbuild到node_modules目录中
之后运行npm install --production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中
npm install --save-dev:

会把msbuild包安装到node_modules目录中
会在package.json的devDependencies属性下添加msbuild
之后运行npm install命令时，会自动安装msbuild到node_modules目录中
之后运行npm install --production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中
使用原则:

运行时需要用到的包使用--save，否则使用--save-dev。