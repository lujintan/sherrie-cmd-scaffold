{%extends file="./base.tpl"%}

{%block name="main"%}

    {%widget name="app:widget/header/header.tpl" nocache%}

    {%widget name="app:widget/`$widgettype``$tplType|default:'skiing'`/`$tplType|default:'skiing'`.tpl" pagelet_id="pagelet_detail"%}

{%/block%}


{%block name="footer"%}
    {%widget name="app:widget/footer/footer.tpl" nocache%}
{%/block%}

