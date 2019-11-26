---
title: git使用笔记
date: 2019-01-11T03:05:51.039Z
---

1.  配置`git`常用操作别名

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

1.  `git`设置默认的 Push Remote

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

1.  清理本地 git 分支

    - 清理已合并的分支

    ```bash
    git branch -d $(git branch --merged=master | grep -v master)
    git fetch --prune
    ```

    - 清理所有本地分支,慎重使用

    ```bash
    git branch | xargs git branch -d
    ```

1. `git diff`

    Git 如果不做设置，默认的 diff 是按行去做的，这种 diff 的方式看起来并不那么的直观，特别是如果你是在做代码的微调，行 diff 不是那么容易让你掌握到改了东西。另外一种情况是，如果你改的是文档类的，比如 markdown，行 diff 就更不可读了,尤其是代码格式化之后。
    设置`word-diff` 之后就很直观了

    ```bash
    git diff --word-diff

    ```

    - config Beyond Compare

    ```bash
    git config --global diff.tool bc3
    git config --global merge.tool bc3
    git config --global mergetool.bc3.trustExitCode true
    ```

    - dir-diff

    ```bash
    git difftool origin/master --dir-diff
    ```

1. 清理.DS_Store

    Remove existing files from the repository:  
    ```sh
    find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
    ```

1. git checkout --theirs

  ```bash
  git ls-files --unmerged | perl -n -e'/\t(.*)/ && print "$1\n"' | uniq | xargs -r git checkout --theirs --
  ```

> [A simple way to clean up your git project branches](https://medium.com/@FlorentDestrema/a-simple-way-to-clean-up-your-git-project-branches-283b87478fbc)  
>[progit](https://gitee.com/progit/)
