---
title: 常用的网络连通检测命令
date: 2019-02-14T03:21:04.610Z
---

1. ping

    ```sh
    # ping a host with a total count of 15 packets overall.    
    ping -c 15 www.example.com

    # ping a host with a total count of 15 packets overall, one every .5 seconds (faster ping). 
    ping -c 15 -i .5 www.example.com

    # test if a packet size of 1500 bytes is supported (to check the MTU for example)
    ping -s 1500 -c 10 -M do www.example.com

    ```

1. fping

    A more powerful ping which can ping multiple hosts.

    ```sh
    # List alive hosts within a subnet generated from a netmask:
    fping -a -g 192.168.1.0/24

    # List alive hosts within a subnet generated from an IP range:
    fping -a -g 192.168.1.1 192.168.1.254

    # List unreachable hosts within a subnet generated from a netmask:
    fping -u -g 192.168.1.0/24
    ```  

1. telnet

    ```sh
    # Connect to a specified port of a host using the telnet protocol.

    # Telnet to the default port of a host:
      telnet host

    # Telnet to a specific port of a host:
      telnet ip_address port

    # Exit a telnet session:
      quit

    # Emit the default escape character combination for terminating the session:
      Ctrl + ]

    # Start telnet with "x" as the session termination character:
      telnet -e x ip_address port
    ```

    * exit telnet

    `Escape character is '^]'.`
    Since ^X is CtrlX, try Ctrl] for ^].