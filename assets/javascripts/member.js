(function() {
    
    var match = window.location.search.match(/[\?\&]openid=(\w+)(&|$)/);
    var openId = match ? match[1] : '';
    
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
        initView: function() {
            this.getToken();
        },
        sendCode: function(e) {
            e.preventDefault && e.preventDefault();
            var mobile = this.$('input[name=mobile]').val();
            if (!mobile) return;
            localStorage.setItem('mobile', mobile);
            var self = this;
            var url = Amour.APIHost + '/BoseWechat.Service/Api/Sms/SendValidCodeWithReturn';
            $.post(url, {
                'mobile': mobile,
                'openid': openId
            }, function(data) {
                console.log(data);
                if (!data) return;
                if (data.Code == 0) {
                    self.$('input[name=code]').val(data.Result);
                } else {
                    alert(data.Description);
                }
            });
        },
        register: function(e) {
            e.preventDefault && e.preventDefault();
            var mobile = this.$('input[name=mobile]').val();
            var code = this.$('input[name=code]').val();
            if (!mobile || !code) return;
            localStorage.setItem('mobile', mobile);
            if (!this.$('input[type=checkbox]').is(':checked')) return;
            var self = this;
            var url = Amour.APIHost + '/BoseWechat.Service/Api/MemberCenter/MemberBinding';
            $.post(url, {
                'mobile': mobile,
                'validcode': code,
                'openid': openId
            }, function(data) {
                console.log(data);
                if (!data) return;
                if (data.Code != 0) {
                    alert(data.Description);
                }
                self.getToken();
            });
        },
        getToken: function() {
            var mobile = localStorage.getItem('mobile');
            if (!mobile) return;
            var self = this;
            var url = Amour.APIHost + '/BoseWechat.Service/Api/Token';
            $.get(url, {
                'mobile': mobile,
                'openid': openId
            }, function(data) {
                console.log(data);
                if (!data) return;
                if (data.Code == 0) {
                    localStorage.setItem('auth-token', data.Result);
                    pages.credits.render();
                    $('#member-nav-credits').tab('show');
                }
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
            //this.render();
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
            var url = Amour.APIHost + '/BoseWechat.Service/Api/MemberCenter/PointsSearch';
            $.get(url, {
                'ticket': token
            }, function(data) {
                console.log(data);
                if (!data) return;
                if (data.Code == 0) {
                    var BP = data.Result.BusinessPoints;
                    var CP = data.Result.CampaignPoints;
                    self.$('.BP-Total').text(BP.TotalPoints);
                    self.$('.BP-Valid').text(BP.ValidPoints);
                    self.$('.CP-Total').text(CP.TotalPoints);
                    self.$('.CP-Valid').text(CP.ValidPoints);
                } else {
                    alert(data.Description);
                }
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
            var url = Amour.APIHost + '/BoseWechat.Service/Api/MemberCenter/MemberAdding';
            $.post(url, {
                'OpenID': openId,
                'Product': this.productData
            }, function(data) {
                console.log(data);
                if (!data) return;
                if (data.Code == 0) {
                    alert('提交成功');
                    self.$('input').val('');
                } else {
                    alert(data.Description);
                }
            });
        }
    }))({
        el: $('#member-tab-upload')
    });
    
})();
