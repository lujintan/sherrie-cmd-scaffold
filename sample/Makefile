include mydev
#Create a file named "mydev"
#Write your dev machine's account&address in "mydev"
#eg:dev="work@dbl-wise-rdtt50.vm"
#also you can run this Command: echo dev=\"work@dbl-wise-rdtt50.vm.baidu.com\" > mydev

## Description: Makefile
APP_NAME=hotspot
DPL_ROOT=/home/work
UI_FRAME=orp
APP_ROOT=$(DPL_ROOT)/$(UI_FRAME)

MYENV="_myenv.hotspot"
MYENV_PATH="$(APP_ROOT)/$(MYENV)"

# Common conf
APP_PATH="$(APP_ROOT)/app/$(APP_NAME)"
CONF_PATH="$(APP_ROOT)/conf/app/$(APP_NAME)"
WEBROOT_PATH="$(APP_ROOT)/webroot/$(APP_NAME)"
APP_SRC_FILE=actions Bootstrap.php controllers library models plugins conf views modules template template_builder
# Backup conf, 时间维度的不变的变量实现 FIXME
MD5=$$(md5sum /etc/sysconfig/network|cut -b 0-32)
TMP=date +%Y%m%d-%H%M%S>$(DPL_ROOT)/backup/$(UI_FRAME)/app/last_make_version_app
BACKUPDIR=$(DPL_ROOT)/backup/$(UI_FRAME)/app/$$(cat $(DPL_ROOT)/backup/$(UI_FRAME)/app/last_make_version_app)/
# backup code dir; 按需备份,不备份多余，备份时自动过滤多余目录层级
BACKCODE=$(APP_ROOT)/conf/app/$(APP_NAME) $(APP_ROOT)/app/$(APP_NAME)
# syntax conf
SYNTAXPATH=$(APP_ROOT)/app/$(APP_NAME)/ $(APP_ROOT)/webroot/$(APP_NAME)

dev :

	@echo -e "\033[32m\033[1m[ info ]\033[0m Deploy machine : \033[31m\033[1m$(dev)\033[0m"
	@echo -e "\033[32m\033[1m[ info ]\033[0m Make START at: "`date '+%Y-%m-%d %H:%M:%S'`
	@# pretreatment
	@ssh $(dev) "mkdir -p $(DPL_ROOT)/backup/$(UI_FRAME)/app/;$(TMP)" # just generate the last make version config

	@# backup old code
	@echo -e "\033[31m\033[1m[step-1]\033[0m Back your old code in your dev machine...";
	@ssh $(dev) 'mkdir -p $(BACKUPDIR);for cate in $(BACKCODE); do zz=$$(echo $$cate|sed -e "s:$(APP_ROOT)/\([^/]*\)/.*:\1:g"); cmd="cp -r $$cate $(BACKUPDIR)/$$zz";`$$cmd`; done; mkdir -p $(MYENV_PATH); cp -r $(MYENV_PATH) $(BACKUPDIR)/'

	@# deploy $(UI_FRAME) $(APP_NAME) code
	@echo -e "\033[31m\033[1m[step-2]\033[0m deploy your develop $(APP_NAME) ORP code...";
	@ssh $(dev) "\rm -rf $(APP_PATH) $(WEBROOT_PATH) $(CONF_PATH); mkdir -p $(APP_PATH); mkdir -p $(CONF_PATH); mkdir -p $(WEBROOT_PATH);"
	@tar zcf $(APP_NAME).tgz $(APP_SRC_FILE);
	@scp -r $(APP_NAME).tgz $(dev):$(APP_PATH) 1>/dev/null; scp -r index.php $(dev):$(WEBROOT_PATH) 1>/dev/null;
	@rsync -ar --exclude='.svn' $(MYENV) $(dev):$(APP_ROOT) 1>/dev/null;
	@\rm $(APP_NAME).tgz
	@ssh $(dev) "cd $(APP_PATH); tar zxf $(APP_NAME).tgz; \rm $(APP_NAME).tgz; find ./ -type d -name .svn|xargs -i rm -rf {};mv conf/* $(CONF_PATH); \rm -rf conf"

syntax : dev

	@# check PHP syntax
	@echo -e "\033[32m\033[1m[EXT:syntax]\033[0m check php syntax...";
	@ssh $(dev) "find $(SYNTAXPATH) -type f -name '*.php' -exec $(APP_ROOT)/php/bin/php -ln {} \; | grep -v 'No syntax'";

