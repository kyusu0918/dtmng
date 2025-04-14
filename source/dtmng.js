/********************************************************************************
 * 日時管理ティラノスクリプトプラグイン ver1.0.0
 *
 * @since 2025/03/31
 * @author Kei Yusu
 *
 *********************************************************************************/
(() => {

  /********************************************************************************
   * 日時設定タグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @param d 日付
   * @param t 時刻
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const dtmng_set = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id: "now",
      scope: "f",
      d: "",
      t: "",
    },
    start : function(pm) {

      // 変数格納オブジェクト取得
      const varobj = getVarobj(pm.scope);

      // 日時管理オブジェクトがない場合
      if(typeof varobj.dtmng === "undefined"){
  
        // 日時管理オブジェクト作成
        varobj.dtmng = {};

      }
      
      // 日時管理オブジェクト配列がない場合
      if(typeof varobj.dtmngs === "undefined"){
  
        // 日時管理オブジェクト配列作成
        varobj.dtmngs = [];

      }

      // 現在日時取得
      const nowDateTimeString = getNowDateTimeString();

      // 日付取得（空白の場合は現在日時）
      const d = pm.d ? toDateString(pm.d) : nowDateTimeString.split(" ")[0];

      // 時刻取得（空白の場合は現在時刻）
      const t = pm.t ? toTimeString(pm.t) : nowDateTimeString.split(" ")[1];

      // 日時取得
      const dt = `${d} ${t}`;

      // 日時の妥当性を判断（正常な場合）
      if(isDateTimeValid(dt)){

        // 日時管理設定
        setDateTimeManager(varobj, pm.id, dt);

      // 不正な場合
      }else{

        // 警告表示
        alert(`[dtmng_set dt="${pm.dt}"]\n日時の形式が不正です。\n"yyyy/MM/dd"もしくは\n"yyyy/MM/dd hh:mm:ss"の形式で設定してください。`);

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_set = object(dtmng_set);
  TYRANO.kag.ftag.master_tag.dtmng_set.kag = TYRANO.kag;

  /********************************************************************************
   * 日時取得タグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const dtmng_get = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id: "now",
      scope: "f",
    },
    start : function(pm) {

      // 変数格納オブジェクト取得
      const varobj = getVarobj(pm.scope);

      // 日時管理オブジェクトと配列がある場合
      if(typeof varobj.dtmng !== "undefined" && typeof varobj.dtmngs !== "undefined"){
  
        // IDの日時管理オブジェクトを取得
        const get_dtmng = varobj.dtmngs.find(it => it.id == pm.id);

        // 日時管理オブジェクトを取得できた場合
        if(get_dtmng){

          // 日時管理オブジェクトを設定
          varobj.dtmng = get_dtmng;

        }

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_get = object(dtmng_get);
  TYRANO.kag.ftag.master_tag.dtmng_get.kag = TYRANO.kag;

  /********************************************************************************
   * 日時加算タグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
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
  const dtmng_add = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id: "now",
      scope: "f",
      years: "0",
      months: "0",
      days: "0",
      hours: "0",
      minutes: "0",
      seconds: "0",
    },
    start : function(pm) {

      // 変数格納オブジェクト取得
      const varobj = getVarobj(pm.scope);

      // 日時管理オブジェクトと配列がある場合
      if(typeof varobj.dtmng !== "undefined" && typeof varobj.dtmngs !== "undefined"){
  
        // 年加算
        if(isNumeric(pm.years)) addYears(varobj, pm.id, parseInt(pm.years));

        // 月加算
        if(isNumeric(pm.months)) addMonths(varobj, pm.id, parseInt(pm.months));

        // 日加算
        if(isNumeric(pm.days)) addDays(varobj, pm.id, parseInt(pm.days));

        // 時間加算
        if(isNumeric(pm.hours)) addHours(varobj, pm.id, parseInt(pm.hours));

        // 分加算
        if(isNumeric(pm.minutes)) addMinutes(varobj, pm.id, parseInt(pm.minutes));

        // 秒加算
        if(isNumeric(pm.seconds)) addSeconds(varobj, pm.id, parseInt(pm.seconds));

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_add = object(dtmng_add);
  TYRANO.kag.ftag.master_tag.dtmng_add.kag = TYRANO.kag;

  /********************************************************************************
   * 日時経過取得タグ作成
   *
   * @param id1 ID1
   * @param scope1 変数格納スコープ1
   * @param id2 ID2
   * @param scope2 変数格納スコープ2
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const dtmng_past = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id1: "now",
      scope1: "f",
      id2: "now",
      scope2: "f",
    },
    start : function(pm) {

      // 差分用日時管理オブジェクトの宣言
      let diff1_dtmng;
      let diff2_dtmng;
      
      // ID1用の変数格納オブジェクト取得
      const varobj1 = getVarobj(pm.scope1);

      // ID1用の日時管理オブジェクトと配列がある場合
      if(typeof varobj1.dtmng !== "undefined" && typeof varobj1.dtmngs !== "undefined"){
  
        // ID1の日時管理オブジェクトを取得
        diff1_dtmng = varobj1.dtmngs.find(it => it.id == pm.id1);

      }

      // ID2用の変数格納オブジェクト取得
      const varobj2 = getVarobj(pm.scope2);

      // ID2用の日時管理オブジェクトと配列がある場合
      if(typeof varobj2.dtmng !== "undefined" && typeof varobj2.dtmngs !== "undefined"){
  
        // ID2の日時管理オブジェクトを取得
        diff2_dtmng = varobj2.dtmngs.find(it => it.id == pm.id2);

      }

      // ID1とID2の日時管理オブジェクトがある場合
      if(diff1_dtmng && diff2_dtmng){

        // 経過取得
        const { years, months, days, hours, minutes, seconds } = pastDateTime(diff1_dtmng, diff2_dtmng);

        // 一時変数領域取得
        tf = getVarobj("tf");

        // 差分を一時変数に設定
        tf.pastYears = years;
        tf.jpastYears = `${years}年`;
        tf.pastMonths = months;
        tf.jpastMonths = `${months}ヶ月`;
        tf.pastDays = days;
        tf.jpastDays = `${days}日`;
        tf.pastHours = hours;
        tf.jpastHours = `${hours}時間`;
        tf.pastMinutes = minutes;
        tf.jpastMinutes = `${minutes}分`;
        tf.pastSeconds = seconds;
        tf.jpastSeconds = `${seconds}秒`;
        tf.pastDateTime = `${years} years, ${months} months, ${days} days, ${hours} hour, ${minutes} minutes, and ${seconds} seconds.`;
        tf.jpastDateTime = `${years}年${months}ヶ月${days}日 ${hours}時間${minutes}分${seconds}秒`;
        tf.pastDate = `${years} years, ${months} months, and ${days} days.`;
        tf.jpastDate = `${years}年${months}ヶ月${days}日`;
        tf.pastTime = `${hours} hour, ${minutes} minutes, and ${seconds} seconds.`;
        tf.jpastTime = `${hours}時間${minutes}分${seconds}秒`;

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_past = object(dtmng_past);
  TYRANO.kag.ftag.master_tag.dtmng_past.kag = TYRANO.kag;

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
  const dtmng_diff = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id1: "now",
      scope1: "f",
      id2: "now",
      scope2: "f",
    },
    start : function(pm) {

      // 差分用日時管理オブジェクトの宣言
      let diff1_dtmng;
      let diff2_dtmng;
      
      // ID1用の変数格納オブジェクト取得
      const varobj1 = getVarobj(pm.scope1);

      // ID1用の日時管理オブジェクトと配列がある場合
      if(typeof varobj1.dtmng !== "undefined" && typeof varobj1.dtmngs !== "undefined"){
  
        // ID1の日時管理オブジェクトを取得
        diff1_dtmng = varobj1.dtmngs.find(it => it.id == pm.id1);

      }

      // ID2用の変数格納オブジェクト取得
      const varobj2 = getVarobj(pm.scope2);

      // ID2用の日時管理オブジェクトと配列がある場合
      if(typeof varobj2.dtmng !== "undefined" && typeof varobj2.dtmngs !== "undefined"){
  
        // ID2の日時管理オブジェクトを取得
        diff2_dtmng = varobj2.dtmngs.find(it => it.id == pm.id2);

      }

      // ID1とID2の日時管理オブジェクトがある場合
      if(diff1_dtmng && diff2_dtmng){

        // 差分取得
        const { years, months, days, hours, minutes, seconds } = diffDateTime(diff1_dtmng, diff2_dtmng);

        // 一時変数領域取得
        tf = getVarobj("tf");

        // 差分を一時変数に設定
        tf.diffYears = years;
        tf.jdiffYears = `${years}年`;
        tf.diffMonths = months;
        tf.jdiffMonths = `${months}ヶ月`;
        tf.diffDays = days;
        tf.jdiffDays = `${days}日`;
        tf.diffHours = hours;
        tf.jdiffHours = `${hours}時間`;
        tf.diffMinutes = minutes;
        tf.jdiffMinutes = `${minutes}分`;
        tf.diffSeconds = seconds;
        tf.jdiffSeconds = `${seconds}秒`;

      }

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_diff = object(dtmng_diff);
  TYRANO.kag.ftag.master_tag.dtmng_diff.kag = TYRANO.kag;

  /********************************************************************************
   * 日時削除タグ作成
   *
   * @param id ID
   * @param scope 変数格納スコープ
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const dtmng_del = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      id: "now",
      scope: "f",
    },
    start : function(pm) {

      // 変数格納オブジェクト取得
      const varobj = getVarobj(pm.scope);

      // 日時管理オブジェクトと配列がある場合
      if(typeof varobj.dtmng !== "undefined" && typeof varobj.dtmngs !== "undefined"){
  
        // IDの日時管理オブジェクトを取得
        const get_dtmng = varobj.dtmngs.find(it => it.id == pm.id);

        // 日時管理オブジェクトを取得できた場合
        if(get_dtmng){

          // 日時管理オブジェクト配列更新
          varobj.dtmngs = [ ...varobj.dtmngs.filter(it => it.id != get_dtmng.id)] ;

          // 日時管理オブジェクトがある場合
          if(varobj.dtmngs.length != 0){

            // 末尾の日時管理オブジェクトを設定
            varobj.dtmng = varobj.dtmngs[varobj.dtmngs.length - 1];

          // 日時管理オブジェクトがない場合
          }else{
           
            // 日時管理オブジェクト削除
            delete varobj.dtmng;
            
            // 日時管理オブジェクト配列削除
            delete varobj.dtmngs

          }

        }

      }
      
      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_del = object(dtmng_del);
  TYRANO.kag.ftag.master_tag.dtmng_del.kag = TYRANO.kag;

  /********************************************************************************
   * 日時クリアタグ作成
   *
   * @param dt 日時
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const dtmng_clear = {
    kag: TYRANO.kag,
    vital: [],
    pm: {
      scope: "f",
    },
    start : function(pm) {

      // 変数格納オブジェクト取得
      const varobj = getVarobj(pm.scope);

      // 日時管理オブジェクト削除
      if(typeof varobj.dtmng !== "undefined") delete varobj.dtmng;
              
      // 日時管理オブジェクト配列削除
      if(typeof varobj.dtmngs !== "undefined") delete varobj.dtmngs
  
      // 経過日時格納用一時変数の削除
      if(typeof TYRANO.kag.variable.tf.pastYears !== "undefined") delete TYRANO.kag.variable.tf.pastYears;
      if(typeof TYRANO.kag.variable.tf.jpastYears !== "undefined") delete TYRANO.kag.variable.tf.jpastYears;
      if(typeof TYRANO.kag.variable.tf.pastMonths !== "undefined") delete TYRANO.kag.variable.tf.pastMonths;
      if(typeof TYRANO.kag.variable.tf.jpastMonths !== "undefined") delete TYRANO.kag.variable.tf.jpastMonths;
      if(typeof TYRANO.kag.variable.tf.pastDays !== "undefined") delete TYRANO.kag.variable.tf.pastDays;
      if(typeof TYRANO.kag.variable.tf.jpastDays !== "undefined") delete TYRANO.kag.variable.tf.jpastDays;
      if(typeof TYRANO.kag.variable.tf.pastHours !== "undefined") delete TYRANO.kag.variable.tf.pastHours;
      if(typeof TYRANO.kag.variable.tf.jpastHours !== "undefined") delete TYRANO.kag.variable.tf.jpastHours;
      if(typeof TYRANO.kag.variable.tf.pastMinutes !== "undefined") delete TYRANO.kag.variable.tf.pastMinutes;
      if(typeof TYRANO.kag.variable.tf.jpastMinutes !== "undefined") delete TYRANO.kag.variable.tf.jpastMinutes;
      if(typeof TYRANO.kag.variable.tf.pastSeconds !== "undefined") delete TYRANO.kag.variable.tf.pastSeconds;
      if(typeof TYRANO.kag.variable.tf.jpastSeconds !== "undefined") delete TYRANO.kag.variable.tf.jpastSeconds;
      if(typeof TYRANO.kag.variable.tf.pastDateTime !== "undefined") delete TYRANO.kag.variable.tf.pastDateTime;
      if(typeof TYRANO.kag.variable.tf.jpastDateTime !== "undefined") delete TYRANO.kag.variable.tf.jpastDateTime;
      if(typeof TYRANO.kag.variable.tf.pastDate !== "undefined") delete TYRANO.kag.variable.tf.pastDate;
      if(typeof TYRANO.kag.variable.tf.jpastDate !== "undefined") delete TYRANO.kag.variable.tf.jpastDate;
      if(typeof TYRANO.kag.variable.tf.pastTime !== "undefined") delete TYRANO.kag.variable.tf.pastTime;
      if(typeof TYRANO.kag.variable.tf.jpastTime !== "undefined") delete TYRANO.kag.variable.tf.jpastTime;

      // 差分日時格納用一時変数の削除
      if(typeof TYRANO.kag.variable.tf.diffYears !== "undefined") delete TYRANO.kag.variable.tf.diffYears;
      if(typeof TYRANO.kag.variable.tf.jdiffYears !== "undefined") delete TYRANO.kag.variable.tf.jdiffYears;
      if(typeof TYRANO.kag.variable.tf.diffMonths !== "undefined") delete TYRANO.kag.variable.tf.diffMonths;
      if(typeof TYRANO.kag.variable.tf.jdiffMonths !== "undefined") delete TYRANO.kag.variable.tf.jdiffMonths;
      if(typeof TYRANO.kag.variable.tf.diffDays !== "undefined") delete TYRANO.kag.variable.tf.diffDays;
      if(typeof TYRANO.kag.variable.tf.jdiffDays !== "undefined") delete TYRANO.kag.variable.tf.jdiffDays;
      if(typeof TYRANO.kag.variable.tf.diffHours !== "undefined") delete TYRANO.kag.variable.tf.diffHours;
      if(typeof TYRANO.kag.variable.tf.jdiffHours !== "undefined") delete TYRANO.kag.variable.tf.jdiffHours;
      if(typeof TYRANO.kag.variable.tf.diffMinutes !== "undefined") delete TYRANO.kag.variable.tf.diffMinutes;
      if(typeof TYRANO.kag.variable.tf.jdiffMinutes !== "undefined") delete TYRANO.kag.variable.tf.jdiffMinutes;
      if(typeof TYRANO.kag.variable.tf.diffSeconds !== "undefined") delete TYRANO.kag.variable.tf.diffSeconds;
      if(typeof TYRANO.kag.variable.tf.jdiffSeconds !== "undefined") delete TYRANO.kag.variable.tf.jdiffSeconds;

      // 次のタグへ
      this.kag.ftag.nextOrder();

    }

  }

  // 日時設定タグ追加
  TYRANO.kag.ftag.master_tag.dtmng_clear = object(dtmng_clear);
  TYRANO.kag.ftag.master_tag.dtmng_clear.kag = TYRANO.kag;

  //----------------------------------------------------------------------------------------------------
  // 以下、プライベートメソッド
  //----------------------------------------------------------------------------------------------------

  /********************************************************************************
   * 日時管理設定
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param dt 日時
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const setDateTimeManager = (varobj, id, dt) => {

    // console.log("★★★★★setDateTimeManager");

    // 要素分割
    const { date, time, y, m, d, hr, min, sec } = divideDateTime(dt)

    // 曜日を取得
    const dow = new Date(dt).getDay();

    // 英語曜日設定
    const w = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat",][dow];

    // 日本語曜日設定
    const jw = ["日","月","火","水","木","金","土",][dow];

    // 日時管理オブジェクトを新規作成
    const new_dtmng = {
      id: id,
      datetime: dt,
      jdatetime: `${y}年${m}月${d}日 ${hr}時${min}分${sec}秒`,

      // datetime_num_string: date.replaceAll("/", "") + time.replaceAll(":", ""),
      // ※TyranoBuilderのJSがreplaceAllに対応していないためreplaceに変更
      datetime_num_string: date.replace(/\//g, "") + time.replace(/:/g, ""), 
      
      date: date,
      jdate: `${y}年${m}月${d}日`,
      
      // date_num_string: date.replaceAll("/", ""),
      // ※TyranoBuilderのJSがreplaceAllに対応していないためreplaceに変更
      date_num_string: date.replace(/\//g, ""),

      time: time,
      jtime: `${hr}時${min}分${sec}秒`,

      // time_num_string: time.replaceAll(":", ""),
      // ※TyranoBuilderのJSがreplaceAllに対応していないためreplaceに変更
      time_num_string: time.replace(/:/g, ""),

      y: y,
      jy: `${y}年`,
      m: m,
      jm: `${m}月`,
      d: d,
      jd: `${d}日`,
      hr: hr,
      jhr: `${hr}時`,
      min: min,
      jmin: `${min}分`,
      sec: sec,
      jsec: `${sec}秒`,
      w_num: dow,
      w: w,
      jw: jw,
    };

    // 日時管理オブジェクト設定
    varobj.dtmng = new_dtmng;

    // 日時管理オブジェクト配列更新
    varobj.dtmngs = [ ...varobj.dtmngs.filter(it => it.id != id), new_dtmng] ;

  }

  /********************************************************************************
   * 年加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addYears 加算年
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addYears = (varobj, id, addYears) => {

    // console.log("★★★★★addYears");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){

      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)
      
      // 新規日付作成
      const date = new Date(y + addYears, m - 1, d);
      
      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), hr, min, sec);

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 月加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addMonths 加算月
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addMonths = (varobj, id, addMonths) => {

    // console.log("★★★★★addMonths");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){
      
      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)
      
      // 加算日付作成
      const add_date = new Date(y, m - 1 + addMonths, 1);

      // 加算日付の最終日を取得（次月の0日目）
      const last_day = new Date(add_date.getFullYear(), add_date.getMonth() + 1, 0).getDate();
      
      // 新規日付取得
      const date = new Date(add_date.getFullYear(), add_date.getMonth(), Math.min(d, last_day));

      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), hr, min, sec);

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 日加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addDays 加算日
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addDays = (varobj, id, addDays) => {

    // console.log("★★★★★addDays");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){

      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)

      // 新規日付作成
      const date = new Date(y, m - 1, d + addDays);
      
      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), hr, min, sec);

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 時間加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addHours 加算時間
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addHours = (varobj, id, addHours) => {

    // console.log("★★★★★addHours");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){

      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)

      // 新規日付作成
      const date = new Date(y, m - 1, d, hr + addHours, min, sec);
      
      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 分加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addMinutes 加算分
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addMinutes = (varobj, id, addMinutes) => {

    // console.log("★★★★★addMinutes");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){

      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)

      // 新規日付作成
      const date = new Date(y, m - 1, d, hr, min + addMinutes, sec);
      
      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 秒加算
   *
   * @param varobj 変数格納オブジェクト
   * @param id ID
   * @param addSeconds 加算秒
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const addSeconds = (varobj, id, addSeconds) => {

    // console.log("★★★★★addSeconds");

    // 日時管理オブジェクト取得
    target_dtmng = varobj.dtmngs.find(it => it.id == id);

    // 日時管理オブジェクトを取得できた場合
    if(target_dtmng){

      // 要素分割
      const { y, m, d, hr, min, sec } = divideDateTime(target_dtmng.datetime)

      // 新規日付作成
      const date = new Date(y, m - 1, d, hr, min, sec + addSeconds);
      
      // 新規日時作成
      const new_dt = makeDateTimeString(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

      // 日時管理設定
      setDateTimeManager(varobj, id, new_dt);

    }

  }

  /********************************************************************************
   * 経過計算
   *
   * @param dtmng1 日時管理オブジェクト1
   * @param dtmng2 日時管理オブジェクト2
   * @returns { 年, 月, 日, 時, 分, 秒 }
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const pastDateTime = (dtmng1, dtmng2) => {

    // console.log("★★★★★pastDateTime");

    // 要素分割
    const { y: y1, m: m1, d: d1, hr: hr1, min: min1, sec: sec1 } = divideDateTime(dtmng1.datetime)
    const { y: y2, m: m2, d: d2, hr: hr2, min: min2, sec: sec2 } = divideDateTime(dtmng2.datetime)

    // 日付オブジェクト取得
    const date1 = new Date(y1, m1 - 1, d1, hr1, min1, sec1);
    const date2 = new Date(y2, m2 - 1, d2, hr2, min2, sec2);

    // 日付の順序を統一（date1 < date2 になるように）
    if (date1 > date2) [date1, date2] = [date2, date1];

    // 各差分取得
    let years = date2.getFullYear() - date1.getFullYear();
    let months = date2.getMonth() - date1.getMonth();
    let days = date2.getDate() - date1.getDate();
    let hours = date2.getHours() - date1.getHours();
    let minutes = date2.getMinutes() - date1.getMinutes();
    let seconds = date2.getSeconds() - date1.getSeconds();

    // 調整: 秒が負の場合
    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }

    // 調整: 分が負の場合
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    // 調整: 時が負の場合
    if (hours < 0) {
        days--;
        hours += 24;
    }

    // 調整: 日が負の場合
    if (days < 0) {
        months--;
        let prevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // 調整: 月が負の場合
    if (months < 0) {
        years--;
        months += 12;
    }

    // 戻り値の設定
    return { years, months, days, hours, minutes, seconds };

  }

  /********************************************************************************
   * 差分計算
   *
   * @param dtmng1 日時管理オブジェクト1
   * @param dtmng2 日時管理オブジェクト2
   * @returns { 年, 月, 日, 時, 分, 秒 }
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const diffDateTime = (dtmng1, dtmng2) => {

    // console.log("★★★★★diffDateTime");

    // 要素分割
    const { y: y1, m: m1, d: d1, hr: hr1, min: min1, sec: sec1 } = divideDateTime(dtmng1.datetime)
    const { y: y2, m: m2, d: d2, hr: hr2, min: min2, sec: sec2 } = divideDateTime(dtmng2.datetime)

    // 日付オブジェクト取得
    const date1 = new Date(y1, m1 - 1, d1, hr1, min1, sec1);
    const date2 = new Date(y2, m2 - 1, d2, hr2, min2, sec2);

    // 差分計算
    const diff = Math.abs(date2 - date1);

    // 差分換算
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    // 戻り値の設定
    return { years, months, days, hours, minutes, seconds };

  }

  /********************************************************************************
   * 日時文字列分割
   *
   * @param dt 日時
   * @returns { 日付, 時刻, 年, 月, 日, 時, 分, 秒 }
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const divideDateTime = (dt) => {

    // console.log("★★★★★divideDateTime");

    // 要素分割
    const dtSplit = dt.split(" ");
    const dSplit = dtSplit[0].split("/");
    const tSplit = dtSplit[1].split(":");

    // 年月日部分取得
    const y = parseInt(dSplit[0]);
    const m = parseInt(dSplit[1]);
    const d = parseInt(dSplit[2]);

    // 時分秒部分を取得
    const hr = parseInt(tSplit[0]);
    const min = parseInt(tSplit[1]);
    const sec = parseInt(tSplit[2]);

    // 戻り値の設定
    return { date: dtSplit[0], time: dtSplit[1], y, m, d, hr, min, sec };

  }

  /********************************************************************************
   * 日時文字列作成
   *
   * @param year 年
   * @param month 月
   * @param day 日
   * @param hour 時
   * @param minute 分
   * @param second 秒
   * @returns 日時文字列
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const makeDateTimeString = (year, month, day, hour, minute, second) => {

    // console.log("★★★★★makeDateTimeString");

    // 戻り値の設定
    return (
      year.toString()
      + '/' + ('0' + month).slice(-2)
      + '/' + ('0' + day).slice(-2)
      + ' ' + ('0' + hour).slice(-2)
      + ':' + ('0' + minute).slice(-2)
      + ':' + ('0' + second).slice(-2)
      );

  }

  /********************************************************************************
   * 現在日時取得(yyyy/MM/dd hh:mm:ss)
   *
   * @return 現在日時
   * @since 2023/03/31
   * @author Kei Yusu
   *
   *********************************************************************************/
  const getNowDateTimeString = () => {

    // console.log("★★★★★getNowDateTimeString");

    // 現在日時取得
    const date = new Date();

    // 日付フォーマット
    const NowDateTimeString =
      date.getFullYear()
      + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
      + '/' + ('0' + date.getDate()).slice(-2)
      + ' ' + ('0' + date.getHours()).slice(-2)
      + ':' + ('0' + date.getMinutes()).slice(-2)
      + ':' + ('0' + date.getSeconds()).slice(-2);
  
    // 戻り値の設定
    return NowDateTimeString;
    
  }

  /********************************************************************************
   * 日付文字列変換(yyyyMMdd -> yyyy/MM/dd)
   *
   * @param target 対象日付
   * @return 日付（yyyy/MM/dd）
   * @since 2025/04/10
   * @author Kei Yusu
   *
   *********************************************************************************/
  const toDateString = (target) => {

    // console.log("★★★★★toDateString");

    // 対象日付が8文字の場合
    if(target.toString().length == 8){

      // 年月日を文字列として取得
      const y = target.toString().substring(0,4);
      const m = target.toString().substring(4,6);
      const d = target.toString().substring(6,8);

      // 年月日を数値として取得
      const stringDate = `${y}/${m}/${d}`;
      
      // 戻り値の設定
      return stringDate;

    }else{

      // 戻りの設定（そのまま返す）
      return target;

    }

  }

  /********************************************************************************
   * 時刻文字列変換(hhmmss -> hh:mm:ss)
   *
   * @param target 対象時刻
   * @return 時刻（hh:mm:ss）
   * @since 2025/04/10
   * @author Kei Yusu
   *
   *********************************************************************************/
  const toTimeString = (target) => {

    // console.log("★★★★★toTimeString");

    // 対象時刻が6文字の場合
    if(target.toString().length == 6){

      // 時分秒を文字列として取得
      const hr = target.toString().substring(0,2);
      const min = target.toString().substring(2,4);
      const sec = target.toString().substring(4,6);

      // 時分秒を数値として取得
      const stringTime = `${hr}:${min}:${sec}`;
      
      // 戻り値の設定
      return stringTime;

    }else{

      // 戻りの設定（そのまま返す）
      return target;

    }

  }

  /********************************************************************************
   * 日時妥当性判断
   *
   * @param dt 日時
   * @returns true: 正常 / false: 異常
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isDateTimeValid = (dt) => {

    // console.log("★★★★★isDateTimeValid");

    // 形式チェックが不正な場合は終了
    // ※正規表現によるチェック（9999/99/99 99:99:99形式）
    if(!dt.match(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)) return false;

    // 要素分割
    const { y, m, d, hr, min, sec} = divideDateTime(dt)

    // 戻り値の設定
    return isDateValid(y, m, d) && isTimeValid(hr, min, sec)

  }

  /********************************************************************************
   * 日付妥当性判断
   *
   * @param year 年
   * @param month 月
   * @param day 日
   * @returns true: 正常 / false: 異常
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isDateValid = (year, month, day) => {

    // console.log("★★★★★isDateValid");

    // 月が範囲外の場合は終了
    if (month < 1 || month > 12) return false;

    // 日の最大値を取得
    const maxDays = new Date(year, month, 0).getDate();

    // 日が範囲外の場合は終了
    if (day < 1 || day > maxDays) return false;

    // 正常時の戻り値の設定
    return true;
  }

  /********************************************************************************
   * 時刻妥当性判断
   *
   * @param hour 時
   * @param minute 分
   * @param second 秒
   * @returns true: 正常 / false: 異常
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const isTimeValid = (hour, minute, second) => {

    // console.log("★★★★★isTimeValid");

    // 戻り値の設定
    return (
      Number.isInteger(hour) && hour >= 0 && hour <= 23 &&
      Number.isInteger(minute) && minute >= 0 && minute <= 59 &&
      Number.isInteger(second) && second >= 0 && second <= 59
    );

  }  

  /********************************************************************************
   * 数値の妥当性判断（符号なし）
   *
   * @param target 対象文字列
   * @return true: 正常 false:エラー
   * @since 2025/03/31
   * @author Kei Yusu
   *
   *********************************************************************************/
  const isNumeric = (target) => {

    // console.log("★★★★★isNumeric");

    // 型チェック
    if(!target.match(/\d+/)){

      // マッチしない場合は終了
      return false;

    }

    // 戻り値の設定
    return true;

  }

  /********************************************************************************
   * 変数格納オブジェクト取得
   *
   * @param scope スコープ
   * @returns 変数格納オブジェクト
   * @since 2025/03/31
   * @author Kei Yusu
   * 
   *********************************************************************************/
  const getVarobj = (scope) => {

    // console.log("★★★★★getVarobj");
    
    // スコープがシステム変数か一時変数の場合
    if(scope == "sf" || scope == "tf"){

      // 戻り値の設定（variableから取得）
      return TYRANO.kag.variable[scope];

    // ゲーム変数の場合
    }else{

      // 戻り値の設定（statから取得）
      return TYRANO.kag.stat["f"];

    }

  }
  
})();