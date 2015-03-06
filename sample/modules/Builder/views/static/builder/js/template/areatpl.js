define(function  (argument) {
    return {
        template:'<div class="control-group">
                    <label class="control-label"><span class="require">*</span>店铺地址：</label>
                    <div id="shopAddress" class="controls shop-address">
                        <div class="address-control">
                            <select class="area-select" name="province_id" id="selectProvince">
                                <option value="<%=province_id%>">省份</option>
                            </select>
                            <select class="area-select" name="city_id" id="selectCity">
                                <option value="<%=city_id%>">城市</option>
                            </select>
                            <select class="area-select" name="region_id" id="selectArea">
                                <option value="<%=region_id%>">区域</option>
                            </select>
                            <span class="input-text textarea-control">
                                <textarea type="textarea" data-validator="require|max:200" value="<%=address_street%>" placeholder="填写街道具体地址" name="address_street"><%=address_street%></textarea>
                            </span>
                        </div>
                        <% if (sp_name ) {%>
                             <% if (address_street ) {%>
                            <div class="address-control-mask dis"></div>
                            <%} else {%>
                            <div class="address-control-mask"></div>
                            <% } %>
                        <%} else {%>
                        <div class="address-control-mask dis"></div>
                        <%}%>                    
                        <span class="mark-control">
                            <a href="javascript:;" class="mark-to-map" data-spname="<%=sp_name%>" data-lat="<%=coordinate_y%>" data-lng="<%=coordinate_x%>">标注到地图</a>
                        </span>
                        <span class="controls-msg address-msg"></span>             
                        <span class="checkbox-control">
                            <input type="checkbox" class="input-none dis" id="biz_lic_forever" name="address-none">
                            <% if (sp_name) {%>
                                <% if (address_street)%>
                                <label class="input-checkbox" for="address-none"></label>
                                <%} else { %>
                                <label class="input-checkbox checked" for="address-none"></label>
                                <% } %>
                            <% } else {%>
                            <label class="input-checkbox" for="address-none"></label>
                            <% }%>
                            <label for="address-none-text" class="address-none-text">&nbsp;暂无地址</label>
                        </span>
                    </div>
                </div>'
    }
})