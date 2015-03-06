<div class="mp-intro-container">
    <div class="mp-intro-input-con mp-intro-input-con-name">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary">*</span>景区名称
        </div>
        <div class="mp-intro-input-right">
            <input type="text" class="mp-intro-name mp-intro-input-limit mp-intro-input-text" size=50>
            <div class="mp-intro-input-remind mp-intro-input-remind-text">
                <span class="mp-intro-necessary" type="length-now">0</span>
                /<span type="length-limit">50</span>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con mp-intro-imageupload">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary">*</span>景区图片
        </div>
        <div class="mp-intro-input-right">
            <div class="mp-intro-input-button-container">
                <button class="mp-intro-input-button mp-intro-input-button-margin">上传图片</button>
                <span>建议尺寸720px*400px,小于500KB;</span>
                <em></em>
            </div>
            <input type="file" name="mp-intro-image" class="mp-input-hidden">
            <div class="mp-intro-image-lists">
                <div class="mp-intro-image-container">
                    <div class="mp-intro-image-show" type="image-show"></div>
                </div>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con mp-intro-input-con-introduce">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary">*</span>景区介绍
        </div>
        <div class="mp-intro-input-right">
            <textarea class="mp-intro-detail mp-intro-input-limit mp-intro-input-textarea" rows="3"></textarea>
            <div class="mp-intro-input-remind mp-intro-input-remind-textarea">
                <span class="mp-intro-necessary" type="length-now">0</span>
                /<span type="length-limit">2000</span>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con mp-intro-input-con-address">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary"></span>景区地址
        </div>
        <div class="mp-intro-input-right">
            <input type="text" class="mp-intro-address mp-intro-input-limit mp-intro-input-text" >
            <div class="mp-intro-input-remind mp-intro-input-remind-text">
                <span class="mp-intro-necessary" type="length-now">0</span>
                /<span type="length-limit">50</span>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary"></span>景区开放时间
        </div>
        <div class="mp-intro-input-right">
            <input type="text" class="mp-intro-open mp-intro-input-text" disabled>
            <div class="mp-intro-time-container" data-type="open-time">
                <input type="text" id="datetimepicker-open-starttime" class="mp-datetimepicker mp-intro-datetimepiker">
                <div class="mp-intro-datetimepiker-block"> - </div>
                <input type="text" id="datetimepicker-open-endtime" class="mp-datetimepicker mp-intro-datetimepiker">
                <div class="mp-intro-datetimepiker-block"> - </div>
                <select class="mp-intro-select-open">
                    <option value="" selected="">同一日</option>
                    <option value="次日">次日</option>   
                </select>&nbsp;
                <span class="mp-intro-necessary" type="text-alert"></span>
                <div class="mp-intro-datetimepiker-icon1"></div>
                <div class="mp-intro-datetimepiker-icon2"></div>
                <div style="clear:both;"></div>
            </div>

        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con">
        <div class="mp-intro-input-left">
            <span class="mp-intro-necessary"></span>最佳旅游时间
        </div>
        <div class="mp-intro-input-right">
            <input style="float:left" type="text" class="mp-intro-best mp-intro-input-text" disabled>
            <div class="mp-intro-time-container" data-type="best-time">
                <input type="text" id="datetimepicker-best-starttime" class="mp-datetimepicker mp-intro-datetimepiker">
                <div class="mp-intro-datetimepiker-block"> - </div>
                <input type="text" id="datetimepicker-best-endtime" class="mp-datetimepicker mp-intro-datetimepiker">
                <div class="mp-intro-datetimepiker-block"> - </div>
                <select class="mp-intro-select-best">
                    <option value="" selected="">同一年</option>
                    <option value="次年">次年</option>   
                </select>&nbsp;
                <span class="mp-intro-necessary" type="text-alert"></span>
                <div class="mp-intro-datetimepiker-icon1"></div>
                <div class="mp-intro-datetimepiker-icon2"></div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con">
        <div class="mp-intro-input-left">
            交通指南
        </div>
        <div class="mp-intro-input-right">
            <textarea class="mp-intro-traffic mp-intro-input-limit mp-intro-input-textarea" ></textarea>
            <div class="mp-intro-input-remind mp-intro-input-remind-textarea">
                <span class="mp-intro-necessary" type="length-now">0</span>
                /<span type="length-limit">250</span>
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
    <div class="mp-intro-input-con">
        <div class="mp-intro-input-left">
            &nbsp;
        </div>
        <div class="mp-intro-input-right">
            <button class="mp-intro-submit">保存并预览</button>
        </div>
    </div>
    <div style="clear:both;"></div>
</div>
<div style="display:none;">
    <p>用来测试线上是不是有这些参数，请忽略</p>
    <p>直达号逻辑：</p>
    <div>$global {%$global%} || $from {%$from%}</div>
    <a id="back_basic" class="return_btn" href="{%$builder_host|escape:html%}editapp/{%$sid|escape:html%}?zhida_refer={%$zhidaRefer|escape:url%}" target="_top">返回基本信息</a>
    
    <p>轻工厂逻辑：</p>
    <a id="back_basic" 
    href="{%$returnHost|escape:html%}/console#light!from={%$fromid|escape:html%}&ref={%$ref|escape:html%}&tpl={%$tplid|escape:html%}&appid={%$openid|escape:html%}" 
    target="_top">
        返回基本信息
    </a>
      
    <a id="blue_btn" 
    href="lego_manage?token={%$token|escape:html%}&openid={%$openid|escape:html%}&return_host={%$returnHost|escape:url%}">
        完成
    </a>
</div>
<link rel="stylesheet" type="text/css" href="/static/builder/css/lib/jquery.datetimepicker.css">
<link rel="stylesheet" type="text/css" href="/static/builder/css/introduce.css">