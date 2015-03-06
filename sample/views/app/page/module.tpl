{%extends file="./base.tpl"%}

{%block name="pre_main"%}
    {%widget name="app:widget/header/header.tpl" nocache%}

    {%widget name="app:widget/`$tplType`/`$tplType`.tpl" pagelet_id="pagelet_pre"%}

{%/block%}


{%block name="footer"%}
    {%widget name="app:widget/footer/footer.tpl" nocache%}
{%/block%}