---
title: Fish Shell 使用笔记
date: 2019-01-10T03:51:23.415Z
---

1. 安装Fish Shell  

    ```sh
    brew install fish
    ```

1. 安装[Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)  

    ```sh
    curl -L https://get.oh-my.fish | fish
    ```

1. 安装[Fisher](https://github.com/jorgebucaran/fisher)

    ```sh
    curl https://git.io/fisher --create-dirs -sLo   ~/.config/fish/functions/fisher.fish
    ```

1. 配置 [autojump](https://github.com/wting/autojump)

    ```sh
    git clone https://github.com/wting/autojump.git
    ```

    * 安装 autojump 至本地 `~/.autojump` 目录:

    ```sh
    cd autojump
    ./install.py
    ```

    * 在fish配置中打开文件~/.config/fish/config。在编辑器中查找并添加以下行:

    ```sh
    begin
        set --local AUTOJUMP_PATH $HOME/.autojump/share/autojump/autojump.fish
        if test -e $AUTOJUMP_PATH
            source $AUTOJUMP_PATH
        end
    end
    ```

    * 退出fish，重新开始。使用cd命令访问常用目录。你现在可以使用j命令跳转到这些目录:

    ```sh
    exit
    j testDir
    ```

    * 跳转到当前目录的子目录:

    ```sh
    jc chid_dir
    ```

    * 查看`autojump`历史记录中的条目统计信息:

    ```sh
    j -s
    ```

    * 使用`finder`打开目录

    ```sh
    jo dir
    ```

1. 配置`nvm`

    * 使用fish之后，之前配置的`nvm`就不能用了，需要在`~/.config/fish/config`当中添加nvm的配 置

    ```sh
    begin
        set --local AUTOJUMP_PATH $HOME/.autojump/share/autojump/autojump.fish
        if test -e $AUTOJUMP_PATH
            source $AUTOJUMP_PATH
        end
        function nvm
            bass source ~/.nvm/nvm.sh --no-use ';' nvm $argv
        end
    end
    ```

1. 默认`shell`切换至`fish`

    ```sh
    echo /usr/local/bin/fish | sudo tee -a /etc/shells
    chsh -s /usr/local/bin/fish
    ```

>[switch to fish](https://fishshell.com/docs/current/tutorial.html#tut_switching_to_fish)  
>[Fish shell 入门教程](http://www.ruanyifeng.com/blog/2017/05/fish_shell.html)  
>使用版本:Autojump 22.5.1, Fish 3.0.0和Mac 10.14.2  