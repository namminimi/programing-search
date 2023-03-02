export const END_FATCH_POINT = 'http://localhost:3006'  // 내가 만든 서버 주소
const request = async (url) => {
    //url경로로 fetch전송
    const res = await fetch(url);

    if(res) { // 데이터를 받아올경우 json형태로 변환해서 리턴
        const json = await res.json()
        return json
    }
    throw new Error('문제가 생겼습니다')
}

export const fetchList = async (keyword) => 
request(`${END_FATCH_POINT}/languages?keyword=${keyword}`)