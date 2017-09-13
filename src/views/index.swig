{% extends 'layout/layout.swig' %}

{% block css %}
    <link href="//developer.yyuap.com/portal/index.css" rel="stylesheet" media="screen">
    <link href="//design.yonyoucloud.com/static/yunicon/iconfont.css" rel="stylesheet" media="screen">
{% endblock %}


{% block script %}
    <script src="jquery-1.11.2.js"></script>
    <script>
        window.isOpenTab = true;
    </script>
    <script src="//d3js.org/d3.v3.min.js"></script>
{% endblock %}


{% block content %}
    <div id="app">  </div>
{% endblock %}
