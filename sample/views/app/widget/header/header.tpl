{%require name="app:widget/header/header.scss"%}
<div class="mp-modules-header theme-bg-color">
    <div class="mp-nav-left">
        <a class="react back" href="javascript:history.go(-1);"><i class="text-icon icon-back"></i></a>
    </div>
    <h1 class="mp-nav-header">{%$title%}</h1>
    <div class="mp-nav-right"></div>
</div>

{%script%}
    Cpt.invoke('mp-modules-header', function(){
        var header = require('app:widget/header/header.js');

        new header(this.container);
    });
{%/script%}