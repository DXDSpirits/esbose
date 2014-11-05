(function() {
    
    var openId = '7777777';
    
    $('.view').css('min-height', $(window).height());
    $('#view-member-bg').css({
        height: $(window).height(),
        width: $(window).width()
    });
    
    function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    }
    
    if (typeof WeixinJSBridge == "undefined") {
        $(document).on('WeixinJSBridgeReady', onBridgeReady);
    } else {
        onBridgeReady();
    }
    
    
    /*
     * Ajax events
     */
    
    var timeout = 1000;
    var timeout_stop, timeout_error;
    
    Amour.ajax.on('start', function() {
        clearTimeout(timeout_stop);
        clearTimeout(timeout_error);
        $('#apploader').removeClass('invisible');
    });
    
    Amour.ajax.on('stop', function() {
        timeout_stop = setTimeout(function () {
            $('#apploader').addClass('invisible');
            timeout = 1000;
        }, timeout);
    });
    
    Amour.ajax.on('error', function() {
        $('#apploader .ajax-error').removeClass('hidden');
        timeout_error = setTimeout(function () {
            $('#apploader .ajax-error').addClass('hidden');
        }, (timeout = 2500));
    });
    
    /*
     * Pages
     */
    
    var pages = {};
    
    pages.register = new (Amour.View.extend({
        events: {
            'click .btn-send': 'sendCode',
            'click .btn-bind': 'register',
        },
        sendCode: function(e) {
            e.preventDefault && e.preventDefault();
            var self = this;
            var url = Amour.APIHost + '/BoseWechat/Api/Sms/SendValidCodeWithReturn';
            $.post(url, {
                'mobile': this.$('input[name=mobile]').val(),
                'openid': openId
            }, function(data) {
                console.log(data.Result);
                self.$('input[name=code]').val(data.Result);
            });
        },
        register: function(e) {
            e.preventDefault && e.preventDefault();
            var self = this;
            var url = Amour.APIHost + '/BoseWechat/Api/MemberCenter/MemberBinding';
            $.post(url, {
                'mobile': this.$('input[name=mobile]').val(),
                'validcode': this.$('input[name=code]').val(),
                'openid': openId
            }, function(data) {
                self.getToken();
            });
        },
        getToken: function() {
            var self = this;
            var url = Amour.APIHost + '/BoseWechat/Api/Token';
            $.get(url, {
                'mobile': this.$('input[name=mobile]').val(),
                'openid': openId
            }, function(data) {
                console.log(data.Result);
                localStorage.setItem('auth-token', data.Result);
                pages.credits.render();
            });
        }
    }))({
        el: $('#member-tab-register')
    });
    
    pages.credits = new (Amour.View.extend({
        events: {
            'hide.bs.collapse .panel-collapse': 'hidePanel',
            'show.bs.collapse .panel-collapse': 'showPanel'
        },
        initView: function() {
            this.render();
        },
        hidePanel: function(e) {
            var $target = $(e.currentTarget);
            $target.siblings('.panel-heading').find('.icon').removeClass('in');
        },
        showPanel: function(e) {
            var $target = $(e.currentTarget);
            $target.siblings('.panel-heading').find('.icon').addClass('in');
        },
        render: function() {
            var token = localStorage.getItem('auth-token');
            if (!token) return;
            var self = this;
            var url = Amour.APIHost + '/BoseWechat/Api/MemberCenter/PointsSearch';
            $.get(url, {
                'ticket': token
            }, function(data) {
                console.log(data.Result);
            });
        }
    }))({
        el: $('#member-tab-credits')
    });
    
    a = pages.upload = new (Amour.View.extend({
        events: {
            'change input[name=receipt]': 'uploadReceipt',
            'change input[name=warranty]': 'uploadWarranty',
            'click .btn-upload': 'sendUpload'
        },
        initView: function() {
            this.productData = {};
        },
        readImage: function(e, name) {
            console.log(e.target.files);
            file = e.target.files[0];
            reader = new FileReader();
            var self = this;
            reader.onloadend = function() {
                console.log(reader.result);
                self.productData[name] = reader.result;
            }
            reader.readAsDataURL(file);
        },
        uploadReceipt: function(e) {
            this.readImage(e, 'BinaryReceipt');
        },
        uploadWarranty: function(e) {
            this.readImage(e, 'BinaryWarranty');
        },
        sendUpload: function(e) {
            e.preventDefault && e.preventDefault();
            this.productData['SerialNumber'] = this.$('input[name=serial]').val();
            var self = this;
            var url = Amour.APIHost + '/BoseWechat/Api/MemberCenter/MemberAdding';
            $.post(url, {
                'OpenID': openId,
                'Product': this.productData
            }, function(data) {
                console.log(data);
            });
        }
    }))({
        el: $('#member-tab-upload')
    });
    
})();
