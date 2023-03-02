export default function SearchInput({target, initialState, onChange}){
    this.state = initialState;
    //폼태그 생성
    this.element = document.createElement('form');
    //class명 생성
    this.element.className = "searchForm";
    //app 요소에 form태크 추가하기
    target.appendChild(this.element);

    this.element.addEventListener('keyup', (e)=> { //키를 눌렀을때 작동하는 이벤트
        //해당 배열 제외한 키를 눌렀을때 이벤트 발생
        const excepList = ['Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
        if(!excepList.includes(e.key)){
            onChange(e.target.value);
        }
    })
    //submit이벤트 제거
    this.element.addEventListener('submit', (e)=>{
        e.preventDefault();
    })
    
    this.render = () => {
        this.element.innerHTML = `
            <input type="text" value="${this.state}" placeholder="검색할 언어를 입력하세요"/>
        `
    }
    this.render(); // render()호출
}