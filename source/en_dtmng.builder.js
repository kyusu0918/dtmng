/********************************************************************************
 * 日時管理ティラノビルダープラグイン設定 ver1.0.0
 *
 * @see インタフェース英語版
 * @since 2025/04/10
 * @author Kei Yusu
 *
 *********************************************************************************/
'use strict';
module.exports = class plugin_setting {
    
    constructor(TB) {
        
        /* TBはティラノビルダーの機能にアクセスするためのインターフェスを提供する */
        this.TB = TB;
        
        /* プラグイン名を格納する */
        this.name= TB.$.s("DateTime Manage plugin");
        
        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("Makes it easy to handle in-game dates and real-world date/time.");
        
        /*プラグイン説明用の画像ファイルを指定する。プラグインフォルダに配置してください*/
        this.plugin_img = "dtmng.png";
        
    }
        
    /* プラグインをインストールを実行した時１度だけ走ります。フォルダのコピーなどにご活用ください。*/
    triggerInstall(){
        
        /*
        //プラグインからプロジェクトにファイルをコピーするサンプルです 
        var project_path = TB.getProjectPath() ; 
        var from_path = project_path + "data/others/plugin/plugin_template/copy_folder";
        var to_path = project_path + "data/image/copy_folder";
        TB.io.copy(from_path,to_path);
        */
        
    }
        
    /*
        追加するコンポーネントを定義します。
    */

    defineComponents(){
        
        var cmp = {};
        var TB = this.TB;
                        
        /********************************************************************************
         * 日時管理設定タグ作成
         *
         * @param scope 変数格納スコープ
         * @param id ID
         * @param datetime 日時
         * @since 2025/04/10
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_set"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Set DateTime"), /* コンポーネント名称 */
                "help":TB.$.s("Sets the datetime for the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Set DateTime"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){

                    return e.data.pm.id || ""

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{
                
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                    // 日付
                    "d" : {
                        type : "Text",
                        name : TB.$.s("Date (yyyyMMdd, 8-digit number)"),
                        help : TB.$.s("Please set the date. If left blank, the current date will be used."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "d", val);
                        }
    
                    },

                    // 時刻
                    "t" : {
                        type : "Text",
                        name : TB.$.s("Time (hhmmss, 6-digit number)"),
                        help : TB.$.s("Please set the time. If left blank, the current time will be used."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "t", val);
                        }
    
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時管理取得タグ作成
         *
         * @param scope 変数格納スコープ
         * @param id ID
         * @since 2025/04/10
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_get"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Get Datetime"), /* コンポーネント名称 */
                "help":TB.$.s("Gets the datetime from the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Get Datetime"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return e.data.pm.id || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時加算タグ作成
         *
         * @param scope 変数格納スコープ
         * @param id ID
         * @param years 加算年
         * @param months 加算月
         * @param days 加算日
         * @param hours 加算時
         * @param minutes 加算分
         * @param seconds 加算秒
         * @since 2025/03/31
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_add"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Add Datetime"), /* コンポーネント名称 */
                "help":TB.$.s("Adds years, months, days, hours, minutes, and seconds to the datetime in the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Add Datetime"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return e.data.pm.id || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                    // 加算年
                    "years" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Years to Add"), /*パラメータ名*/
                        unit : "Years", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of years to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -99, /*入力の最小値*/
                            max : 99, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // 加算月
                    "months" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Months to Add"), /*パラメータ名*/
                        unit : "Months", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of months to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -999, /*入力の最小値*/
                            max : 999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // 加算日
                    "days" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Days to Add"), /*パラメータ名*/
                        unit : "Days", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of days to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -9999, /*入力の最小値*/
                            max : 9999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // 加算時間
                    "hours" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Hours to Add"), /*パラメータ名*/
                        unit : "Hours", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of hours to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -99999, /*入力の最小値*/
                            max : 99999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // 加算分
                    "minutes" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Minutes to Add"), /*パラメータ名*/
                        unit : "Minutes", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of minutes to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -999999, /*入力の最小値*/
                            max : 999999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    // 加算秒
                    "seconds" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : TB.$.s("Seconds to Add"), /*パラメータ名*/
                        unit : "Seconds", /*単位を表示できます*/
                        help : TB.$.s("Please set the number of seconds to add."),
                        
                        default_val : 0, /*初期値*/
                        
                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : -9999999, /*入力の最小値*/
                            max : 9999999, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },
                        
                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                },
                                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時経過取得タグ作成
         *
         * @param scope1 変数格納スコープ1
         * @param id1 ID1
         * @param scope2 変数格納スコープ2
         * @param id2 ID2
         * @since 2025/03/31
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_past"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Datetime Elapsed"), /* コンポーネント名称 */
                "help":TB.$.s("Gets the elapsed time between the datetimes of ID1 and ID2 from the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Datetime Elapsed"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return (`${e.data.pm.id1} - ${e.data.pm.id2}`) || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ1
                    "scope1" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope1"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID1
                    "id1" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID1"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id1", val);
                        }

                    },

                    // 変数格納スコープ2
                    "scope2" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope2"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID2
                    "id2" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID2"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id2", val);
                        }

                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時差分取得タグ作成
         *
         * @param id1 ID1
         * @param scope1 変数格納スコープ1
         * @param id2 ID2
         * @param scope2 変数格納スコープ2
         * @since 2025/03/31
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_diff"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Datetime Difference"), /* コンポーネント名称 */
                "help":TB.$.s("Gets the datetime difference between ID1 and ID2 from the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Datetime Difference"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return (`${e.data.pm.id1} - ${e.data.pm.id2}`) || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ1
                    "scope1" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope1"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID1
                    "id1" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID1"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id1", val);
                        }

                    },

                    // 変数格納スコープ2
                    "scope2" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope2"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID2
                    "id2" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID2"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id2", val);
                        }

                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時管理削除タグ作成
         *
         * @param scope 変数格納スコープ
         * @param id ID
         * @since 2025/04/10
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_del"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Delete Datetime"), /* コンポーネント名称 */
                "help":TB.$.s("Deletes the datetime from the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Delete Datetime"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return e.data.pm.id || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{

                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("Please set the datetime ID."),
                        validate : {
                            required : false,
                        },

                        /*
                            onChangeメソッド 
                            テキストが変更されたタイミングで、手動でパラメータを設定する必要があります。
                            Textの場合は必須です。
                        */
                        onChange : function(val, component) {
                            TB.component.changeParam(component, "id", val);
                        }

                    },

                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        /********************************************************************************
         * 日時管理クリアタグ作成
         *
         * @param dt 日時
         * @since 2025/04/10
         * @author Kei Yusu
         * 
         *********************************************************************************/
        cmp["dtmng_clear"] = {
            
            "info":{
                
                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("Clear Datetime"), /* コンポーネント名称 */
                "help":TB.$.s("Clears all datetimes from the datetime manager."), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("Clear Datetime"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return e.data.pm.scope || "";

                },

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
                
                /*変更しない*/
                param_view : {
                },
            
                /* コンポーネントのパラメータを定義していきます */
                param:{      
                    
                    // 変数格納スコープ
                    "scope" : {
                        type : "Select",
                        
                        select_list : [
                            {
                                name : TB.$.s("System Variables(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("Game Variables(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("Temporary Variables(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("Variable Scope"),
                        help : TB.$.s("Please select the variable to store the datetime. Normally, you should store it in a game variable (f)."),
                        
                    },
                    
                },
                
                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){
                    
                    var storage = cmp.data.pm["storage"]; 
                    
                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";
                             
                },
                */
            
            }
            
        };

        // 戻り値の設定
        return cmp;

    }
    
    test(){}

}

