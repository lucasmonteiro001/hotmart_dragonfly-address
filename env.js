/**
 * Created by lucas on 2/3/17.
 */
const config = {
    API_ADDRESS: 'http://54.159.182.138/hack-dragonfly/rest/v1/address',
    API_LOGIN: 'http://api-hck.hotmart.com/security/oauth/token?grant_type=password&username=desafio.front@hotmart.com.br&password=123456',
    HEADER_AUTHORIZATION: 'Basic  ZTZiZGVjY2ItNzM1OC00OTk3LWIzYzAtODk2NDBhZjEyZGRlOmQ5OWNmMTU0LTFjZGYtNDRiMi04MDJmLWU1YzhiYmU5NjY5OA==',
    GOOGLE_GEOCODE_KEY: 'AIzaSyDbZ92jru8Fl2FPKPgkl_KV2SH6F6UILd4',
    BASE_LAYER_URL: 'https://api.mapbox.com/styles/v1/lucasmonteiro001/ciylfwkph00332rqqmdd3bsdj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYXNtb250ZWlybzAwMSIsImEiOiJjaXlsZTl0cGcwMDBrMzNwZm9qcnIxYjd6In0.V3qGeRTZbZW97ywL2Ue09Q'
};

Object.assign(process.env, config);