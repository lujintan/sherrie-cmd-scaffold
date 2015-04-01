{%require name="app:widget/header-start/header-start.scss"%}

<div class="header-start header">
 	<!-- Main component for a primary marketing message or call to action -->
  	<div class="container">
    	<h1>Start</h1>
    	<p>简要介绍Rosetta,以及如何下载、使用等等</p>
  	</div>
</div>

{%script%}
    Rosetta.invoke('header-start', function() {
        var headerStart = require('app:widget/header-start/header-start.js');
        new headerStart(this.container);
    })
{%/script%}