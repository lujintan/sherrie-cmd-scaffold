<div class="mp-manage-routes">
	
	<ul>
		<li>
			<label class="mp-manage-label"><span class="require">*</span>景区外部路线</label>
			<div class="mp-manage-inputbox">
				<span class="mp-manage-input-text">
					<textarea name="outerTraffic" node-type="inputtext" class="textarea-control input textarea" type="textarea" placeholder="请填写景区外部路线" style="width: 350px;margin-bottom: 24px;"></textarea>
					<sup class="input-limit"><i node-type="inputnumber" class="input input-number">0</i>/<b class="input-total">2000</b></sup>
					<span class="tips-msg" >此项不能为空</span>
				</span>	
			</div>	

		</li>

		<li>
			<label class="mp-manage-label"><span class="require">*</span>景区内部路线</label>
			<div class="mp-manage-inputbox">
				<span class="mp-manage-input-text">
					<textarea name="innerTraffic" node-type="inputtext" class="textarea-control input textarea" type="textarea" placeholder="请填写景区内部路线" style="width: 350px; margin-bottom: 24px;"></textarea>
					<sup class="input-limit"><i node-type="inputnumber" class="input input-number">0</i>/<b class="input-total">2000</b></sup>
					<span class="tips-msg">此项不能为空</span>
				</span>
			</div>	

		</li>
		<li>
			<label class="mp-manage-label"><span class="require">*</span>景区地址</label>
			<div class="mp-manage-inputbox">
				<a href="javascript:void(0)" id="mp-manage-routes-mapBtn" class="mark-to-map">标记到地图
				</a>
				<span style="border:none;">
					<input type="hidden" name="tourAddress" />
					<span class="tips-msg">此项不能为空</span>
				</span>
			</div>
		</li>
		<li class="savebox"><button class="mp-manage-savebutton" node-type="submit">保存并预览</button></li>
	</ul>

	<br />
</div>

