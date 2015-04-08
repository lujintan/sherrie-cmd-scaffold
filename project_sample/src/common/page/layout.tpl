<!DOCTYPE html>
{%html framework="common:static/js/lib/rosetta.js"
    <%if (fid) {%>fid="<%=fid%>" sampleRate="<%=sampleRate%>"<%}%>%}
    {%head%}
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="apple-touch-icon-precomposed" href=""/>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

        <title>
            {%block name="header"%}
                demo
            {%/block%}
        </title>

        {%require name="common:static/css/main.scss"%}
        {%block name="css_block"%}
        {%/block%}
    {%/head%}

    {%body%}
        {%widget_block pagelet_id="pager"%}
            {%block name="main"%}{%/block%}
        {%/widget_block%}

        {%widget_block pagelet_id="pre_load"%}
            {%block name="pre_main"%}{%/block%}
        {%/widget_block%}

        {%block name="footer"%}
        {%/block%}

        {%require name="common:static/js/lib/zepto.min.js"%}
        {%require name="common:static/js/lib/fastclick.js"%}
        {%require name="common:static/js/lib/lodash.min.js"%}

        {%block name="js_block"%}
        {%/block%}

        {%widget name="common:widget/loading/loading.tpl"%}

    {%/body%}
{%/html%}
