{%extends file="./base.tpl"%}

{%block name="main"%}
	{%widget name="app:widget/navigation/navigation.tpl"%}
    {%widget name="app:widget/header-home/header-home.tpl" pagelet_id="pagelet_header"%}
    {%widget name="app:widget/content-home/content-home.tpl" pagelet_id="pagelet_content"%}
{%/block%}

{%block name="footer"%}

{%require name='app:page/home.tpl'%}{%/block%}

