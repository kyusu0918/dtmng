/********************************************************************************
 * 日時管理ティラノビルダープラグイン設定 ver1.0.0
 *
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
        this.name= TB.$.s("日時管理プラグイン");
        
        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("ゲーム内の日付や実際の日時を簡単に扱えるようにします。");
        
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
                "name":TB.$.s("日時設定"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理に日時を設定します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時設定"), /* コンポーネント名称 */
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                        name : TB.$.s("日付（yyyyMMdd 数値８桁）"),
                        help : TB.$.s("日付を設定してください。※空白の場合は現在日付"),
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
                        name : TB.$.s("時刻（hhmmss 数値６桁）"),
                        help : TB.$.s("時刻を設定してください。※空白の場合は現在時刻"),
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
                "name":TB.$.s("日時取得"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理から日時を取得します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時取得"), /* コンポーネント名称 */
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                "name":TB.$.s("日時加算"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理の日時に年月日時分秒を加算します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時加算"), /* コンポーネント名称 */
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                        name : TB.$.s("加算年"), /*パラメータ名*/
                        unit : "年", /*単位を表示できます*/
                        help : TB.$.s("加算する年を設定してください。"),
                        
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
                        name : TB.$.s("加算月"), /*パラメータ名*/
                        unit : "ヶ月", /*単位を表示できます*/
                        help : TB.$.s("加算する月を設定してください。"),
                        
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
                        name : TB.$.s("加算日"), /*パラメータ名*/
                        unit : "日", /*単位を表示できます*/
                        help : TB.$.s("加算する日を設定してください。"),
                        
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
                        name : TB.$.s("加算時間"), /*パラメータ名*/
                        unit : "時間", /*単位を表示できます*/
                        help : TB.$.s("加算する時間を設定してください。"),
                        
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
                        name : TB.$.s("加算分"), /*パラメータ名*/
                        unit : "分", /*単位を表示できます*/
                        help : TB.$.s("加算する分を設定してください。"),
                        
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
                        name : TB.$.s("加算秒"), /*パラメータ名*/
                        unit : "秒", /*単位を表示できます*/
                        help : TB.$.s("加算する秒を設定してください。"),
                        
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
                "name":TB.$.s("日時経過"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理からID1とID2の日時の経過を取得します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時経過"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return (`${e.data.pm.id1} -> ${e.data.pm.id2}`) || "";

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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ1"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID1
                    "id1" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID1"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ2"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID2
                    "id2" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID2"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                "name":TB.$.s("日時差分"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理からID1とID2の日時の差分を取得します"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時差分"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */
                
                header: function(e){
                    
                    return (`${e.data.pm.id1} <-> ${e.data.pm.id2}`) || "";

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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ1"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID1
                    "id1" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID1"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ2"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID2
                    "id2" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID2"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                "name":TB.$.s("日時削除"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理から日時を削除します。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時削除"), /* コンポーネント名称 */
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
                    },

                    // ID
                    "id" : {
                        type : "Text",
                        default_val : "now",
                        name : TB.$.s("ID"),
                        help : TB.$.s("日時のIDを設定してください。"),
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
                "name":TB.$.s("日時クリア"), /* コンポーネント名称 */
                "help":TB.$.s("日時管理から全ての日時クリアします。"), /* コンポーネントの説明を記述します */ 
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */
                
            },
            
            /* コンポーネントの情報の詳細を定義します */
            
            "component":{
                
                name : TB.$.s("日時クリア"), /* コンポーネント名称 */
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
                                name : TB.$.s("システム変数(sf)"),
                                val : "sf"
                            },
                            {
                                name : TB.$.s("ゲーム変数(f)"),
                                val : "f"
                            },
                            {
                                name : TB.$.s("一時変数(tf)"),
                                val : "tf"
                            }
                        ],
                        default_val : "f",
                        name : TB.$.s("変数格納スコープ"),
                        help : TB.$.s("日時を格納する変数を選択してください。通常はゲーム変数(f)に格納します。"),
                        
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

