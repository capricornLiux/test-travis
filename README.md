# 配置Travis CI进行项目自动化测试部署发布
## 步骤
1. 在Github创建项目
2. 登录Travis CI官网, 使用Github账号进行授权登录
3. 登录之后, 能够看到自己的public的项目, 列表, 点击进行开启Travis CI
4. clone 项目代码到本地, 编写项目业务代码, 测试脚本等等...
  ```json
  {
    "name": "test-travis",
    "version": "1.0.0",
    "description": "test-travis-ci",
    "main": "index.js",
    "scripts": {
        "test": "mocha add.test.js"
    },
    //...
    "devDependencies": {
        "chai": "^4.1.2",
        "mocha": "^5.0.4",
        "webpack": "^3.10.0"
    }
  }
```
5. 配置本地开发机和远程要部署的服务器之间的免密登录(SSH)
  * 本地开发机 **~/.ssh**目录下
    * config (ssh配置文件)
    ```sh
    host "aly"
    HostName *.*.*.*
    User ***
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ```
    * id_rsa (本地私钥)
  * 远程要部署的服务器 **~/.ssh** 目录下
    * authorized_keys (**公钥, 本地生成的公钥, 拷贝到远程服务器的这个文件下**)
6. 在项目中创建**.travis.yml** 文件, 编写travis配置
  ```sh
    language: node_js
    node_js:
    - 6.10.3
    branches:
    only:
    - master

    before_install:
    - openssl aes-256-cbc -K $encrypted_81a1c7f01cae_key -iv $encrypted_81a1c7f01cae_iv
    -in id_rsa.enc -out id_rsa -d

    - mv id_rsa ~/.ssh -f

    # 改变文件权限
    - chmod 600 ~/.ssh/id_rsa

    # 配置 ssh
    - eval $(ssh-agent)
    - ssh-add ~/.ssh/id_rsa
    - cp .travis/ssh_config ~/.ssh/config

    after_script:
    - scp -o StrictHostKeyChecking=no index.js root@47.104.88.163:/root
```
    * 注意, *encrypted_81a1c7f01cae_key*中的*81a1c7f01cae*需要在travis配置中查找 **More Options => settings** 下面就能看见
7. 创建.travis->ssh_config, 配置travis服务器的ssh config文件, 进行travis和远程部署服务器的ssh连接
  ```sh
    User root
    Host 47.104.88.163
    StrictHostKeyChecking no
    IdentityFile ~/.ssh/id_rsa

    IdentitiesOnly yes
    ```
8. commit, push项目到远程仓库, 在travis ci中就能看见build的过程了~~😆



