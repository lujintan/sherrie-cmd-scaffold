{%extends file="./base.tpl"%}

{%block name="main"%}
	{%widget name="app:widget/navigation/navigation.tpl"%}
	{%widget name="app:widget/header-doc/header-doc.tpl" pagelet_id="pagelet_header_doc"%}
	{%widget name="app:widget/content-doc/content-doc.tpl" pagelet_id="pagelet_content"%}
{%/block%}

{%block name="footer"%}

{%/block%}