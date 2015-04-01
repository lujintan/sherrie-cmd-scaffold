{%extends file="./base.tpl"%}

{%block name="main"%}
	{%widget name="app:widget/navigation/navigation.tpl"%}
	{%widget name="app:widget/header-start/header-start.tpl" pagelet_id="pagelet_header_doc"%}
	{%widget name="app:widget/content-start/content-start.tpl" pagelet_id="pagelet_content"%}
{%/block%}

{%block name="footer"%}

{%require name='app:page/start.tpl'%}{%/block%}