## 计算appserver请求hotspot的平均时间，排除静态文件：
>grep -P 'url=/(api|app|order).*host=hotspot' -r server.log.rig.20150120* | grep -oP 'cost_time=\d+\b'  |  cat /tmp/cost2 |awk -F'=' '{sum+=$2} END {print "Average = ", sum/NR}' 

