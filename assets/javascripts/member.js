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
        hidePanel: function(e) {
            var $target = $(e.currentTarget);
            $target.siblings('.panel-heading').find('.icon').removeClass('in');
        },
        showPanel: function(e) {
            var $target = $(e.currentTarget);
            $target.siblings('.panel-heading').find('.icon').addClass('in');
        }
    }))({
        el: $('#member-tab-credits')
    });
    
    pages.upload = new (Amour.View.extend({
        events: {
            'change input[name=receipt]': 'uploadReceipt',
            'change input[name=warranty]': 'uploadWarranty'
        },
        uploadReceipt: function(e) {
            console.log(e.target.files);
            file = e.target.files[0];
            reader = new FileReader();
            reader.onloadend = function() {
                console.log(reader.result);
            }
            reader.readAsDataURL(file);
        },
        uploadWarranty: function() {
            
        }
    }))({
        el: $('#member-tab-upload')
    });
    
})();
