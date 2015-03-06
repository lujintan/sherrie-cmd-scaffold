<!DOCTYPE html>
{%html framework="common:static/js/core/mod.js"%}
    {%head%}
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="apple-touch-icon-precomposed" href=""/>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

        {%block name="header"%}
            <title></title>
        {%/block%}

        {%require name="common:static/css/main.scss"%}
        {%block name="css_block"%}
        {%/block%}
    {%/head%}

    {%body class="route-{%$tplData.widgettype%}"%}

        {%widget_block pagelet_id="pager"%}
            {%block name="main"%}{%/block%}
        {%/widget_block%}

        {%widget_block pagelet_id="pre_load"%}
            {%block name="pre_main"%}{%/block%}
        {%/widget_block%}

        {%block name="footer"%}
        {%/block%}

        {%block name="js_block"%}
        {%/block%}

        {%widget name="common:widget/loading/loading.tpl"%}
        {%require name="common:static/js/lib/zepto.min.js"%}
        {%require name="common:static/js/lib/lodash.min.js"%}
        {%require name="common:static/js/lib/fastclick.js"%}

        {%require name="common:static/js/lib/lazyload.js"%}
        {%require name="common:static/js/core/mod.js"%}
        {%require name="common:static/js/core/BigPipe.js"%}
        {%require name="common:static/js/core/page.js"%}
    {%/body%}
{%/html%}
