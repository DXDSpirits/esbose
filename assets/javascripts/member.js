(function() {
    
    var match = window.location.search.match(/[\?\&]openid=(.+)(&|$)/);
    var openId = match ? match[1] : '';
    
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
     * Pages
     */
    
    var pages = {};
    
    $('#member-nav-credits').on('shown.bs.tab', function() {
        pages.credits.render();
    });
    
    pages.register = new (Amour.View.extend({
        events: {
            'click .btn-send': 'sendCode',
            'click .btn-bind': 'register',
        },
        initView: function() {
            this.getToken();
        },
        lockSending: function() {
            var $btn = $('.btn-send');
            $btn.attr('disabled', true).html('<span>120</span> 秒后重发');
            var second = 120;
            var countdown = function(second) {
                if (second == 0) {
                    $btn.removeAttr('disabled').html('发送验证码');
                } else {
                    $btn.find('span').text(second);
                    _.delay(function() {
                        countdown(second-1);
                    }, 1000);
                }
            };
            countdown(120);
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
                    self.lockSending();
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
            if (!token) {
                alert('请先绑定会员');
                return;
            };
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
    
    pages.upload = new (Amour.View.extend({
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
            var file = e.target.files[0];
            /*if (file.size > 500 * 1024) {
                alert('您上传的图片过大，请选择500K以内的图片重新上传');
                return;
            }*/
            reader = new FileReader();
            var self = this;
            reader.onloadend = function() {
                console.log(reader.result);
                self.productData[name] = reader.result;
            };
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
            var token = localStorage.getItem('auth-token');
            if (!token) {
                alert('请先绑定会员');
                return;
            };
            var serialNumber = this.$('input[name=serial]').val() || '';
            if (serialNumber.length == 17 || serialNumber.length == 18) {
                this.productData['SerialNumber'] = serialNumber;
            } else {
                alert('请输入正确的产品SN码');
            }
            var self = this;
            var url = Amour.APIHost + '/BoseWechat.Service/Api/MemberCenter/PointsAdding';
            $.ajax({
                url: url,
                timeout: 60 * 1000, // 60 seconds
                data: {
                    //'OpenID': openId,
                    'Ticket': token,
                    'Product': this.productData
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (textStatus == 'timeout') {
                        alert('您上传的图片过大，请选择500K以内的图片重新上传');
                    }
                },
                success: function(data) {
                    console.log(data);
                    if (!data) return;
                    if (data.Code == 0) {
                        alert('提交成功');
                        self.$('input').val('');
                    } else {
                        alert(data.Description);
                    }
                }
            });
        }
    }))({
        el: $('#member-tab-upload')
    });
    
})();
