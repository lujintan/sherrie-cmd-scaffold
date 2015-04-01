{%extends file="common/page/layout.tpl"%}

{%block name="css_block"%}
    {%include file="./gvars.tpl"%}

    {%require name="app:static/css/app/page.scss"%}
    {%require name="app:static/css/core/bootstrap.css"%}
{%/block%}

{%block name="js_block"%}
    {%require name="app:static/js/app/init.js"%}
{%require name='app:page/base.tpl'%}{%/block%}