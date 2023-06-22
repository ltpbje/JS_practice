/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
// 获取天气信息函数
function getWeather(cityCode) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode
    }
  }).then(result => {
    const dataObj = result.data;
    console.log(dataObj);
    // title区域
    const titleStr = ` <span class="dateShort">${dataObj.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${dataObj.dateLunar}</span>
        </span>`
    document.querySelector('.title').innerHTML = titleStr
    // weather-box区域
    const weatherStr = ` <div class="tem-box">
        <span class="temp">
          <span class="temperature">${dataObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${dataObj.psPm25}</span>
          <span class="psPm25Level">${dataObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src=${dataObj.weatherImg} class="weatherImg" alt="">
            <span class="weather">${dataObj.weather}</span>
          </li>
          <li class="windDirection">${dataObj.windDirection}</li>
          <li class="windPower">2级</li>
        </ul>
      </div>`;
    document.querySelector('.weather-box').innerHTML = weatherStr;
    // today-weather 今日天气区域
    const twObj = dataObj.todayWeather;
    const twStr = `<div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${twObj.weather}</span>
          <span class="temNight">${twObj.temNight}</span>
          <span>-</span>
          <span class="temDay">${twObj.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${twObj.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${twObj.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${twObj.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${twObj.sunsetTime}</span>
        </li>
      </ul>`;
    document.querySelector('.today-weather').innerHTML = twStr;
    // 周天气预报 week-weather-box
    const forecastArr = dataObj.dayForecast;
    const forecastStr = forecastArr.map(item => {
      return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src=${item.weatherImg} alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">${item.windPower}</span>
          </div>
        </li>`
    }).join('');
    document.querySelector('.week-wrap').innerHTML = forecastStr;
    // 城市名
    document.querySelector('.area').innerHTML = dataObj.area;
  }).catch(error => {
    console.dir(error);
  });

}
getWeather(110100);
// 搜索城市列表
document.querySelector('.search-city').addEventListener('input', function (e) {
  console.log(e.target.value);
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(result => {
    // console.log(result.data);
    const cityArr = result.data;
    const liListStr = cityArr.map(item => {
      return `<li class="city-item" data-code = ${item.code}>${item.name}</li>`
    }).join('');
    document.querySelector('.search-list').innerHTML = liListStr;
  })
});
// 切换城市天气 search - list
document.querySelector('.search-list').addEventListener('click', function (e) {
  if (e.target.classList.contains('city-item')) {
    console.log(e.target.dataset.code);
    const cityCode = e.target.dataset.code
    getWeather(cityCode);
  };
});