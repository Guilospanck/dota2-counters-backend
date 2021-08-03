# Dota 2 Counters - Backend
Backend hosted on an EC2 Amazon instance to serve as backend to the react native application Dota2CountersReactNative.

---

## Some configurations to remember

### FOR NODE APPLICATIONS YOU'LL NEED PM2:
1) Install PM2 on your server 
```bash
npm install pm2@latest -g
```
:arrow_right: ```PM2``` it's a package that is going to run the process in the background.

2) Go to your ```server.js``` folder and run  
```bash
pm2 start server.js
```  
:arrow_right: If you have problems and need to add node params, you can do something like: 
```bash
pm2 start server.js --node-args="--max-http-header-size=16384"
```

Other configs to pm2:
```bash
pm2 status
pm2 restart {index}
```

---

### TO FORWARD PORTS IN UBUNTU:

1) ```cat /proc/sys/net/ipv4/ip_forward```  :arrow_right: verify if port forwarding is enabled (1: enabled, 0: disabled)
2) if disabled (0), then:
    - ```sudo nano /etc/sysctl.conf```
    - uncomment the following line: ```net.ipv4.ip_forward```
    - ```sudo sysctl -p /etc/sysctl.conf```  (to enable changes)
3) ```cat /proc/sys/net/ipv4/ip_forward``` :arrow_right: verify if port forwarding is enabled (1: enabled, 0: disabled)
4) set port forwarding:
```bash
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport {PORT_OF_YOUR_INSTANCE} -j REDIRECT --to-port {PORT_OF_YOUR_SERVER_APPLICATION}
```
For e.g.: 
```bash
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```
where:
        - {PORT_OF_YOUR_INSTANCE} is the port opened on your machine (usually 80, 443, 22 ...)
        - {PORT_OF_YOUR_SERVER_APPLICATION} is the port that you're listening on your application (on server.js for node)
5) Now open your firewall to that port
```bash
sudo iptables -A INPUT -p tcp -m tcp --sport {PORT_OF_YOUR_INSTANCE} -j ACCEPT
```
For e.g.:
```bash
sudo iptables -A INPUT -p tcp -m tcp --sport 80 -j ACCEPT)
```
And:
```bash
sudo iptables -A OUTPUT -p tcp -m tcp --dport {PORT_OF_YOUR_INSTANCE} -j ACCEPT
```

---

### TO SET CRONTAB:   
1) Enable cron: sudo systemctl enable cron
2) Type   crontab -e    and then enter
3) select nano as your editor (usually option 1)
4) Set your crontab service (go to cron guru for examples)
```bash
30 03 * * * python3 /home/ubuntu/dota2cp/dotabuff_scrapper.py
```
It'll run dotabuff_scrapper.py everyday at 03:30am.

  :arrow_right: (don't forget the "/" before the path in "/home...", otherwise will not work)
  
  :arrow_right: (always test before, in other words, test on the terminal: python3 /home/ubuntu/dota2cp/dotabuff_scrapper.py)
