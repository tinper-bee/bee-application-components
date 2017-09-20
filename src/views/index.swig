{% extends 'layout/layout.swig' %}

{% block css %}
    <link href="//developer.yyuap.com/portal/index.css" rel="stylesheet" media="screen">
    <link href="//design.yonyoucloud.com/static/yunicon/iconfont.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
    <link rel="stylesheet" href="//highlightjs.org/static/demo/styles/atom-one-dark.css">
{% endblock %}


{% block script %}
    <script src="http://design.yonyoucloud.com/static/jquery/1.11.2/jquery.js"></script>
    <script>
        window.isOpenTab = true;
    </script>
    <script src="//cdn.bootcss.com/d3/3.5.17/d3.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script>

    </script>
{% endblock %}


{% block content %}
    <div id="app">  </div>
{% endblock %}
