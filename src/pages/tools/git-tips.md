---
title: git使用笔记
date: 2019-01-11T03:05:51.039Z
---

1. 配置`git`常用操作别名

    ```bash
    git config --global --edit
    ```

    添加以下配置

    ```bash
    [alias]
      co = checkout
      ci = commit
      st = status
      br = branch
      hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
      type = cat-file -t
      dump = cat-file -p
      rb = rebase -i --autosquash
      pr = remote prune origin
    ```

1. `git`设置默认的Push Remote

    在使用`git push`的时候，经常会碰到这种情况  

    ```bash
    fatal: The current branch newFeature has no upstream branch.
    To push the current branch and set the remote as upstream, use

        git push --set-upstream origin newFeature
    ```

    配置推送到远端的默认分支就可解决

    ```bash
    git config --global push.default current
    ```

1. 清理本地git分支

    * 清理已合并的分支

    ```bash
    git branch -d $(git branch --merged=master | grep -v master)
    git fetch --prune
    ```

    * 清理所有本地分支,慎重使用

    ```bash
    git branch | xargs git branch -d
    ```

>[A simple way to clean up your git project branches](https://medium.com/@FlorentDestrema/a-simple-way-to-clean-up-your-git-project-branches-283b87478fbc)