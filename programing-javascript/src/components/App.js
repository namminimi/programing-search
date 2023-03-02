import { fetchList } from "../api/api.js"
import SearchInput from "./SearchInput.js"
import SelectLists from "./SelectLists.js"
import Suggestion from "./Suggestion.js"

export default function App ({target}){
    //app에서 관리할 상태값
    this.state = {
        selectedlist: [],
        fetchedlist: []
    }
    //상태값 업데이트
    this.setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }
        //상태값이 업데이트 되면서 Suggestion도 업데이트 
        suggestion.setState({fetchlist: this.state.fetchedlist})
        selectLists.setState(this.state.selectedlist)
    }
    //SelectLists 조립 참고 index.html파일 보면 위치 확인 가능 위치에 맞게 조립할것
    const selectLists = new SelectLists({
        target,
        initialState: []
    })

    // SearchInput 조립
    const searchInput = new SearchInput({ //target과 initialState를 props로 전달
        target,
        initialState: '',
        //onChange함수 생성
        onChange: async (keyword) => {  
            if(keyword.length > 0){ 
                //SearchInput에서 받아온 input value값 길이가 0 이상이면 아래 실행
                const language = await fetchList(keyword)
                this.setState({ //받아온 데이터를 상태 업데이트
                    fetchedlist: language
                })
                console.log(this.state.fetchedlist)
            } else { // input에 value값 길이가 0 이하면 빈배열 출력력
                this.setState({
                    fetchedlist: []
                })
            }
            
        }
    })
    //Suggestion 조립
    const suggestion = new Suggestion({ //target과 initialState를 props로 전달
        target,
        initialState: [],
        onSelect: (list) => {
            console.log(list)
            const {selectedlist} = this.state;
            console.log(selectedlist)
            const index = selectedlist.findIndex(selist=>selist === list) 
            //참이면 해당 인덱스 반환 거짓이면 -1반환
            //중복된 값 제거(기존배열에 있던거 제거함)
            console.log(index)
            if(index > -1) {
                console.log("중복제거")
                selectedlist.splice(index,1) 
            }
            selectedlist.push(list) // 배열에 추가해주기
            console.log(selectedlist)
            //배열 갯수 5개로 제한해주기
            if(selectedlist.length > 5) {
                const startPosition = selectedlist.length -5 
                console.log(startPosition)
                // selectedlist가 6일경우 startPosition = 1
                const nselectedlist = selectedlist.slice(startPosition, 5 + startPosition)
                // selectedlist.slice(1 , 6) 1~5째까지 자르기 0번째꺼는 제거됨
                this.setState({selectedlist: nselectedlist}) // 업데이트
            }else{ //5이하일경우  기존 배열 그대로
                this.setState({selectedlist: selectedlist}) 
            }
        }
    })
}