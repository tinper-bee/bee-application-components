{% extends 'layout/layout.swig' %}

{% block css %}
    <link href="//developer.yyuap.com/portal/index.css" rel="stylesheet" media="screen">
    <link href="//design.yonyoucloud.com/static/yunicon/iconfont.css" rel="stylesheet" media="screen">
{% endblock %}


{% block script %}
    <script src="http://design.yonyoucloud.com/static/jquery/1.11.2/jquery.js"></script>
    <script>
        window.isOpenTab = true;
    </script>
    <script src="//cdn.bootcss.com/d3/3.5.17/d3.min.js"></script>
{% endblock %}


{% block content %}
    <div id="app">  </div>
{% endblock %}
