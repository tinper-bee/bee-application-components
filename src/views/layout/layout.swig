<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}iuap design{% endblock %}</title>
    <link rel="icon" href="logos/favicon.png" type="image/png" sizes="16x16">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="//design.yonyoucloud.com/static/react/tinper-bee.css" rel="stylesheet" media="screen">
    {% block head%}
        {#<link href="//design.yyuap.com/static/uui/latest/css/u.css" type="text/css" rel="stylesheet" />#}

        {#<link href="/css/tinper-bee.css" type="text/css" rel="stylesheet" />#}
    {% endblock%}
    {% block css %}{% endblock%}
</head>

<body >

{% block content %}

{% endblock %}

{% block script %}
    <!-- Jquery and Js Plugins -->
{% endblock %}

</body>
</html>
