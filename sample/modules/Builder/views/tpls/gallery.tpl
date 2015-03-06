<div class="mp-manage-gallery" id="mp-manage-gallery">
	<div class="mp-manage-gallery-uploadoption">
	
		<div class="typeone" node-type="radio" data-selection="baidulvyou" node-id="baidulvyouRadio">
			<div class="lefticon"><span class="icon"></span></div>
			<div class="typebox">
				<div class="typeoneicon"></div>
				<div class="typeinfo">
					<span class="title">方式一</span>
					<span class="tip">导入百度旅游数据</span>
				</div>
			</div>
		</div>

		<div class="typetwo" node-type="radio" data-selection="customer" node-id="customerRadio">
			<div class="lefticon"><span class="icon"></span></div>
			<div class="typebox">
				<div class="typetwoicon"></div>
				<div class="typeinfo">
					<span class="title">方式二</span>
					<span class="tip">手动录入百度旅游数据</span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="mp-manage-uploadcontainer">
		<div class="mp-manage-baidulvyou" node-id="baidulvyou">
			<ul>
				<li>
					<label class="mp-manage-label"><span class="require">*</span>选择百度旅游链接：</label>
					<div class="mp-manage-inputbox">
						<select node-id="dataSelect" class="mp-manage-select">
							<option value="http://lvyou.baidu.com/feilaifeng/?fr=zhida#picAlbum">飞来峰</option>
							<option value="http://lvyou.baidu.com/guozhuang/?fr=zhida#picAlbum">郭庄</option>
							<option value="http://lvyou.baidu.com/taiziwangongyuan/?fr=zhida#picAlbum">太子湾公园</option>
							<option value="http://lvyou.baidu.com/hangzhoudongwuyuan/?fr=zhida#picAlbum">杭州动物园</option>
							<option value="http://lvyou.baidu.com/hupaomengquan/?fr=zhida#picAlbum">虎跑梦泉</option>
						</select>
					</div>
				</li>
				<li>
					<button node-type='baidulvyousubmit' class="mp-manage-savebutton submit">保存并预览</button>
				</li>
			</ul>
		</div>
		<div class="mp-manage-customer" node-id="customer">
			<div class="mp-manage-atlasListContainer">
				<ul class="mp-manage-atlasList" node-id="atlasList"></ul>
				<a href="javascript:void(0)" class="addbutton"  node-type="addAtlas"><span class="addicon"></span>添加图集</a>
			</div>

			<div class="mp-manage-atlasform" node-id="atlasform">
				<ul>
					<li class="atlasfromItem">
						<span node-id="atlasname" class="atlasnamelabel"></span>
					</li>
					<li class="atlasfromItem">
						<label class="mp-manage-label"><span class="require">*</span>图集标题：</label>
						<div class="mp-manage-inputbox">
							<span class="mp-manage-input-text">
								<input node-type="inputtext" style="width:375px;margin-right:40px;" type="text" class="input mp-manage-input" name="name" node-id="atlasTitle"/>
								<sup class="input-limit"><i node-type="inputnumber" class="input input-number">0</i>/<b class="input-total">20</b></sup>
								<span class="tips-msg">此项不能为空</span>
							</span>	
						</div>	
					</li>
					<li class="atlasfromItem uploadimg">
						<label class="mp-manage-label"><span class="require">*</span>图集图片：</label>
						<div class="mp-manage-inputbox">
							<span style="border:none">
								<button class="mp-manage-uploadbutton" node-type="uploadbtn" name="images">上传图片</button>
								<input style="display:none;" type="file" node-id="atlasupload" />
								<span class="uploadcount"> （还可以上传<span node-id="uploadImgNum">10</span>张）</span>
								<span class="tips-msg" node-type="tips-msg">文件格式不对</span>
							</span>
							<div class="mp-manage-uploadimages" node-id="uploadimages"></div>
							<span class="uploadimgtip">建议尺寸720px*400px小于500K；最多上传10张</span>
						</div>	
					</li>
					<li>
						<button node-id="atlas_submit" class="mp-manage-savebutton">保存并预览</button>
					</li>
				</ul>
			</div>
		</div>
	</div>

</div>