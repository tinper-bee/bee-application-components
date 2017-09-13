
import {Router} from 'director/build/director';

window.router = new Router();


function designClickFn(){
    var str='<div class="modal-dialog modal-center"><div class="modal-content"><div class="modal-header"><button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button><h4 class="modal-title">编辑小部件</h4></div><div class="modal-body"><div class="site-items list-unstyled"><div class="widget-create-edit"><div class="panel-body"><form  class="widget-form" ><div id="editModal" class="margin-bottom-15"></div><div id="errorMessage"></div><div class="modal-footer"><button class="u-button u-button-info font-size-14" data-type="save" type="button" id="modelSave" style="height: 36px;">保存</button><button data-dismiss="modal" class="u-button margin-left-10 font-size-14" type="button" style="height: 36px;border: 1px solid #cecece;">取消</button></div></form></div></div></div></div></div></div>';
    $('#modalBlue').html(str);
}
designClickFn();

var routeInit = function (p) {
    return function () {
        var module = p;
        var content = document.getElementById("content");
        requirejs([module], function (module) {
            if(typeof ko != "undefined")
                ko.cleanNode(content);
            content.innerHTML = "";
            module.init(content);
        });
    }
};
var initLayout = function(p, params) {
    var module = p;
    var load = window.require;
    requirejs.undef(module);
    if (params.length == 1)
        params = params[0]
    load([ module ], function(module) {
        $('#content').html('');
        module.init(params);
    })
}

//注册路由
window.registerRouter = function (id, path) {
    router.on(id, routeInit(path));
};
window.addRouter = function(path, func){
    var pos = path.indexOf('/:');
    var truePath = path;
    if (pos != -1)
        truePath = path.substring(0, pos);
    func = func || function() {
            var params = arguments;
            initLayout(contextRoot+'/data:layout' + truePath, params);
        }
    var tmparray = truePath.split("/");
    if (tmparray[1] in router.routes
        && tmparray[2] in router.routes[tmparray[1]]
        && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
        return;
    } else {
        router.on(path, func);
    }
}

router.on('/widget', function () {
    var widget = require('../js/ext/widget.js');
    widget.init();
});
//布局站点管理
router.on('/layouts', function () {
    var sites = require('../js/ext/layoutList.js');
    sites.init();
});

//布局模板管理
router.on('/layout/template', function (id, viewid) {
    var layout = require('../js/ext/template.js');
    layout.init();
});
router.on('/design',function(){
    var id=getParamUrl('lid',$('.unsortable').attr('data-ul'));
    var version=$('#content').attr('v');
    $('#content').attr('identity','normal');
    var layout = require('../js/ext/layout.js');
    var param = {
        id: id,
        element:'designerContent',
        modifytime:decodeURIComponent(version),
        router:id
    };
    layout.init(param);
    designClickFn();
});
//设计器
router.on('/layout/:id/:modifytime/back/:router', function (id,modifytime,router) {
    var layout = require('../js/ext/layout.js');
    var param = {
        id: id,
        element:'designerContent',
        modifytime:decodeURIComponent(modifytime),
        router:router
    };
    layout.init(param);
    designClickFn();
});

router.on('after','/layout/:id/:modifytime/back/:router', function (id,modifytime,router) {
    $('.modal-backdrop').fadeOut(function(){
        $(this).remove();
    })
});


router.on('/home/:viewid', function (viewid) {
    initLayout(contextRoot + "/data:layout/" + viewid, []);
});


router.on('/layout/:id/:viewid', function (id, viewid) {
    var layout = require('../js/ext/layout.js');
    var param = {
        id: id,
        viewid: viewid
    }
    layout.init(param);
    designClickFn();
});

router.on('/sidebar/:id/:viewid', function (id, viewid) {
    var layout = require('../js/ext/layout.js');
    var param = {
        id: id,
        viewid: viewid
    }
    layout.init(param);
});

router.on('/ifr/:id', function (id) {

    var ctn = document.getElementById("content");
    ctn.innerHTML = '';
    var ifr = document.createElement("iframe");
    ifr.setAttribute("allowtransparency",true);
    ifr.src = decodeURIComponent(decodeURIComponent(id));
    ifr.style.width = '100%';
    ifr.style.border = 'none';
    ctn.appendChild(ifr);
    var autodiv = $(ifr);

    function autoH() {
        var addh = $(window).height() - 55;
        autodiv.height(addh);
    }
    autoH();
    if (autodiv) {
        autodiv.css({overflow: "auto"});
        $(window).resize(function () {
            autoH();
        })
    }
});
router.on('/ifrNoHead/:id', function (id) {
    var ctn = document.body;
    ctn.innerHTML = '';
    var ifr = document.createElement("iframe");
    ifr.setAttribute("allowtransparency",true);
    ifr.src = decodeURIComponent(decodeURIComponent(id));
    ifr.style.width = '100%';
    ifr.style.border = 'none';
    ctn.appendChild(ifr);
    var autodiv = $(ifr);

    function autoH() {
        var addh = $(window).height() - 55;
        autodiv.height(addh);
    }
    autoH();
    if (autodiv) {
        autodiv.css({overflow: "auto"});
        $(window).resize(function () {
            autoH();
        })
    }
});


router.on('/userMapping/relevance/:systemCode', function (systemCode) {
    var userMapping = require('../js/ext/userRelevance.js');
    userMapping.init(systemCode,document.getElementById('content'));
});


module.exports = router;








