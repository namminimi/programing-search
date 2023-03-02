export default function Suggestion({target, initialState, onSelect}) {
    this.element = document.createElement('div') //div 태그 생성
    this.element.className = 'suggestion' 
    target.appendChild(this.element) //app 에 추가
    this.state = {  //Suggestion 상태관리
        fetchlist: initialState,
        selectedIndex: 0
    }
    this.setState = (nextState) => {  //상태 업데이트
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render(); //업데이트 후 render 호출
    }
    this.render = () =>{
        const {fetchlist = [], selectedIndex} = this.state; //상태 구조분해
        if(fetchlist.length > 0) {  //fetchlist 길이가 0이상이면 생성
            this.element.style.display = 'block';
            this.element.innerHTML =`
            <ul>
                ${fetchlist.map((list,index)=>`
                <li data-index="${index}" class="${index === selectedIndex ?
                'Suggestion__item--selected' : ''}">${list}</li>`).join("")}
            </ul>
            `;
        }else { //fetchlist 길이가 0이하
            console.log(111)
            this.element.style.display = 'none'
            this.element.innerHTML = ``;
        }
    }
    this.render() //render 호출
    //방향키 up, down이벤트 연결하기
    //방향키 위를 누르면 index는 현재에서 -1
    //방향키 아래르 누르면 index는 현재에서 1
    window.addEventListener('keyup', (e)=>{
        const {fetchlist = [], selectedIndex} = this.state;
        const inclusionKeys = ['ArrowUp', 'ArrowDown'];
        let nextIndex = selectedIndex;
        const lastIndex = fetchlist.length -1;
        if(inclusionKeys.includes(e.key)) {
            if(e.key === 'ArrowUp') { //위 방향키일때
                nextIndex = nextIndex === 0 ? lastIndex : nextIndex -1;
            }else {//아래 방향키일 때  nextIndex 값이 lastIndex 하고 같은면 0초기화
                nextIndex = nextIndex === lastIndex ? 0 : nextIndex + 1;
            }
            this.setState({ //업데이트
                selectedIndex: nextIndex
            })
            //엔터키를 눌렀을때 해당 키워드가 input위에 등록됨
        }else if (e.key === 'Enter') {
            alert(fetchlist[this.state.selectedIndex])
            onSelect(fetchlist[this.state.selectedIndex])
        }
    })
}
