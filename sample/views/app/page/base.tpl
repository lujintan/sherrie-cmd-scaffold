{%extends file="common/page/layout.tpl"%}

{%block name="css_block"%}
    {%include file="./gvars.tpl"%}

    <style>
        {%if $tplData.isBox %}
            .mp-page-title{display: none;}
            .mp-modules-header{display: none !important;}
            .detail-header{display: none !important;}
        {%/if%}
        .theme-bg-color {
            background: {%$tplData.style.themeColor|default:'#00a3e7'%};
        }
        .theme-br-color {
            border-color: {%$tplData.style.themeColor|default:'#00a3e7'%};
        }
        .theme-font-color {
            color: {%$tplData.style.themeColor|default:'#00a3e7'%};
        }
    </style>
    {%require name="app:static/css/app/page.scss"%}
{%/block%}

{%block name="js_block"%}
    {%require name="app:static/js/app/init.js"%}
{%/block%}